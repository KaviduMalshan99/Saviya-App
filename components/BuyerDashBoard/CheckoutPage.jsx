import React, { useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Header from './Header'; // Assume you have a Header component
import { useRoute, useNavigation } from '@react-navigation/native'; // Added useNavigation for navigation

const CheckoutPage = () => {
  const route = useRoute();
  const navigation = useNavigation(); // Added navigation hook

  const {
    productName,
    quantity,
    productPrice = 0,
    deliveryFee = 0,
    total = 0,
    userName,
    address,
    paymentMethod,
    productImage,
    selectedColor,
    phoneNumber,      // Receive phone number
    email,            // Receive email
    stateProvince,    // Receive state/province
    postalCode,       // Receive postal code
    subtotal,         // Receive subtotal
  } = route.params;

  // Calculate sellerTotal
  const sellerTotal = (total - deliveryFee) * 0.95;

  useEffect(() => {
    console.log('Received data on CheckoutPage:');
    console.log({
      productName,
      quantity,
      productPrice,
      deliveryFee,
      total,
      sellerTotal,
      userName,
      address,
      paymentMethod,
      productImage,
      selectedColor,
      phoneNumber,
      email,
      stateProvince,
      postalCode,
      subtotal,
    });
  }, [productName, quantity, productPrice, deliveryFee, total, sellerTotal, userName, address, paymentMethod, productImage, selectedColor, phoneNumber, email, stateProvince, postalCode, subtotal]);

  const handleConfirmOrder = () => {
    // Validation to ensure all required fields are filled
    if (!productName || !quantity || !productPrice || !userName || !address || !paymentMethod || !phoneNumber || !email || !stateProvince || !postalCode) {
      Alert.alert('Missing required fields', 'Please make sure all fields are filled.');
      return;
    }

    const sellerTotal = (total - deliveryFee) * 0.95;

    // Log all the data before sending
    console.log({
      productName,
      productImage,
      productPrice,
      selectedColor,
      quantity,
      userName,
      phoneNumber,
      email,
      stateProvince,
      postalCode,
      address,
      paymentMethod,
      subtotal,
      total,
      sellerTotal,
    });  

    // Send order data to PHP backend
    fetch('http://192.168.1.6/product_app/save_order.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        product_name: productName,  // Ensure field names match with backend
        product_image: productImage,
        price: productPrice,
        color: selectedColor,
        quantity: quantity,
        customer_name: userName,
        phone_number: phoneNumber,
        email: email,
        state_province: stateProvince,
        postal_code: postalCode,
        delivery_address: address,
        payment_method: paymentMethod,
        subtotal: subtotal,
        total: total,
        seller_total: sellerTotal,
      }).toString(),  // Ensure the data is serialized as URL parameters
    })
    .then(response => response.json())
    .then(data => {
      console.log('Response data:', data);
      if (data.status === 'success') {
        // Navigate to OrderSuccessPage
        navigation.navigate('OrderSuccessPage');
      } else {
        // Handle error response
        console.log('Order failed:', data.message);
        Alert.alert('Order failed', data.message);
        // Navigate to OrderFailurePage if there's an error
        navigation.navigate('OrderFailurePage');
      }
    })
    .catch(error => {
      console.error('Error:', error.message);
      Alert.alert('Error', 'Error: ' + error.message);
      // Navigate to OrderFailurePage on fetch error
      navigation.navigate('OrderFailurePage');
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Checkout Title */}
        <Text style={styles.title}>Checkout</Text>

        {/* Order Summary Section */}
        <View style={styles.summarySection}>
          <Text style={styles.sectionTitle}>My Order</Text>

          <View style={styles.orderSummary}>
            <Text style={styles.productName}>{productName}</Text>
            <Text style={styles.productDetails}>
              {quantity} x LKR {parseFloat(productPrice).toFixed(2)}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Delivery:</Text>
            <Text style={styles.summaryText}>LKR {parseFloat(deliveryFee).toFixed(2)}</Text> 
          </View>

          <View style={styles.separatorLine} />
          
          <View style={styles.summaryRow}>
            <Text style={styles.totalText}>Total:</Text>
            <Text style={styles.totalText}>LKR {parseFloat(total).toFixed(2)}</Text> 
          </View>
        </View>

        {/* Shipping & Payment Info Section */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Shipping & Payment Info</Text>
          <Text style={styles.infoText}>{userName}</Text>
          <Text style={styles.infoText}>{address}</Text>
          <Text style={styles.infoText}>{paymentMethod === 'cash' ? 'Cash on Delivery' : paymentMethod}</Text>
        </View>

        {/* Confirm Order Button */}
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmOrder}>
          <Text style={styles.confirmText}>Confirm Order</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  summarySection: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2, // Shadow for Android
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 }, // Shadow for iOS
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  orderSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productDetails: {
    fontSize: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  summaryText: {
    fontSize: 16,
    color: '#333',
  },
  separatorLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginVertical: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoSection: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  confirmButton: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CheckoutPage;
