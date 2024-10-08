import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import Fundheader from './Fundheader'; // Ensure this is the correct path
import Fside from './Fside'; // Import FundSidemenu correctly

const Posting = ({ navigation }) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [activeTab, setActiveTab] = useState('Post'); // Active Tab State
  const [isMenuVisible, setMenuVisible] = useState(false); // Side menu visibility state

  // Toggle function for the menu visibility
  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  // Function to handle the form submission
  const handlePostSubmission = () => {
    alert('Post Submitted!');
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

      {/* Guideline Text */}
      <View style={styles.guidelineContainer}>
        <Text style={styles.bulletPoint}>
          *පහත පෝරමය නිවැරදි දුරකථන අංකය හෝ ඊමේල් ලිපිනය සදහන් කර පැහැදිලි විස්තර ඇතුළත් කර පුරවන්න.මෙම පෝරමය ඔබට
          මූලම්‍යමය වශයෙන් හෝ උපකාර කිරීමට සිටින ප්‍රධානීන්ටද පෙන්නම් කරයි.
        </Text>
      </View>

      {/* Form */}
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

        {/* Upload Images Button */}
        <TouchableOpacity style={styles.uploadButton}>
          <Text style={styles.uploadText}>Upload Images</Text>
        </TouchableOpacity>

        {/* Post Button */}
        <TouchableOpacity style={styles.postButton} onPress={handlePostSubmission}>
          <Text style={styles.postButtonText}>Post</Text>
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#000',
    borderRadius: 25,
    marginVertical: 20,
    padding: 5,
  },
  tab: {
    flex: 1,
    padding: 8,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#fff',
    borderRadius: 25,
  },
  tabText: {
    fontSize: 18,
    color: '#fff',
  },
  activeTabText: {
    fontWeight: 'bold',
    color: '#000',
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
});

export default Posting;
