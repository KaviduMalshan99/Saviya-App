import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import Header from './Header'; // Import the Header component
import Icon from 'react-native-vector-icons/FontAwesome';

const CartPage = () => {
  const email = 'vgamaka@gmail.com';
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCartData = async () => {
    try {
      const response = await fetch(`http://192.168.1.6/product_app/get_cart.php?email=${email}`);
      const data = await response.json();
      if (data.status === 'success') {
        setCartItems(data.cartItems);
      } else {
        setCartItems([]);
      }
      setIsLoading(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch cart data.');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  const handleQuantityChange = async (productId, action) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === productId) {
        let newQuantity = item.quantity;
        if (action === 'increase') {
          newQuantity++;
        } else if (action === 'decrease' && item.quantity > 1) {
          newQuantity--;
        }
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setCartItems(updatedCartItems);

    try {
      await fetch('http://192.168.1.6/product_app/update_cart.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          product_id: productId,
          quantity: updatedCartItems.find(item => item.id === productId).quantity,
        }).toString(),
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to update cart quantity.');
    }
  };

  const handleDeleteItem = async (productId) => {
    try {
      const response = await fetch(`http://192.168.1.6/product_app/delete_cart_item.php?product_id=${productId}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      if (result.status === 'success') {
        setCartItems(cartItems.filter(item => item.id !== productId));
      } else {
        Alert.alert('Error', 'Failed to delete product from cart.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while deleting the product from the cart.');
    }
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Use Header */}
      <Header />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Your Cart</Text>

        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <View key={item.id} style={styles.cartItem}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <View style={styles.productDetails}>
                <Text style={styles.productName}>{item.product_name}</Text>
                {item.color && <Text style={styles.productColor}>Color: {item.color}</Text>}
                <Text style={styles.productPrice}>LKR {item.price}</Text>

                <View style={styles.quantityContainer}>
                  <TouchableOpacity onPress={() => handleQuantityChange(item.id, 'decrease')} style={styles.quantityButton}>
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantity}>{item.quantity}</Text>
                  <TouchableOpacity onPress={() => handleQuantityChange(item.id, 'increase')} style={styles.quantityButton}>
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteItem(item.id)}>
                <Icon name="trash" size={24} color="#000" />
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.emptyCartText}>Your cart is empty.</Text>
        )}
      </ScrollView>

      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f5',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  productColor: {
    fontSize: 14,
    color: '#999',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityButton: {
    backgroundColor: '#333',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  quantity: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    paddingHorizontal: 10,
  },
  deleteButton: {
    padding: 10,
    marginLeft: 15,
    backgroundColor: 'transparent',
  },
  emptyCartText: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
    marginTop: 50,
  },
  checkoutButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CartPage;
