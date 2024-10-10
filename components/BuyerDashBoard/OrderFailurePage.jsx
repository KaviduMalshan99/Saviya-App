import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OrderFailurePage = () => {
  const navigation = useNavigation();

  const handleTryAgain = () => {
    // Navigate back to the Checkout Page to try the order again
    navigation.navigate('CheckoutPage'); // Change 'CheckoutPage' to the correct route name
  };

  const handleGoToProfile = () => {
    // Navigate to the Profile Page or Account settings
    navigation.navigate('ProfilePage'); // Change 'ProfilePage' to the correct route name
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          {/* Placeholder for failure icon */}
          <Text style={styles.icon}>❌</Text>
        </View>
        <Text style={styles.title}>Sorry! Your Order Has Failed!</Text>
        <Text style={styles.subtitle}>
          Something went wrong. Please try again to continue your order.
        </Text>
        <TouchableOpacity style={styles.primaryButton} onPress={handleTryAgain}>
          <Text style={styles.primaryButtonText}>Try Again</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={handleGoToProfile}>
          <Text style={styles.secondaryButtonText}>Go To My Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  iconContainer: {
    backgroundColor: '#FCE4EC',
    padding: 20,
    borderRadius: 50,
    marginBottom: 20,
  },
  icon: {
    fontSize: 40,
    color: '#F44336',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginBottom: 30,
  },
  primaryButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 15,
    width: '100%',
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
  },
  secondaryButton: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: '100%',
  },
  secondaryButtonText: {
    color: '#555',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default OrderFailurePage;
