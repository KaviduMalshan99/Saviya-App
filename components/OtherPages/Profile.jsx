import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ImageBackground, Alert, ScrollView } from 'react-native';
import { getUserDetails, updateUserDetails } from '../../api'; // Import API functions
import { useUser } from '../Auth/UserContext'; // Import useUser for user context

const Profile = () => {
  const { user } = useUser(); // Get user from context
  const userId = user?.id; // Ensure userId is properly retrieved

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  useEffect(() => {
    if (userId) {
      // Fetch user details if userId is available
      getUserDetails(userId)
        .then((userData) => {
          setFirstname(userData.firstname);
          setLastname(userData.lastname);
          setEmail(userData.email);
          setContact(userData.contact_number);
        })
        .catch((error) => {
          console.error('Error fetching user details:', error);
          Alert.alert('Error', 'Could not fetch user details.');
        });
    }
  }, [userId]);

  const handleUpdateProfile = () => {
    if (password && password !== rePassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    const updatedData = {
      firstname,
      lastname,
      email,
      contact_number: contact,
    };

    // Only include password in the update if the user has entered it
    if (password) {
      updatedData.password = password;
    }

    // Update user details
    updateUserDetails(userId, updatedData)
      .then(() => {
        Alert.alert('Success', 'Profile Updated Successfully');
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
        Alert.alert('Error', 'Failed to update profile.');
      });
  };

  return (
    <ScrollView>
      <ImageBackground
        source={require('../../assets/images/onBoardScreens/BG2.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.container}>
          <Text style={styles.title}>Profile Page</Text>

          {/* Profile Image */}
          <View style={styles.profileImageContainer}>
            <Image source={require('../../assets/images/img.png')} style={styles.profileImage} />
          </View>

          {/* First Name Input */}
          <TextInput
            style={styles.input}
            value={firstname}
            onChangeText={setFirstname}
            placeholder="First Name"
          />

          {/* Last Name Input */}
          <TextInput
            style={styles.input}
            value={lastname}
            onChangeText={setLastname}
            placeholder="Last Name"
          />

          {/* Email Input */}
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
          />

          {/* Contact Input */}
          <TextInput
            style={styles.input}
            value={contact}
            onChangeText={setContact}
            placeholder="Contact"
            keyboardType="phone-pad"
          />

          {/* Password Input */}
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="New Password"
            secureTextEntry={true}
          />

          {/* Re-enter Password Input */}
          <TextInput
            style={styles.input}
            value={rePassword}
            onChangeText={setRePassword}
            placeholder="Re-enter Password"
            secureTextEntry={true}
          />

          {/* Update Button */}
          <TouchableOpacity style={styles.updateButton} onPress={handleUpdateProfile}>
            <Text style={styles.updateButtonText}>Update Profile</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 20,
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 15,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  profileImageContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  input: {
    width: '100%',
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  updateButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    width: '100%',
  },
  updateButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Profile;
