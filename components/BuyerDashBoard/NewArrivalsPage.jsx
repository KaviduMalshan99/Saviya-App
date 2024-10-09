import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import Header from './Header'; // Ensure this points to your Header component
import SideMenu from './SideMenu'; // Ensure SideMenu is imported

const { width: screenWidth } = Dimensions.get('window');

// Dummy data for New Arrivals products (Product image and price placeholders)
const newArrivals = [
  { id: 1, name: 'Product 1', price: 'LKR 1000.00', image: '' }, 
  { id: 2, name: 'Product 2', price: 'LKR 2000.00', image: '' }, 
  { id: 3, name: 'Product 3', price: 'LKR 1500.00', image: '' },
  { id: 4, name: 'Product 4', price: 'LKR 1800.00', image: '' },
];

const NewArrivalsPage = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  // Toggle function for the side menu
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header toggleMenu={toggleMenu} />

      {/* Full Width Image with Title on Top (inside the image) */}
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/images/buyer_image/banner_home.png')} style={styles.fullWidthImage} />
        <View style={styles.overlay}>
          <Text style={styles.imageTitle}>New Arrivals</Text>
        </View>
      </View>

      {/* Product Grid */}
      <ScrollView contentContainerStyle={styles.productGrid}>
        {newArrivals.map((product) => (
          <View key={product.id} style={styles.productItem}>
            {/* Placeholder for Product Image */}
            <View style={styles.productImagePlaceholder} />
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>{product.price}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Side Menu */}
      {menuVisible && <SideMenu visible={menuVisible} toggleMenu={toggleMenu} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  imageContainer: {
    position: 'relative',
  },
  fullWidthImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Transparent white overlay
  },
  imageTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black', // Black color title inside the image
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  productItem: {
    width: screenWidth * 0.45,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    elevation: 3, // Android shadow effect
  },
  productImagePlaceholder: {
    width: '100%',
    height: 120,
    backgroundColor: '#ddd', // Placeholder for the product image
  },
  productName: {
    marginTop: 10,
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    color: '#333',
  },
  productPrice: {
    marginTop: 5,
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    color: '#888',
  },
});

export default NewArrivalsPage;
