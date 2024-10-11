import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native'; // Import navigation

const ContentDetails = () => {
  const route = useRoute();
  const { content, courseId } = route.params; // Get the content and courseId passed from CourseDetails
  const navigation = useNavigation(); // Access navigation

  const handleCompleteContent = () => {
    // Navigate back to CourseDetails and set the active tab to 'lessons'
    navigation.navigate('CourseDetails', { courseId: courseId, initialTab: 'lessons' });
  };

  return (
    <ImageBackground
      source={ require('../../assets/images/onBoardScreens/BG6.png')} // Replace this with your background image URL
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
      
        <Text style={styles.title}>{content.title}</Text>
        <Text style={styles.description}>{content.description}</Text>

        {/* Complete Content Button */}
        <TouchableOpacity style={styles.button} onPress={handleCompleteContent}>
          <Text style={styles.buttonText}>Complete Content</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  container: {
    padding: 20,
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontFamily: 'guruogomi1',
    color:'purple',
    marginBottom: 50,
    textAlign: 'center',
    borderRadius:10,
    backgroundColor:'rgba(255, 255, 255, 0.9)',
    padding:20,

  },
  description: {
    fontSize: 18,
    lineHeight: 30,
    fontFamily: 'guruogomi1',
    textAlign: 'justify',
  },
  button: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Lato-Bold',
  },
});

export default ContentDetails;
