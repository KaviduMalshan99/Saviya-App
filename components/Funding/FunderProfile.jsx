import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Import Image Picker from Expo
import Icon from 'react-native-vector-icons/MaterialIcons';
import Fundheader from './Fundheader';
import Fside from './Fside';
import DateTimePicker from '@react-native-community/datetimepicker';

const FunderProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [joinedDate, setJoinedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [profileImage, setProfileImage] = useState(null); // Store selected image or null
  const [isMenuVisible, setMenuVisible] = useState(false);

  // Define the toggleMenu function
  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible); // Toggle the side menu visibility
  };

  // Function to ask for media library permissions
  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'We need media library permissions to make this work!');
    }
  };

  useEffect(() => {
    requestPermission(); // Ask for permission on component mount
  }, []);

  // Handle Image Selection
  const handleSelectImage = async () => {
    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Restrict to images
      quality: 1,
    };

    const result = await ImagePicker.launchImageLibraryAsync(options);

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri); // Save the selected image URI
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || joinedDate;
    setShowDatePicker(Platform.OS === 'ios');
    setJoinedDate(currentDate);
  };

  const handleSaveProfile = async () => {
    try {
      const defaultImageUri = Image.resolveAssetSource(require('../../assets/images/Otara.jpg')).uri; // Get the URI of the default image

      const formData = {
        name: name,
        email: email,
        location: location,
        joinedDate: joinedDate.toISOString().split('T')[0], // Format the date (YYYY-MM-DD)
        profileImageUri: profileImage || defaultImageUri, // Use selected image or default
      };

      const response = await fetch('http://192.168.8.113/myapp/submit_funderprofile_php.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData).toString(),
      });

      const result = await response.json();

      if (result.status === 'success') {
        Alert.alert('Success', 'Profile saved successfully!');
        setName('');
        setEmail('');
        setLocation('');
        setJoinedDate(new Date());
        setProfileImage(null); // Reset to default
      } else {
        Alert.alert('Error', result.message);
      }
    } catch (error) {
      Alert.alert('Error', 'There was an error submitting your profile: ' + error.message);
    }
  };

  const handleUpdateProfile = () => {
    Alert.alert('Profile updated successfully!');
  };

  const handleDeleteProfile = () => {
    Alert.alert('Profile deleted successfully!');
  };

  return (
    <View style={styles.container}>
      {/* Pass the toggleMenu function to the Fundheader component */}
      <Fundheader toggleMenu={toggleMenu} />

      {isMenuVisible && (
        <View style={styles.menuOverlay}>
          <Fside visible={isMenuVisible} toggleMenu={toggleMenu} />
          <TouchableOpacity style={styles.overlay} onPress={() => setMenuVisible(false)} />
        </View>
      )}

      {/* Profile Picture */}
      <View style={styles.profileContainer}>
        <Image
          source={profileImage ? { uri: profileImage } : require('../../assets/images/nonpro.jpg')} // Use selected image or default
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.cameraIcon} onPress={handleSelectImage}>
          <Icon name="camera-alt" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder=" Full Name"
          placeholderTextColor="#666"
        />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder=" Email / Fax"
          placeholderTextColor="#666"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          value={location}
          onChangeText={setLocation}
          placeholder=" Business Location"
          placeholderTextColor="#666"
        />

        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
          <Text style={styles.datePickerText}>
            Joined Date: {joinedDate.toDateString()}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={joinedDate}
            mode="date"
            display={Platform.OS === 'android' ? 'calendar' : 'default'}
            onChange={handleDateChange}
          />
        )}

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          {/* <TouchableOpacity style={styles.updateButton} onPress={handleUpdateProfile}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity> */}

          <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
            <Text style={styles.buttonText}>Save Profile</Text>
          </TouchableOpacity>
        </View>

        {/* <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteProfile}>
          <Text style={styles.deleteButtonText}>Delete Profile</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b8f6f1',
    paddingHorizontal: 20,
  },
  menuOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
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
    bottom: 5,
    right: 90,
    backgroundColor: '#000',
    borderRadius: 15,
    padding: 6,
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
    marginBottom: 12,
  },
  datePickerText: {
    color: '#333',
    fontSize: 16,
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
    marginRight: 10,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 20,
    flex: 1,
    marginTop:35,
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
