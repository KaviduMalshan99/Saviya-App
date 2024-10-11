import React from 'react';
import { View, Text, Image, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';

const OnboardingScreen1 = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../assets/images/onBoardScreens/BG1.png')} // Your cloud background image
      style={styles.backgroundImage}
      resizeMode="cover" // Ensures the background image covers the whole area
    >
      <View style={styles.container}>
        <View style={styles.skipContainer}>
          <Text style={styles.skipText}>Skip</Text>
        </View>
        <Image 
          source={require('../../assets/images/onboardScreen1.png')} 
          style={styles.image} 
        />
        <Text style={styles.title}>Learn And Master Your Craft</Text>
        <Text style={styles.description}>
          Access interactive tutorials and live workshops to grow your artisan skills, 
          tailored to your level and craft.
        </Text>
        <View style={styles.paginationContainer}>
          <View style={styles.dot}></View>
          <View style={styles.dot}></View>
          <View style={styles.dot}></View>
        </View>

        {/* TouchableOpacity for Next button functionality */}
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('Onboarding2')} // Navigate on press
        >
          <Text style={styles.buttonText}>Next</Text>
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
  skipContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  skipText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Lato-Bold'
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
    top: 40,
    backgroundColor: '#000', // Button background color
    width: 300, // Set button width
    height: 50, // Set button height
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Lato-Bold',
  }
});

export default OnboardingScreen1;
