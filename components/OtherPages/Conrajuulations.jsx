import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CongratulationsPage = () => {
  const navigation = useNavigation();

  const handleDownloadCertificate = () => {
    // Logic for downloading the certificate goes here
    alert('Certificate downloaded!');
  };

  const handleLeaveFeedback = () => {
    navigation.navigate('Rating'); // Navigate to the RatingPage
  };

  const handleGoBack = () => {
    navigation.navigate('CourseDetails', { activeTab: 'lessons' });
  };

  return (
    <ImageBackground
      source={require('../../assets/images/onBoardScreens/BG2.png')} // Replace with your background image path
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Middle Image */}
        <Image
          source={require('../../assets/images/whoareyou/women.png')} // Replace with your middle image path
          style={styles.middleImage}
        />

        {/* Congratulations Text */}
        <Text style={styles.congratulationsText}>Congratulations!</Text>
        <Text style={styles.messageText}>ඔබ පාඨමාලාව සාර්ථකව නිම කර ඇත! අපි ඔබට සුභ පතන්නෙමු...!</Text>

        {/* Download Certificate Button */}
        <TouchableOpacity style={styles.button} onPress={handleDownloadCertificate}>
          <Text style={styles.buttonText}>Download Certificate</Text>
        </TouchableOpacity>

        {/* Go to Rating Page (Leave Feedback) Button */}
        <TouchableOpacity style={styles.button} onPress={handleLeaveFeedback}>
          <Text style={styles.buttonText}>Leave Feedback</Text>
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
  middleImage: {
    width: 200, // Adjust size as needed
    height: 300, // Adjust size as needed
    marginBottom: 30,
  },
  congratulationsText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
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
    marginVertical: 10,
    alignItems: 'center',
    width: '80%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Lato-Bold',
  },
});

export default CongratulationsPage;
