import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Import Image Picker
import * as FileSystem from 'expo-file-system'; // Import File System for image handling
import Fundheader from './Fundheader'; // Ensure this is the correct path
import Fside from './Fside'; // Import FundSidemenu correctly

const Posting = ({ navigation }) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(null); // State to hold the selected image
  const [isMenuVisible, setMenuVisible] = useState(false); // Side menu visibility state

  // Toggle function for the menu visibility
  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  // Function to handle image selection from the gallery
  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'You need to allow access to the gallery to upload an image.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  // Function to handle the form submission
  const handlePostSubmission = async () => {
    if (!selectedImage) {
      Alert.alert('Error', 'Please select an image.');
      return;
    }

    // Create a new FormData object
    const formData = new FormData();
    formData.append('name', name);
    formData.append('contact', contact);
    formData.append('location', location);
    formData.append('description', description);

    // Get the image file info
    const fileInfo = await FileSystem.getInfoAsync(selectedImage);

    // Add the image to the FormData
    formData.append('image', {
      uri: selectedImage,
      type: 'image/jpeg', // Assuming it's a jpeg image
      name: fileInfo.uri.split('/').pop(),
    });

    try {
      const response = await fetch('http://192.168.8.113/myapp/submit_post.php', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (result.status === 'success') {
        Alert.alert('Success', 'Post Submitted Successfully!');
        setName('');
        setContact('');
        setLocation('');
        setDescription('');
        setSelectedImage(null);
      } else {
        Alert.alert('Error', result.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Error submitting post: ' + error.message);
    }
};


  return (
    <View style={styles.container}>
      {/* Header */}
      <Fundheader title="Posting" toggleMenu={toggleMenu} />

      {/* Side Menu */}
      {isMenuVisible && (
        <View style={styles.menuOverlay}>
          <Fside visible={isMenuVisible} toggleMenu={toggleMenu} />
          <TouchableOpacity style={styles.overlay} onPress={() => setMenuVisible(false)} />
        </View>
      )}

      <Text style={styles.Tophead}>Guide To Make Post</Text>

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.guidelineContainer}>
          <Text style={styles.bulletPoint}>
            *පහත පෝරමය නිවැරදි දුරකථන අංකය හෝ ඊමේල් ලිපිනය සදහන් කර පැහැදිලි විස්තර ඇතුළත් කර පුරවන්න.මෙම පෝරමය ඔබට
            මූලම්‍යමය වශයෙන් හෝ උපකාර කිරීමට සිටින ප්‍රධානීන්ටද පෙන්නම් කරයි.
          </Text>
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#666"
          />
          <TextInput
            style={styles.input}
            placeholder="Contact No/Email"
            value={contact}
            onChangeText={setContact}
            placeholderTextColor="#666"
          />
          <TextInput
            style={styles.input}
            placeholder="Location"
            value={location}
            onChangeText={setLocation}
            placeholderTextColor="#666"
          />
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            placeholder="Your Message/Description"
            value={description}
            onChangeText={setDescription}
            placeholderTextColor="#aaa"
            multiline
          />

          {selectedImage && (
            <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
          )}

          <TouchableOpacity style={styles.uploadButton} onPress={handleImagePicker}>
            <Text style={styles.uploadText}>Upload Images</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.postButton} onPress={handlePostSubmission}>
            <Text style={styles.postButtonText}>Post</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  scrollContainer: {
    flex: 1,
  },
  guidelineContainer: {
    marginBottom: 15,
  },
  bulletPoint: {
    fontSize: 14,
    color: '#000',
    marginBottom: 10,
    fontWeight: '500',
  },
  Tophead: {
    fontSize: 23,
    fontWeight: '600',
    paddingVertical: 10,
    paddingHorizontal: 70,
    paddingBottom: 30,
    paddingTop: 30,
  },
  form: {
    flex: 1,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 20,
    borderColor: '#000',
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  selectedImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  uploadButton: {
    backgroundColor: '#ccd5ff',
    borderRadius: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  postButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
  },
  postButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
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
});

export default Posting;
