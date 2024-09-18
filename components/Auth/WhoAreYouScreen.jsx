import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const WhoAreYouScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Who Are You?</Text>

      {/* Learner Option */}
      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => navigation.navigate('Login')} // Navigates to Login
      >
        <Text style={styles.optionText}>Learner</Text>
      </TouchableOpacity>

      {/* Buyer Option */}
      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => navigation.navigate('Login')} // Navigates to Login
      >
        <Text style={styles.optionText}>Buyer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  optionButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 5,
    marginBottom: 20,
  },
  optionText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default WhoAreYouScreen;
