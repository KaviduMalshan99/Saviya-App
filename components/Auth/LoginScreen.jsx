import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ImageBackground, Alert } from 'react-native';
import { loginUser } from '../../api'; // Assuming this function sends a login request
import { useUser } from '../Auth/UserContext'; // Import UserContext to store user data

const LoginScreen = ({ navigation }) => {
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useUser(); // Use the setUser function from UserContext

  const handleLogin = async () => {
    // Validate input
    if (!email || !password) {
      Alert.alert('Error', 'Please enter your email and password.');
      return;
    }

    const credentials = { email, password };

    try {
      const response = await loginUser(credentials); // Call the login API function
      if (response?.user) {
        Alert.alert('Success', 'Login successful'); // Display success message

        // Store user data in the context after successful login
        setUser(response.user); // Set the user in context

        // Reset navigation stack to prevent going back to the login page
        navigation.reset({
          index: 0,
          routes: [{ name: 'Drawer' }], // Change this based on your drawer navigation
        });
      }
    } catch (error) {
      Alert.alert('Login Failed', error.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/onBoardScreens/BG1.png')} // Ensure this path is correct
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Login</Text>

          {/* Email Input */}
          <TextInput
            placeholder="Email"
            placeholderTextColor="#ccc"
            style={styles.input}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          {/* Password Input */}
          <TextInput
            placeholder="Password"
            placeholderTextColor="#ccc"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />

          {/* Remember Me and Forgot Password Links */}
          <View style={styles.rememberContainer}>
            <TouchableOpacity onPress={() => setRememberMe(!rememberMe)}>
              <Text style={styles.rememberMeText}>
                {rememberMe ? '✓ Remember Me' : 'Remember Me'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => console.log('Forgot Password Pressed')}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          {/* Register Button */}
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Don’t have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('WhoAreYou')}>
              <Text style={styles.signUpText}>Sign up</Text>
            </TouchableOpacity>
          </View>

          {/* Social Media Login Options */}
          <View style={styles.socialContainer}>
            <TouchableOpacity onPress={() => console.log('Facebook Login')}>
              <Image
                source={require('../../assets/images/facebook.png')} // Ensure correct path for Facebook logo
                style={styles.socialIcon}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => console.log('Google Login')}>
              <Image
                source={require('../../assets/images/google.png')} // Ensure correct path for Google logo
                style={styles.socialIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    backgroundColor: '#15A196', // Your main background color behind the image
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 32,
    top: 50,
  },
  title: {
    fontSize: 28,
    color: 'white',
    textAlign: 'center',
    marginBottom: 40,
    fontFamily: 'Lato-Bold', // Using the Lato font
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
  rememberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  rememberMeText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Lato-Regular',
  },
  forgotPasswordText: {
    color: '#fff',
    textDecorationLine: 'underline',
    fontSize: 14,
    fontFamily: 'Lato-Regular',
  },
  loginButton: {
    backgroundColor: 'black', // Black login button
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 50,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Lato-Bold',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    marginTop: 50,
    gap: 20,
  },
  socialIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  registerText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Lato-Regular',
  },
  signUpText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Lato-Bold', // Make "Sign up" bold
    textDecorationLine: 'underline', // Optional: underline to emphasize it's a link
  },
});

export default LoginScreen;
