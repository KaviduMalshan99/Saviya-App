import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, TextInput, Alert, ScrollView } from 'react-native';
import Header from './Header'; // Assume you have a Header component
import { useRoute, useNavigation } from '@react-navigation/native'; // Add useNavigation

const OrderPage = () => {
  const route = useRoute();
  const navigation = useNavigation(); // Initialize navigation
  const { productId, productName, productPrice, productImage, selectedColor, selectedQuantity } = route.params;

  const [quantity, setQuantity] = useState(selectedQuantity);
  const [subtotal, setSubtotal] = useState(productPrice * selectedQuantity);
  const [deliveryFee] = useState(110); // Fixed delivery fee
  const [total, setTotal] = useState(subtotal + deliveryFee);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [userName, setUserName] = useState(''); // For user input
  const [address, setAddress] = useState('');   // For user input
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [stateProvince, setStateProvince] = useState('');
  const [postalCode, setPostalCode] = useState('');

  useEffect(() => {
    setSubtotal(productPrice * quantity);
    setTotal(subtotal + deliveryFee);
  }, [quantity, subtotal]);

  // Validation function to check if form is valid
  const isFormValid = () => {
    if (!userName || !phoneNumber || !email || !address || !stateProvince || !postalCode) {
      Alert.alert("Validation Error", "Please fill out all required fields.");
      console.log("Form Validation Failed", { userName, phoneNumber, email, address, stateProvince, postalCode });
      return false;
    }
    return true;
  };

  const handleQuantityChange = (action) => {
    if (action === 'increase') {
      setQuantity(quantity + 1);
    } else if (action === 'decrease' && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleCheckout = () => {
    if (!paymentMethod || !isFormValid()) {
      Alert.alert("Please fill out all fields and select a payment method.");
      return;
    }

    // Log all the data being passed to CheckoutPage
    console.log('Navigating with the following data:');
    console.log({
      productId,
      productName,
      productPrice,
      quantity,
      deliveryFee,
      total,
      userName,
      address,
      phoneNumber,
      email,
      stateProvince,
      postalCode,
      paymentMethod,
      productImage,
      selectedColor,
      subtotal,
    });

    // Navigate to CheckoutPage with all necessary params
    navigation.navigate('CheckoutPage', {
      productId,
      productName,
      productPrice,
      quantity,
      deliveryFee,
      total,
      userName,
      address,
      phoneNumber,
      email,
      stateProvince,
      postalCode,
      paymentMethod,
      productImage,
      selectedColor,
      subtotal,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Your Order</Text>

        <View style={styles.orderSection}>
          {/* Product Image */}
          <Image source={{ uri: productImage }} style={styles.productImage} />

          {/* Product Details */}
          <View style={styles.productDetails}>
            <Text style={styles.productName}>{productName}</Text>
            <Text style={styles.productPrice}>LKR {productPrice}</Text>
            {selectedColor && <Text style={styles.productColor}>Color: {selectedColor}</Text>}
          </View>

          {/* Quantity Selector - Vertically aligned */}
          <View style={styles.quantitySelector}>
            <TouchableOpacity onPress={() => handleQuantityChange('decrease')} style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity onPress={() => handleQuantityChange('increase')} style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Shipping & Payment Info Title */}
        <Text style={styles.sectionTitle}>Shipping & Payment info</Text>

        {/* User Info Section */}
        <View style={styles.userInfoSection}>
          <TextInput
            placeholder="Name"
            value={userName}
            onChangeText={setUserName}
            style={styles.input}
          />
          <TextInput
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            style={styles.input}
            keyboardType="phone-pad"
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
          />
          {/* State and Postal Code in one horizontal line */}
          <View style={styles.statePostalContainer}>
            <TextInput
              placeholder="State/Province"
              value={stateProvince}
              onChangeText={setStateProvince}
              style={styles.stateInput}
            />
            <TextInput
              placeholder="Postal Code"
              value={postalCode}
              onChangeText={setPostalCode}
              style={styles.postalInput}
              keyboardType="number-pad"
            />
          </View>
          <TextInput
            placeholder="Delivery Address"
            value={address}
            onChangeText={setAddress}
            style={[styles.input, { marginTop: 10 }]}
          />
        </View>

        {/* Payment Method Section */}
        <Text style={styles.sectionTitle}>Payment Methods</Text>
        <View style={styles.paymentMethods}>
          <TouchableOpacity onPress={() => handlePaymentMethodChange('cash')} style={paymentMethod === 'cash' ? styles.selectedPayment : styles.paymentOption}>
            <Text style={styles.paymentText}>Cash on Delivery</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePaymentMethodChange('mintpay')} style={paymentMethod === 'mintpay' ? styles.selectedPayment : styles.paymentOption}>
            <Text style={styles.paymentText}>Mintpay</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePaymentMethodChange('card')} style={paymentMethod === 'card' ? styles.selectedPayment : styles.paymentOption}>
            <Text style={styles.paymentText}>Card</Text>
          </TouchableOpacity>
        </View>

        {/* Subtotal and Total */}
        <View style={styles.summarySection}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Subtotal:</Text>
            <Text style={styles.summaryText}>LKR {subtotal}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Delivery:</Text>
            <Text style={styles.summaryText}>LKR {deliveryFee}</Text>
          </View>
          <View style={styles.separatorLine} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalText}>Total:</Text>
            <Text style={styles.totalText}>LKR {total}</Text>
          </View>
        </View>

        {/* Proceed to Checkout */}
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutText}>Proceed To Checkout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  orderSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
    elevation: 2, // Shadow for Android
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 }, // Shadow for iOS
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 20,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333333',
  },
  productColor: {
    fontSize: 14,
    marginBottom: 10,
    color: '#666666',
  },
  quantitySelector: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  quantityButton: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginVertical: 5,
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'left',
  },
  userInfoSection: {
    marginBottom: 20,
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  statePostalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stateInput: {
    flex: 1,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  postalInput: {
    flex: 1,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  paymentMethods: {
    flexDirection: 'column', // Vertical layout for payment methods
    marginBottom: 20,
  },
  paymentOption: {
    padding: 15,
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  selectedPayment: {
    padding: 15,
    backgroundColor: '#FF6347',
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  paymentText: {
    fontSize: 16,
    color: '#333',
  },
  summarySection: {
    marginBottom: 30,
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
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  separatorLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginVertical: 10,
  },
  checkoutButton: {
    padding: 20,
    backgroundColor: '#000',
    borderRadius: 10,
    marginTop: 10,
  },
  checkoutText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OrderPage;
