import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, Text, SafeAreaView, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import Header from './Header'; // Assume you have a Header component
import { useRoute, useNavigation } from '@react-navigation/native'; // Added useNavigation to navigate between screens
import SideMenu from './SideMenu'; // Ensure the correct path for SideMenu
import Icon from 'react-native-vector-icons/FontAwesome'; // or use FontAwesome5 if you prefer

const { width: screenWidth } = Dimensions.get('window');

const ProductPage = () => {
  const route = useRoute();
  const navigation = useNavigation(); // Added useNavigation to navigate
  const { productId } = route.params; // Retrieve the productId from the navigation params

  // State for product details and loading status
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false); 
  const [selectedQuantity, setSelectedQuantity] = useState(1); // Default quantity is 1
  const [selectedColor, setSelectedColor] = useState(''); // Default color selection
  const [currentMainImages, setCurrentMainImages] = useState([]); 
  const [currentImageIndex, setCurrentImageIndex] = useState(0); 
  const [menuVisible, setMenuVisible] = useState(false); // State for side menu visibility
  const [reviews, setReviews] = useState([]); // State to hold reviews

  // Fetch product details
  const fetchProductDetails = async (id) => {
    try {
      const response = await fetch(`http://192.168.1.6/product_app/get_product.php?product_id=${id}`);
      const data = await response.json();
      
      if (data && !data.error) {
        setProduct(data);  
        setCurrentMainImages(data.main_images); 
        setSelectedColor(''); 
        setIsLoading(false);  
      } else {
        setIsError(true); 
        setIsLoading(false);  
      }
    } catch (error) {
      setIsError(true); 
      setIsLoading(false);  
    }
  };

  // Fetch reviews based on product name
  const fetchReviews = async (productName) => {
    try {
      const response = await fetch(`http://192.168.1.6/product_app/get_reviews.php?product_name=${productName}`);
      const data = await response.json();

      if (data.status === 'success') {
        setReviews(data.reviews);
      } else {
        setReviews([]); 
      }
    } catch (error) {
      setReviews([]); 
    }
  };

  // Call fetchProductDetails and fetchReviews when productId changes
  useEffect(() => {
    if (productId) {
      fetchProductDetails(productId);
    }
  }, [productId]);

  useEffect(() => {
    if (product.product_name) {
      fetchReviews(product.product_name);
    }
  }, [product.product_name]);

  const handleColorChange = (color) => {
    setSelectedColor(color);
    if (product.color_images[color]) {
      setCurrentMainImages([product.color_images[color]]); 
    } else {
      setCurrentMainImages(product.main_images); 
    }
  };

  const handleQuantityChange = (action) => {
    if (action === 'increase') {
      if (selectedQuantity < parseInt(product.stock_quantity)) {
        setSelectedQuantity(selectedQuantity + 1);
      } else {
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

  const handleAddToCart = async () => {
    if ((product.category === 'මැටි බඳුන්' || product.category === 'මල් පැල') && !selectedColor) {
      Alert.alert("Please Select a Color", "You need to select a color before adding to cart.");
      return;
    }

    const cartItem = {
      product_name: product.product_name,
      color: selectedColor,
      quantity: selectedQuantity,
      price: product.price,
      image: currentMainImages[0],
      email: 'vgamaka@gmail.com', // Fixed email for now
    };

    try {
      const response = await fetch('http://192.168.1.6/product_app/add_to_cart.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(cartItem).toString(),
      });

      const result = await response.json();
      if (result.status === 'success') {
        Alert.alert('Success', 'Product added to cart!');
      } else {
        Alert.alert('Error', 'Failed to add product to cart.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while adding the product to the cart.');
    }
  };

  const handleBuyNow = () => {
    if ((product.category === 'මැටි බඳුන්' || product.category === 'මල් පැල') && !selectedColor) {
      Alert.alert(
        "Please Select a Color",
        "You need to select a color before proceeding.",
        [{ text: "OK", onPress: () => {} }]
      );
      return;
    }

    navigation.navigate('OrderPage', {
      productId,
      productName: product.product_name,
      productPrice: product.price,
      productImage: currentMainImages[0], 
      selectedColor,
      selectedQuantity,
    });
  };

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / screenWidth);
    setCurrentImageIndex(index);
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <Header />
        <Text style={styles.errorText}>Failed to load product details. Please try again later.</Text>
      </SafeAreaView>
    );
  }

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

        {/* Description Section */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.subcategory}>({product.subcategory || "No Subcategory"})</Text>
          <Text style={styles.description}>{product.description || "No Description"}</Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
            <Text style={styles.buttonText}>+ Add To Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buyNowButton} onPress={handleBuyNow}>
            <Text style={styles.buttonText}>Buy Now</Text>
          </TouchableOpacity>
        </View>

        {/* Review Section */}
        <View style={styles.reviewSection}>
          <Text style={styles.reviewTitle}>Reviews</Text>

          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <View key={index} style={styles.reviewItem}>
                <Text style={styles.reviewAuthor}>{review.customer_name} ({review.email})</Text>
                
                <View style={styles.starRatingContainer}>
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      name={i < review.stars ? 'star' : 'star-o'}
                      size={16}
                      color="#FFD700"
                      style={styles.starIcon}
                    />
                  ))}
                </View>
                
                <Text style={styles.reviewComment}>{review.comment}</Text>
                <Text style={styles.reviewDate}>{new Date(review.created_at).toLocaleDateString()}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noReviewsText}>No reviews for this product yet.</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

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
    color: '#333',
  },
  reviewItem: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  reviewAuthor: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  starRatingContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  starIcon: {
    marginRight: 2,
  },
  reviewRating: {
    fontSize: 14,
    color: '#FFD700',
  },
  reviewComment: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
    lineHeight: 20,
  },
  reviewDate: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  noReviewsText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
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

