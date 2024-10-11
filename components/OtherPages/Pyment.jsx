import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, ScrollView } from 'react-native';

const PaymentPage = ({ navigation }) => {
  // Example data for the course payment
  const [packagePrice, setPackagePrice] = useState(100); // Example price
  const [tax, setTax] = useState(10); // Example tax
  const [totalPrice, setTotalPrice] = useState(packagePrice + tax); // Total calculation

  // Customer details state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handlePayment = () => {
    // Redirect to success page after payment details are filled
    if (!name || !email || !phone) {
      alert('Please fill in all the details');
      return;
    }
    navigation.navigate('PaymentSuccessPage');
  };

  return (
    <ImageBackground
      source={require('../../assets/images/onBoardScreens/BG2.png')} // Replace with your background image
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>

        {/* Title */}
        <Text style={styles.title}>Payment Details</Text>

        {/* Payment Details Section */}
        <View style={styles.paymentDetails}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Package Price:</Text>
            <Text style={styles.value}>${packagePrice}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Tax:</Text>
            <Text style={styles.value}>${tax}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Total Price:</Text>
            <Text style={styles.value}>${totalPrice}</Text>
          </View>
        </View>

        {/* Customer Details Section */}
        <View style={styles.customerDetails}>
          <Text style={styles.sectionTitle}>Customer Information</Text>

          {/* Name Input */}
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#000"
            value={name}
            onChangeText={setName}
          />

          {/* Email Input */}
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#000"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          {/* Phone Input */}
          <TextInput
            style={styles.input}
            placeholder="Phone"
            placeholderTextColor="#000"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>

        {/* Payment Button */}
        <TouchableOpacity style={styles.button} onPress={handlePayment}>
          <Text style={styles.buttonText}>Proceed to Payment</Text>
        </TouchableOpacity>

      </ScrollView>
    </ImageBackground>
  );
};

// Styles
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    padding: 20,
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  paymentDetails: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    color: '#333',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    color: '#333',
  },
  value: {
    fontSize: 18,
    color: '#333',
  },
  customerDetails: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Lato-Bold',
  },
});

export default PaymentPage;
