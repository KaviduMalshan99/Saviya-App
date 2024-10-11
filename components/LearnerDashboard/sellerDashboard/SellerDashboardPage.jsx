import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width: screenWidth } = Dimensions.get('window');

const SellerDashboardPage = () => {
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);  // Default to an empty array
  const [products, setProducts] = useState([]);  // Default to an empty array
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://192.168.1.6/product_app/get_orders.php');
      const data = await response.json();
      if (Array.isArray(data)) {
        setOrders(data);  // Set orders if data is valid
      } else {
        console.error('Unexpected response format:', data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://192.168.1.6/product_app/get_productss.php');
      const data = await response.json();
      if (Array.isArray(data)) {
        setProducts(data);  // Set products if data is valid
      } else {
        console.error('Unexpected response format:', data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const navigateToAddProduct = () => {
    navigation.navigate('AddProductPage');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.pageTitle}>විකුණුම් පුවරුව</Text>

        <TouchableOpacity style={styles.addButton} onPress={navigateToAddProduct}>
          <Text style={styles.addButtonText}>+ නිෂ්පාදන එකතු කරන්න</Text>
        </TouchableOpacity>

        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statTitle}>විකුණුම්</Text>
            <Text style={styles.statValue}>165</Text> 
          </View>
          <View style={[styles.statBox, styles.statBoxBlack]}>
            <Text style={[styles.statTitle, styles.statTitleBlack]}>ආදායම</Text>
            <Text style={[styles.statValue, styles.statValueWhite]}>LKR 80,000.9</Text> 
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statTitle}>නිෂ්පාදන</Text>
            <Text style={styles.statValue}>25</Text> 
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statTitle}>පාරිභෝගිකයන්</Text>
            <Text style={styles.statValue}>7.425K</Text> 
          </View>
        </View>

        {/* Orders Section */}
        <Text style={styles.sectionTitle}>ගනුදෙනු</Text>
        {orders.length > 0 ? (
          orders.map((order) => (
            <View key={order.id} style={styles.orderRow}>
              <View style={styles.orderDetails}>
                {/* Render product image if available, else fallback */}
                {order.product_image ? (
                  <Image source={{ uri: order.product_image }} style={styles.orderImage} />
                ) : (
                  <View style={styles.orderImagePlaceholder} />
                )}
                <View style={styles.orderInfo}>
                  <Text style={styles.orderCustomer}>{order.customer_name}</Text>
                  <Text style={styles.orderDescription}>Transfer to</Text>
                </View>
              </View>
              <View style={styles.orderPriceContainer}>
                <Text style={styles.orderPrice}>{order.seller_total ? `LKR ${order.seller_total}` : 'N/A'}</Text>
                <Text style={styles.orderDate}>{order.created_at}</Text>
              </View>
            </View>
          ))
        ) : (
          <Text>No orders found</Text>
        )}

        {/* Products Section */}
        <Text style={styles.sectionTitle}>නිෂ්පාදන</Text>
        {products.length > 0 ? (
          products.map((product) => (
            <View key={product.id} style={styles.productRow}>
              <View style={styles.productDetails}>
                {/* Render product image if available, else fallback */}
                {product.main_images ? (
                  <Image source={{ uri: product.main_images }} style={styles.productImage} />
                ) : (
                  <View style={styles.productImagePlaceholder} />
                )}
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{product.product_name}</Text>
                  <Text style={styles.productPrice}>LKR {product.price}</Text>
                </View>
              </View>
            </View>
          ))
        ) : (
          <Text>No products found</Text>
        )}
      </ScrollView>

      {menuVisible && <SideMenu visible={menuVisible} toggleMenu={setMenuVisible} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Gurulugomi',
  },
  addButton: {
    backgroundColor: '#000',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statBox: {
    width: screenWidth * 0.45,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  statBoxBlack: {
    backgroundColor: '#000',
    color: '#fff',
  },
  statTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Gurulugomi',
    color: '#000', // Default color for light stat boxes
  },
  statTitleBlack: {
    color: '#fff', // White color for titles in black box
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  statValueWhite: {
    color: '#fff', // White value for the black stat box
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Gurulugomi',
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },
  orderDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  orderImagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#DDD',
    marginRight: 15,
  },
  orderInfo: {
    justifyContent: 'center',
  },
  orderCustomer: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderDescription: {
    fontSize: 14,
    color: '#888',
  },
  orderPriceContainer: {
    alignItems: 'flex-end',
  },
  orderPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderDate: {
    fontSize: 12,
    color: '#888',
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },
  productDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  productImagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#DDD',
    marginRight: 15,
  },
  productInfo: {
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
  },
});

export default SellerDashboardPage;
