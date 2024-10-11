import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ImageBackground,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const RatingPage = () => {
  const navigation = useNavigation();
  const [rating, setRating] = useState(0); // Store the rating (1-5)
  const [comment, setComment] = useState(''); // Store the user's comment

  const handleRatingPress = (star) => {
    setRating(star); // Set the selected rating
  };

  const handleConfirm = () => {
    // Logic to handle the rating and comment submission goes here
    alert(`Rated: ${rating} stars\nComment: ${comment}`);
    navigation.navigate('Drawer'); // Navigate to the home page after submission
  };

  const handleGoHome = () => {
    navigation.navigate('Drawer'); // Navigate to home page directly
  };

  return (
    <ImageBackground
      source={require('../../assets/images/onBoardScreens/BG2.png')} // Replace with your background image path
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Rate this Course</Text>

        <Image
          source={require('../../assets/images/whoareyou/rate.png')} // Replace with your middle image path
          style={styles.middleImage}
        />

        {/* Star Rating */}
        <View style={styles.starsContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => handleRatingPress(star)}>
              <MaterialCommunityIcons
                name={star <= rating ? 'star' : 'star-outline'}
                size={40}
                color="gold"
              />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.messageText}>ඔබගේ අදහස් සහ යෝජනා අපට සේවාවේ ගුණාත්මක භාවය වඩා හොඳින් වැඩිදියුණු කිරීමට උපකාරී වේ!</Text>


        {/* Comment Box */}
        <TextInput
          style={styles.commentBox}
          placeholder="Leave a comment"
          placeholderTextColor="#888"
          multiline
          value={comment}
          onChangeText={setComment}
        />

        
        {/* Confirm Button */}
        <TouchableOpacity style={styles.button} onPress={handleConfirm}>
          <Text style={styles.buttonText}>Submit Rating</Text>
        </TouchableOpacity>

        {/* Go to Home Page Button */}
        <TouchableOpacity style={styles.linkButton} onPress={handleGoHome}>
          <Text style={styles.linkButtonText}>Go to Home Page</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    color: '#000',
    fontFamily: 'Lato-Bold',
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  middleImage: {
    width: 150, // Adjust size as needed
    height: 150, // Adjust size as needed
    marginBottom: 30,
  },
  commentBox: {
    width: '80%',
    height: 100,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
    fontSize: 16,
  },
  messageText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40,
    color: '#fff',
    fontFamily: 'guruogomi1',
    lineHeight: 30,
  },
  button: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Lato-Bold',
  },
  linkButton: {
    padding: 15,
    alignItems: 'center',
    width: '80%',
  },
  linkButtonText: {
    color: 'blue',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default RatingPage;
