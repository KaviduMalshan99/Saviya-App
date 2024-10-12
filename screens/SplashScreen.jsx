import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Set a timeout to automatically move to the next screen
    setTimeout(() => {
      navigation.replace('Onboarding1'); // Navigate to the first onboarding screen after the splash screen
    }, 3000); // Adjust the delay as needed (e.g., 3000 for 3 seconds)
  }, [navigation]);

  return (
    <ImageBackground
      source={require('../assets/images/onBoardScreens/BG.png')} // Replace with your background image path
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Image source={require('../assets/images/logo.png')} style={styles.logo} />
        <Text style={styles.text}>Welcome to Saviya!</Text>
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
    
  },
  logo: {
    width: 250,
    height: 150, // Customize logo size
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'Lato-Bold'
  },
});

export default SplashScreen;
