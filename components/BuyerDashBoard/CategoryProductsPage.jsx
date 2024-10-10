import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker'; // Import Picker from the new package
import Header from './Header'; // Ensure this points to your Header component
import SideMenu from './SideMenu'; // Ensure the correct path for SideMenu
import { useRoute, useNavigation } from '@react-navigation/native'; // To get the selected category and navigation

const { width: screenWidth } = Dimensions.get('window');

// Helper function to get image URI and parse if it's in array or object format
const getImageUri = (imageData) => {
  try {
    // Check if the image is a stringified array and parse it
    const parsedImageData = JSON.parse(imageData);
    // If it's an array, return the first item (base64 string)
    if (Array.isArray(parsedImageData)) {
      return parsedImageData[0]; // This assumes the first image is the main image
    }
    return parsedImageData; // If it's not an array, return as it is
  } catch (error) {
    // If it's not JSON, return the original base64 string
    return imageData;
  }
};

const CategoryProductsPage = () => {
  const [selectedSort, setSelectedSort] = useState('default');
  const [menuVisible, setMenuVisible] = useState(false); // State for side menu visibility
  const route = useRoute(); // Get the selected category from navigation
  const { categoryName } = route.params; // Retrieve the category name passed as parameter
  const navigation = useNavigation(); // Initialize navigation hook

  const [products, setProducts] = useState([]);

  // Function to fetch products from the database
  const fetchProducts = async (category) => {
    try {
      const response = await fetch(`http://192.168.1.6/product_app/get_products.php?category=${category}`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Load the products for the selected category
  useEffect(() => {
    if (categoryName) {
      fetchProducts(categoryName); // Fetch products based on category name
    }
  }, [categoryName]);

  // Function to toggle the side menu
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header toggleMenu={toggleMenu} />

      {menuVisible && <SideMenu visible={menuVisible} toggleMenu={toggleMenu} />}

      <View style={styles.filterSortContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={20} color="#000" />
          <Text style={styles.filterText}>Filters</Text>
        </TouchableOpacity>

        
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

      <ScrollView contentContainerStyle={styles.productGrid}>
        {products.map((product, index) => (
          <TouchableOpacity
            key={product.product_id || index} // Ensure key is unique
            style={styles.productItem}
            onPress={() => navigation.navigate('ProductPage', { productId: product.product_id })}
            >
            <Image
              source={{ uri: getImageUri(product.main_image) }} // Use helper function to parse and display image
              style={styles.productImage}
            />
            <Text style={styles.productName}>{product.product_name}</Text> 
            <Text style={styles.productPrice}>LKR {product.price}</Text>
          </TouchableOpacity>
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
