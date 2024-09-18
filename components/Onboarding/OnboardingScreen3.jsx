import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';

// Update the path if needed
const OnboardingScreen1 = ({ navigation }) => {
  return (
    <View style={styles.container}>
      
      <Text style={styles.description}>Welcome to Saviya! Discover amazing features.</Text>
      <Button title="Get Started" onPress={() => navigation.navigate('WhoAreYou')} />
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
