import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, Text, SafeAreaView, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import Header from './Header'; // Assume you have a Header component
import { useRoute, useNavigation } from '@react-navigation/native'; // Added useNavigation to navigate between screens
import SideMenu from './SideMenu'; // Ensure the correct path for SideMenu

const { width: screenWidth } = Dimensions.get('window');

const ProductPage = () => {
  const route = useRoute();
  const navigation = useNavigation(); // Added useNavigation to navigate
  const { productId } = route.params; // Retrieve the productId from the navigation params

  // State for product details and loading status
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true); 
  const [isError, setIsError] = useState(false); // Add the isError state here
  const [selectedQuantity, setSelectedQuantity] = useState(1); // Default quantity is 1
  const [selectedColor, setSelectedColor] = useState(''); // Default color selection
  const [currentMainImages, setCurrentMainImages] = useState([]); // Track the current images for the slider
  const [currentImageIndex, setCurrentImageIndex] = useState(0); 
  const [menuVisible, setMenuVisible] = useState(false); // State for side menu visibility

  const fetchProductDetails = async (id) => {
    try {
      const response = await fetch(`http://192.168.1.6/product_app/get_product.php?product_id=${id}`);
      const data = await response.json();
      
      if (data && !data.error) {
        setProduct(data);  
        setCurrentMainImages(data.main_images); // Set the initial main images for the slider
        setSelectedColor(''); // No color selected by default
        setIsLoading(false);  
      } else {
        setIsError(true); // Set error state to true when no data or an error is received
        setIsLoading(false);  
      }
    } catch (error) {
      setIsError(true); // Set error state to true when an error occurs
      setIsLoading(false);  
    }
  };

  useEffect(() => {
    if (productId) {
      fetchProductDetails(productId);
    }
  }, [productId]);

  const handleColorChange = (color) => {
    setSelectedColor(color);
    if (product.color_images[color]) {
      setCurrentMainImages([product.color_images[color]]); // Change to the color image
    } else {
      setCurrentMainImages(product.main_images); // Reset to main images if no color image exists
    }
  };

  const handleQuantityChange = (action) => {
    if (action === 'increase') {
      if (selectedQuantity < parseInt(product.stock_quantity)) {
        setSelectedQuantity(selectedQuantity + 1);
      } else {
        // Show alert if the quantity exceeds available stock
        Alert.alert(
          "Stock Limit Reached",
          `Only ${product.stock_quantity} items available in stock.`,
          [{ text: "OK", onPress: () => {} }]
        );
      }
    } else if (action === 'decrease' && selectedQuantity > 1) {
      setSelectedQuantity(selectedQuantity - 1);
    }
  };

  const handleBuyNow = () => {
    // Ensure that the color is selected for specific categories
    if ((product.category === 'මැටි බඳුන්' || product.category === 'මල් පැල') && !selectedColor) {
      Alert.alert(
        "Please Select a Color",
        "You need to select a color before proceeding.",
        [{ text: "OK", onPress: () => {} }]
      );
      return;
    }

    // Navigate to the OrderPage with the product details
    navigation.navigate('OrderPage', {
      productId,
      productName: product.product_name,
      productPrice: product.price,
      productImage: currentMainImages[0], // Use the first image (or selected color image)
      selectedColor,
      selectedQuantity,
    });
  };

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / screenWidth);
    setCurrentImageIndex(index);
  };

  // Function to toggle the side menu
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  // Render error state if fetching data failed
  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <Header />
        <Text style={styles.errorText}>Failed to load product details. Please try again later.</Text>
      </SafeAreaView>
    );
  }

  // Render loading state
  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Header />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header toggleMenu={toggleMenu} />
      {menuVisible && <SideMenu visible={menuVisible} toggleMenu={toggleMenu} />}

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Main Image Slider */}
        <View style={styles.imageContainer}>
          {currentMainImages.length > 0 ? (
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={handleScroll}
              scrollEventThrottle={16}
            >
              {currentMainImages.map((imageUri, index) => (
                <Image
                  key={index}
                  source={{ uri: imageUri }}
                  style={styles.mainImage}
                />
              ))}
            </ScrollView>
          ) : (
            <Image
              source={{ uri: product.main_image }}
              style={styles.mainImage}
            />
          )}
        </View>

        {/* Image Pagination Indicator */}
        {currentMainImages.length > 1 && (
          <View style={styles.pagination}>
            {currentMainImages.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  currentImageIndex === index ? styles.activeDot : styles.inactiveDot,
                ]}
              />
            ))}
          </View>
        )}

        {/* Product Name */}
        <Text style={styles.productName}>{product.product_name || "Product Name"}</Text>

        {/* Price and Quantity */}
        <View style={styles.priceQuantityContainer}>
          <Text style={styles.price}>LKR {product.price || "N/A"}</Text>

          {/* Quantity Selector */}
          <View style={styles.quantitySelector}>
            <TouchableOpacity style={styles.quantityButton} onPress={() => handleQuantityChange('decrease')}>
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{selectedQuantity}</Text>
            <TouchableOpacity style={styles.quantityButton} onPress={() => handleQuantityChange('increase')}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Color Options */}
        {(product.category === 'මැටි බඳුන්' || product.category === 'මල් පැල') && (
          <View style={styles.colorOptions}>
            <Text style={styles.colorLabel}>Color: </Text> 
            <View style={styles.colorSelector}>
              {Object.keys(product.color_images || {}).map((color) => (
                <TouchableOpacity
                  key={color}
                  style={[styles.colorOption, selectedColor === color && styles.selectedColor]}
                  onPress={() => handleColorChange(color)} // Handle color change
                >
                  <Text style={styles.colorText}>{color}</Text> 
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Description Section */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.subcategory}>({product.subcategory || "No Subcategory"})</Text>
          <Text style={styles.description}>{product.description || "No Description"}</Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.addToCartButton}>
            <Text style={styles.buttonText}>+ Add To Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buyNowButton} onPress={handleBuyNow}>
            <Text style={styles.buttonText}>Buy Now</Text>
          </TouchableOpacity>
        </View>

        {/* Review Section */}
        <View style={styles.reviewSection}>
          <Text style={styles.reviewTitle}>Reviews</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Updated modern styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  imageContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  mainImage: {
    width: screenWidth * 0.9,
    height: screenWidth * 0.9,
    borderRadius: 15,
    resizeMode: 'cover',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#000',
  },
  inactiveDot: {
    backgroundColor: '#CCC',
  },
  productName: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    color: '#333',
    marginBottom: 15,
  },
  priceQuantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E90FF',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  colorOptions: {
    marginVertical: 20,
  },
  colorLabel: {
    fontSize: 18,
    color: '#333',
    fontWeight: '600',
  },
  colorSelector: {
    flexDirection: 'row',
    marginTop: 10,
  },
  colorOption: {
    padding: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    marginRight: 10,
  },
  selectedColor: {
    borderColor: '#1E90FF',
    borderWidth: 2,
  },
  colorText: {
    fontSize: 16,
    fontWeight: '500',
  },
  descriptionContainer: {
    marginVertical: 20,
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  subcategory: {
    fontSize: 16,
    color: '#555',
    marginVertical: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  addToCartButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    width: '48%',
  },
  buyNowButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    width: '48%',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  reviewSection: {
    marginTop: 30,
  },
  reviewTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    fontSize: 18,
    marginTop: 20,
  },
});

export default ProductPage;
