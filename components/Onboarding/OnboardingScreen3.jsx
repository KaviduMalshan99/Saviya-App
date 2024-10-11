import React from 'react';
import { View, Text, Image, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';

const OnboardingScreen3 = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../assets/images/onBoardScreens/BG1.png')} // Your cloud background image
      style={styles.backgroundImage}
      resizeMode="cover" // Ensures the background image covers the whole area
    >
      <View style={styles.container}>
        
        <Image 
          source={require('../../assets/images/onboardScreen3.png')} 
          style={styles.image} 
        />
        <Text style={styles.title}>Connect and Collaborate</Text>
        <Text style={styles.description}>
          Join a community of artisans, attend events, and collaborate with peers to expand your network.
        </Text>

        {/* Pagination */}
        <View style={styles.paginationContainer}>
          <View style={styles.dot}></View>
          <View style={styles.dot}></View>
          <View style={styles.dot}></View>
        </View>

        {/* TouchableOpacity for "Get Start" button */}
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('Login')} // Navigate to Login screen
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    backgroundColor: '#15A196', // Your main background color behind the image
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  image: {
    width: 300,
    height: 220,
    resizeMode: 'contain',
    marginTop: 40, // Adjust this as per your need
  },
  title: {
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'Lato-Bold'
  },
  description: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginHorizontal: 16,
    marginBottom: 40,
    fontFamily: 'Lato-Bold'
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    marginHorizontal: 5,
  },
  buttonContainer: {
    backgroundColor: '#000', // Button background color
    width: 300, // Set button width
    height: 50, // Set button height
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    fontSize: 18,
    fontFamily: 'Lato-Bold',
    marginTop: 40, // Adjust as per your design
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Lato-Bold',
  },
});

export default OnboardingScreen3;
