import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';

const OnboardingScreen1 = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/onboardScreen1.png')} style={styles.image} />
      <Text style={styles.description}>Welcome to Saviya! Discover amazing features.</Text>
      <Button title="Next" onPress={() => navigation.navigate('Onboarding2')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: '100%',
    height: 300,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 16,
  },
});

export default OnboardingScreen1;
