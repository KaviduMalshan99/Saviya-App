import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Import the Picker component
import { registerUser } from '../../api'; // Import your API function
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = ({ navigation, route }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmailaddress] = useState('');
  const [contact_number, setContactno] = useState('');
  const [gender, setGender] = useState(''); // State for gender
  const [password, setPassword] = useState('');
  
  // Retrieve userType from route params (learner or buyer)
  const userType = route.params?.userType || 'learner';

  const handleRegister = async () => {
    if (!firstname || !lastname || !email || !contact_number || !password || !gender) {
      Alert.alert('Error', 'Please fill all fields.');
      return;
    }
  
    try {
      // User type is passed as status in the registration data
      const userData = { 
        firstname, 
        lastname, 
        email, 
        contact_number, 
        gender, 
        password, 
        status: userType  // Store userType as status
      };
  
      console.log("Registering user with data:", userData); // Log the user data before sending
  
      const result = await registerUser(userData);
      Alert.alert('Success', result.message || 'Registration successful.');
      navigation.navigate('Login');
    } catch (error) {
      const errorMessage = error?.message || 'Registration failed.';
      Alert.alert('Error', errorMessage);
    }
  };
  

  return (
    <ImageBackground
      source={require('../../assets/images/onBoardScreens/BG3.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Sign Up</Text>

        <Text style={styles.greeting}>Hello {userType.charAt(0).toUpperCase() + userType.slice(1)}!</Text>
        
        <TextInput
          style={styles.input}
          placeholder="First Name"
          placeholderTextColor="#000"
          onChangeText={setFirstname}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          placeholderTextColor="#000"
          onChangeText={setLastname}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor="#000"
          onChangeText={setEmailaddress}
        />
        <TextInput
          style={styles.input}
          placeholder="Contact Number"
          keyboardType="phone-pad"
          placeholderTextColor="#000"
          onChangeText={setContactno}
        />
        
        {/* Gender Dropdown */}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue) => setGender(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Gender" value="" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Other" value="other" />
          </Picker>
        </View>

        {/* Password Input with Visibility Toggle */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input1, { flex: 1 }]}
            placeholder="Password"
            secureTextEntry={!showPassword}
            placeholderTextColor="#000"
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIconContainer}>
            <Image
              source={
                showPassword
                  ? require('../../assets/images/eye-off.png') // Your 'eye-off' icon
                  : require('../../assets/images/eye.png') // Your 'eye' icon
              }
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Register Button */}
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Sign Up</Text>
        </TouchableOpacity>

        {/* Already have an account? */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.signInText}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    backgroundColor: '#FBFDFF',
  },
  container: {
    padding: 16,
    borderRadius: 10,
    marginHorizontal: 16,
    paddingVertical: 30,
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    color: 'black',
    textAlign: 'center',
    marginBottom: 40,
    fontFamily: 'Lato-Bold',
  },
  greeting: {
    fontSize: 18,
    color: 'black',
    marginBottom: 20,
    fontFamily: 'Lato-Bold',
  },
  input: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 20,
    fontSize: 16,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  pickerContainer: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  input1: {
    paddingHorizontal: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    height: 50,
  },
  eyeIconContainer: {
    padding: 10,
  },
  eyeIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  registerButton: {
    backgroundColor: 'black',
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Lato-Bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    color: 'black',
    fontSize: 14,
    fontFamily: 'Lato-Regular',
  },
  signInText: {
    color: 'black',
    fontSize: 14,
    fontFamily: 'Lato-Bold',
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen;
