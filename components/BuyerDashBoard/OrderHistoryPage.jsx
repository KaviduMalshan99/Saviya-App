import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, Image, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import Header from './Header'; // Assume Header component exists
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]); // State to hold orders
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigation = useNavigation(); // Initialize useNavigation hook

  // Function to fetch orders for the user
  const fetchOrders = async () => {
    try {
      const response = await fetch('http://192.168.1.6/product_app/get_order_history.php?email=vgamaka@gmail.com');
      const data = await response.json();
      if (data.message) {
        setError(data.message);
      } else {
        setOrders(data);
      }
    } catch (error) {
      setError('Failed to fetch order history');
    } finally {
      setLoading(false);
    }
  };

  // Function to delete an order by email and created_at
  const handleClearOrder = async (orderIndex) => {
    const order = orders[orderIndex];

    // Confirm before deleting
    Alert.alert(
      'Clear Order',
      `Are you sure you want to clear order ${order.product_name} created on ${order.created_at}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: async () => {
            try {
              const response = await fetch('http://192.168.1.6/product_app/delete_order.php', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                  product_name: order.product_name,
                  email: 'vgamaka@gmail.com', // Use the correct email
                  created_at: order.created_at, // Include created_at for specific order deletion
                }).toString(), // Make sure the body is properly serialized
              });

              // Check if the response is OK
              if (response.ok) {
                const result = await response.json(); // Parse JSON only if OK
                console.log(result); // Log the response for debugging

                if (result.status === 'success') {
                  const updatedOrders = orders.filter((_, index) => index !== orderIndex);
                  setOrders(updatedOrders); // Update the orders list without the deleted order
                  Alert.alert('Order cleared successfully.');
                } else {
                  Alert.alert('Failed to clear order.');
                }
              } else {
                const errorText = await response.text(); // Get the error response text
                console.log('Response error:', errorText);
                Alert.alert('Failed to clear order: ' + errorText);
              }
            } catch (error) {
              console.log('Error:', error.message);
              Alert.alert('Error clearing order: ' + error.message);
            }
          },
        },
      ]
    );
  };

  // UseEffect to fetch orders when the component mounts
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Order History" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          orders.map((order, index) => (
            <View key={index} style={styles.orderItem}>
              {/* Left side - Image, Product Name, Color, Quantity */}
              <View style={styles.orderLeft}>
                <View style={styles.imageWrapper}>
                  <Image source={{ uri: order.product_image }} style={styles.productImage} />
                  <View style={styles.quantityBadge}>
                    <Text style={styles.quantityText}>x {order.quantity}</Text>
                  </View>
                </View>
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{order.product_name}</Text>
                  {order.color && <Text style={styles.productColor}>Color: {order.color}</Text>}
                </View>
              </View>

              {/* Right side - Price and Date */}
              <View style={styles.orderRight}>
                <Text style={styles.productPrice}>LKR {order.total}</Text>
                <Text style={styles.orderDate}>{order.created_at}</Text>
              </View>

              {/* Buttons - Add Review and Clear */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.addReviewButton}
                  onPress={() => navigation.navigate('LeaveReviewPage', {
                    productName: order.product_name,
                    productImage: order.product_image,
                  })}
                >
                  <Text style={styles.buttonText}>Add Review</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.clearButton}
                  onPress={() => handleClearOrder(index)}
                >
                  <Text style={styles.buttonText}>Clear</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
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
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  orderItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },
  orderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageWrapper: {
    position: 'relative',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  productInfo: {
    flexDirection: 'column',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productColor: {
    fontSize: 14,
    color: '#888',
  },
  quantityBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#FF6347',
    borderRadius: 12,
    padding: 5,
  },
  quantityText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  orderRight: {
    alignItems: 'flex-end',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  orderDate: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  addReviewButton: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 5,
  },
  clearButton: {
    backgroundColor: '#FF0000',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginLeft: 5,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default OrderHistoryPage;
