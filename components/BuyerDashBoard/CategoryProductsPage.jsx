import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker'; // Import Picker from the new package
import Header from './Header'; // Ensure this points to your Header component
import SideMenu from './SideMenu'; // Ensure the correct path for SideMenu
import { useRoute } from '@react-navigation/native'; // To get the selected category

const { width: screenWidth } = Dimensions.get('window');

// Products for different categories
const productData = {
  "මැටි බඳුන්": [
    { id: 1, name: 'Clay Pot 1', price: 'LKR 450.00', image: require('../../assets/images/buyer_image/category_flower.png') },
    { id: 2, name: 'Clay Pot 2', price: 'LKR 500.00', image: require('../../assets/images/buyer_image/category_flower.png') },
    { id: 3, name: 'Clay Pot 3', price: 'LKR 550.00', image: require('../../assets/images/buyer_image/category_flower.png') },
  ],
  "මල් පැල": [
    { id: 1, name: 'Flower Plant 1', price: 'LKR 300.00', image: require('../../assets/images/buyer_image/category_flower.png') },
    { id: 2, name: 'Flower Plant 2', price: 'LKR 400.00', image: require('../../assets/images/buyer_image/category_flower.png') },
  ],
  "හතු": [
    { id: 1, name: 'Mushroom 1', price: 'LKR 200.00', image: require('../../assets/images/buyer_image/category_flower.png') },
    { id: 2, name: 'Mushroom 2', price: 'LKR 250.00', image: require('../../assets/images/buyer_image/category_flower.png') },
  ],
  "චට්නි": [
    { id: 1, name: 'Chutney 1', price: 'LKR 150.00', image: require('../../assets/images/buyer_image/category_flower.png') },
    { id: 2, name: 'Chutney 2', price: 'LKR 180.00', image: require('../../assets/images/buyer_image/category_flower.png') },
  ],
  "හදුන් කූරු": [
    { id: 1, name: 'Incense 1', price: 'LKR 100.00', image: require('../../assets/images/buyer_image/category_flower.png') },
    { id: 2, name: 'Incense 2', price: 'LKR 120.00', image: require('../../assets/images/buyer_image/category_flower.png') },
  ],
  "කඩදාසි නිෂ්පාදන": [
    { id: 1, name: 'Paper Product 1', price: 'LKR 50.00', image: require('../../assets/images/buyer_image/category_flower.png') },
    { id: 2, name: 'Paper Product 2', price: 'LKR 60.00', image: require('../../assets/images/buyer_image/category_flower.png') },
  ],
};

const CategoryProductsPage = () => {
  const [selectedSort, setSelectedSort] = useState('default');
  const [menuVisible, setMenuVisible] = useState(false); // State for side menu visibility
  const route = useRoute(); // Get the selected category from navigation
  const { categoryName } = route.params; // Retrieve the category name passed as parameter

  const [products, setProducts] = useState([]);

  // Load the products for the selected category
  useEffect(() => {
    setProducts(productData[categoryName] || []); // Fetch products based on category name
  }, [categoryName]);

  // Function to toggle the side menu
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header toggleMenu={toggleMenu} />

      {/* Side Menu */}
      {menuVisible && <SideMenu visible={menuVisible} toggleMenu={toggleMenu} />}

      {/* Filter and Sorting Section */}
      <View style={styles.filterSortContainer}>
        {/* Filter Button */}
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={20} color="#000" />
          <Text style={styles.filterText}>Filters</Text>
        </TouchableOpacity>

        {/* Sorting Dropdown */}
        <View style={styles.sortingDropdown}>
          <Text style={styles.sortingText}>Sorting by</Text>
          <Picker
            selectedValue={selectedSort}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedSort(itemValue)}
          >
            <Picker.Item label="Default" value="default" />
            <Picker.Item label="Price: Low to High" value="lowToHigh" />
            <Picker.Item label="Price: High to Low" value="highToLow" />
          </Picker>
        </View>
      </View>

      {/* Product Grid */}
      <ScrollView contentContainerStyle={styles.productGrid}>
        {products.map((product) => (
          <View key={product.id} style={styles.productItem}>
            <Image source={product.image} style={styles.productImage} />
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>{product.price}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  filterSortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
  },
  filterText: {
    marginLeft: 5,
    fontSize: 16,
    fontFamily: 'Lato-Regular',
  },
  sortingDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortingText: {
    marginRight: 10,
    fontSize: 16,
    fontFamily: 'Lato-Regular',
  },
  picker: {
    width: 150,
    height: 40,
    backgroundColor: '#fff',
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
    elevation: 3, // Android shadow effect
  },
  productImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
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

export default CategoryProductsPage;
