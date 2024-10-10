import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const OrderSuccessPage = () => {
  const navigation = useNavigation();

  const handleViewOrders = () => {
    // Navigate to the Orders Page
    navigation.navigate('OrdersPage'); // Change 'OrdersPage' to the correct route name
  };

  const handleContinueShopping = () => {
    // Navigate back to home or product listing
    navigation.navigate('BuyerHome'); // Change 'HomePage' to the correct route name
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          {/* Placeholder for success icon */}
          <Text style={styles.icon}>✔️</Text>
        </View>
        <Text style={styles.title}>Thank You For Your Order!</Text>
        <Text style={styles.subtitle}>
          Your order will be delivered on time. Thank you!
        </Text>
        <TouchableOpacity style={styles.primaryButton} onPress={handleViewOrders}>
          <Text style={styles.primaryButtonText}>View Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={handleContinueShopping}>
          <Text style={styles.secondaryButtonText}>Continue Shopping</Text>
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
    backgroundColor: '#E0F7FA',
    padding: 20,
    borderRadius: 50,
    marginBottom: 20,
  },
  icon: {
    fontSize: 40,
    color: '#4CAF50',
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

export default OrderSuccessPage;
