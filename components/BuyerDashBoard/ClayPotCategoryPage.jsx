import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker'; // Import Picker from the new package
import Header from './Header'; // Ensure this points to your Header component

const { width: screenWidth } = Dimensions.get('window');

// Dummy data for products (Product image and price are placeholders for now)
const products = [
  { id: 1, name: 'Clay Pot 1', price: '', image: '' }, 
  { id: 2, name: 'Clay Pot 2', price: '', image: '' }, 
  { id: 3, name: 'Clay Pot 3', price: '', image: '' },
  { id: 4, name: 'Clay Pot 4', price: '', image: '' },
];

const ClayPotCategoryPage = () => {
  const [selectedSort, setSelectedSort] = useState('default');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header toggleMenu={toggleMenu} />

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
            {/* Placeholder for Product Image */}
            <View style={styles.productImagePlaceholder} />
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>{product.price || 'Price Not Available'}</Text>
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

export default ClayPotCategoryPage;
