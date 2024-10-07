import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Pressable } from 'react-native';

const Posting = ({ navigation }) => { 
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [activeTab, setActiveTab] = useState('Post'); // Active Tab State

  // Function to handle the form submission
  const handlePostSubmission = () => {
    // Your form submission logic here (e.g., validation, API call, etc.)
    alert('Post Submitted!');
  };

  return (
    <View style={styles.container}>
      {/* Tab Container */}
      <View style={styles.tabContainer}>
        <Pressable
          style={[styles.tab, activeTab === 'Post' && styles.activeTab]}
          onPress={() => setActiveTab('Post')}
        >
          <Text style={[styles.tabText, activeTab === 'Post' && styles.activeTabText]}>Post</Text>
        </Pressable>

        <Pressable
          style={[styles.tab, activeTab === 'News' && styles.activeTab]}
          onPress={() => navigation.navigate('News')}
        >
          <Text style={[styles.tabText, activeTab === 'News' && styles.activeTabText]}>News</Text>
        </Pressable>

        <Pressable
          style={[styles.tab, activeTab === 'Banking' && styles.activeTab]}
          onPress={() => navigation.navigate('Banking')} 
        >
          <Text style={[styles.tabText, activeTab === 'Banking' && styles.activeTabText]}>Banking</Text>
        </Pressable>

        <Pressable
          style={[styles.tab, activeTab === 'Fund' && styles.activeTab]}
          onPress={() => navigation.navigate('Fund')}
        >
          <Text style={[styles.tabText, activeTab === 'Fund' && styles.activeTabText]}>Funding</Text>
        </Pressable>
      </View>

      {/* Form */}
      <View style={styles.form}>
        {/* Name Field */}
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
          {/* <Image
            style={styles.uploadIcon}
            source={{ uri: 'https://img.icons8.com/ios-filled/50/ffffff/upload.png' }}
          /> */}
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
    backgroundColor: '#e0f8fc',
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
    color:'#fff',
  },
  activeTabText: {
    fontWeight: 'bold',
    color: '#000',
  },
  form: {
    flex: 1,
  },
  input: {
    backgroundColor: '#a7dbe9',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
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
  uploadIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  uploadText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  postButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  postButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Posting;
