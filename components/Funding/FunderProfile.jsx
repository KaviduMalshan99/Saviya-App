import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import Fundheader from './Fundheader'; // Import Fundheader
import Fside from './Fside'; // Import Fside

const FunderProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [isMenuVisible, setMenuVisible] = useState(false); // Side menu visibility state

  // Toggle function for the menu visibility
  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  // Handle Image Selection
  const handleSelectImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    Alert.alert(
      "Select Image",
      "Choose an option",
      [
        {
          text: "Take Photo",
          onPress: () => {
            launchCamera(options, (response) => {
              if (response.assets) {
                setProfileImage(response.assets[0].uri);
              }
            });
          },
        },
        {
          text: "Choose from Library",
          onPress: () => {
            launchImageLibrary(options, (response) => {
              if (response.assets) {
                setProfileImage(response.assets[0].uri);
              }
            });
          },
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  const handleUpdateProfile = () => {
    // Handle update profile logic here
    alert('Profile updated successfully!');
  };

  const handleSaveProfile = () => {
    // Handle save profile logic here
    alert('Profile saved successfully!');
  };

  const handleDeleteProfile = () => {
    // Handle delete profile logic here
    alert('Profile deleted successfully!');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Fundheader toggleMenu={toggleMenu} />

      {/* Side Menu */}
      {isMenuVisible && (
        <View style={styles.menuOverlay}>
          <Fside visible={isMenuVisible} toggleMenu={toggleMenu} />
          <TouchableOpacity style={styles.overlay} onPress={() => setMenuVisible(false)} />
        </View>
      )}

      {/* Profile Picture */}
      <View style={styles.profileContainer}>
        <Image
          source={profileImage ? { uri: profileImage } : require('../../assets/images/man.jpg')} // Placeholder or selected image
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.cameraIcon} onPress={handleSelectImage}>
          <Icon name="camera-alt" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
          placeholderTextColor="#666"
        />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          placeholderTextColor="#666"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="Enter your phone number"
          placeholderTextColor="#666"
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          value={location}
          onChangeText={setLocation}
          placeholder="Enter your location"
          placeholderTextColor="#666"
        />

        {/* Buttons Section */}
        <View style={styles.buttonContainer}>
          {/* Update Button */}
          <TouchableOpacity style={styles.updateButton} onPress={handleUpdateProfile}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>

          {/* Save Button */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>

        {/* Delete Profile Button */}
        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteProfile}>
          <Text style={styles.deleteButtonText}>Delete Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  menuOverlay: {
    position: 'absolute',  // Ensure it is positioned on top
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,  // High z-index to ensure it's on top of other elements
    flexDirection: 'row',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  profileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#fff',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    backgroundColor: '#000',
    borderRadius: 15,
    padding: 5,
  },
  form: {
    marginTop: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
    borderColor: '#000',
    borderWidth: 1,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  updateButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 20,
    flex: 1,
    marginRight: 10, // Space between Update and Save buttons
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 20,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FunderProfile;
