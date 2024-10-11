import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, Text, SafeAreaView, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import Header from './Header'; // Ensure this points to your Header component
import SideMenu from './SideMenu'; // Ensure SideMenu is imported
import { useNavigation } from '@react-navigation/native'; // Import useNavigation for navigating to ProductPage

const { width: screenWidth } = Dimensions.get('window');

const NewArrivalsPage = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [newArrivals, setNewArrivals] = useState([]);  // State to hold new products
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);  // Error state
  const navigation = useNavigation(); // Navigation hook for ProductPage

  // Function to fetch new arrival products from the backend
  const fetchNewArrivals = async () => {
    try {
      const response = await fetch('http://192.168.1.6/product_app/get_new_arrivals.php');  // Update the path based on your server
      const data = await response.json();
      if (data.message) {
        setError(data.message);
      } else {
        setNewArrivals(data);  // Set the fetched products in state
      }
    } catch (error) {
      setError('Failed to fetch new products');
    } finally {
      setLoading(false);
    }
  };

  // UseEffect to fetch products when the component mounts
  useEffect(() => {
    fetchNewArrivals();
  }, []);

  // Toggle function for the side menu
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header toggleMenu={toggleMenu} />

      {/* ScrollView for all content, including the image container */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Full Width Image with Title on Top */}
        <View style={styles.imageContainer}>
          <Image source={require('../../assets/images/buyer_image/banner_home.png')} style={styles.fullWidthImage} />
          <View style={styles.overlay}>
            <Text style={styles.imageTitle}>New Arrivals</Text>
          </View>
        </View>

        {/* Product Grid */}
        <View style={styles.productGrid}>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : (
            newArrivals.map((product, index) => (
              <React.Fragment key={product.product_id}>
                <TouchableOpacity
                  style={styles.productItem}
                  onPress={() => navigation.navigate('ProductPage', { productId: product.product_id })}
                >
                  {/* Correctly render the first main image */}
                  {product.main_image ? (
                    <Image
                      source={{
                        uri: product.main_image.startsWith('data:image')
                          ? product.main_image // If base64 image, use it directly
                          : product.main_image.startsWith('file://')
                            ? product.main_image // If file URI, use it as is
                            : `data:image/jpeg;base64,${product.main_image}`,  // Otherwise, assume it's a base64 string
                      }}
                      style={styles.productImage}
                    />
                  ) : (
                    <View style={styles.productImagePlaceholder} />
                  )}
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productPrice}>LKR {product.price}</Text>
                </TouchableOpacity>

                {/* Insert a custom full-width image after the 4th product */}
                {index === 3 && (
                  <View style={styles.fullWidthImageContainer}>
                    <Image
                      source={require('../../assets/images/buyer_image/banner_home.png')}  // Replace with your custom image path
                      style={styles.fullWidthCustomImage}
                    />
                  </View>
                )}
              </React.Fragment>
            ))
          )}
        </View>
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
  scrollContent: {
    paddingBottom: 20, // Added padding to avoid content cutoff at the bottom
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 20, // Adding margin to separate it from the products
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
    color: 'black',
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  productItem: {
    width: screenWidth * 0.45,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  productImagePlaceholder: {
    width: '100%',
    height: 120,
    backgroundColor: '#ddd',
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
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  fullWidthImageContainer: {
    width: screenWidth, // Full width of the screen
    alignItems: 'center',
    marginVertical: 20,
  },
  fullWidthCustomImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover', // Ensure it covers the width and height properly
  },
});

export default NewArrivalsPage;
