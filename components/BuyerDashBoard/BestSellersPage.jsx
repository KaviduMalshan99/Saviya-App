import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, Text, SafeAreaView, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import Header from './Header'; // Ensure this points to your Header component
import SideMenu from './SideMenu'; // Ensure SideMenu is imported
import { useNavigation } from '@react-navigation/native'; // Import useNavigation for navigation

const { width: screenWidth } = Dimensions.get('window');

const BestSellersPage = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [bestSellers, setBestSellers] = useState([]);  // State to hold best sellers
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);  // Error state
  const navigation = useNavigation(); // Use navigation to go to ProductPage

  // Function to fetch best-selling products from the backend
  const fetchBestSellers = async () => {
    try {
      const response = await fetch('http://192.168.1.6/product_app/get_best_sellers.php');  // Update the path based on your server
      const data = await response.json();
      if (data.message) {
        setError(data.message);
      } else {
        setBestSellers(data);  // Set the fetched products in state
      }
    } catch (error) {
      setError('Failed to fetch best-selling products');
    } finally {
      setLoading(false);
    }
  };

  // UseEffect to fetch products when the component mounts
  useEffect(() => {
    fetchBestSellers();
  }, []);

  // Toggle function for the side menu
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header toggleMenu={toggleMenu} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Image at the top */}
        <View style={styles.imageContainer}>
          <Image source={require('../../assets/images/buyer_image/banner_home.png')} style={styles.fullWidthImage} />
          <View style={styles.overlay}>
            <Text style={styles.imageTitle}>Best Sellers</Text>
          </View>
        </View>

        {/* Product Grid */}
        <View style={styles.productGrid}>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : (
            bestSellers.map((product, index) => (
              <TouchableOpacity 
                key={product.product_id} 
                style={styles.productItem}
                onPress={() => navigation.navigate('ProductPage', { productId: product.product_id })} // Navigate to ProductPage
              >
                {/* Display totalSold as a Badge */}
                {product.total_sold && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>Sold: {product.total_sold}</Text>
                  </View>
                )}

                {/* Display the product image */}
                {product.product_image ? (
                  <Image
                    source={{
                      uri: product.product_image.startsWith('data:image')
                        ? product.product_image
                        : `data:image/jpeg;base64,${product.product_image}`,
                    }}
                    style={styles.productImage}
                  />
                ) : (
                  <View style={styles.productImagePlaceholder} />
                )}

                <Text style={styles.productName}>{product.product_name}</Text>
                <Text style={styles.productPrice}>LKR {product.price}</Text>
              </TouchableOpacity>
            ))
          )}

          {/* Always display the full-width image after the products */}
          <View style={styles.fullWidthImageContainer}>
            <Image
              source={require('../../assets/images/buyer_image/banner_home.png')}
              style={styles.fullWidthImage}
            />
          </View>
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
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productItem: {
    width: screenWidth * 0.45,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    elevation: 3, // Android shadow effect
    position: 'relative',
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
  // Styles for badge
  badge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'black',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    zIndex: 1,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
  },
  // Image Container
  imageContainer: {
    marginBottom: 20,
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
    color: 'black',
  },
  fullWidthImageContainer: {
    marginBottom: 20,
  },
});

export default BestSellersPage;
