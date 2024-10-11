import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, StyleSheet, Text, Image, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation to navigate between screens

const Header = ({ toggleMenu }) => {
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [suggestions, setSuggestions] = useState([]); // State for product suggestions
  const [loading, setLoading] = useState(false); // State for loading
  const navigation = useNavigation(); // Initialize navigation

  const handleSearch = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      // Fetch product suggestions based on the search query
      const response = await fetch(`http://192.168.1.6/product_app/search_products.php?query=${query}`);
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectProduct = (productId) => {
    setSearchQuery(''); // Clear search bar
    setSuggestions([]); // Clear suggestions
    navigation.navigate('ProductPage', { productId }); // Navigate to ProductPage
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={toggleMenu}>
        <Ionicons name="menu" size={30} color="#000" />
      </TouchableOpacity>

      <View style={styles.searchWrapper}>
        <TextInput
          placeholder="Search"
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            handleSearch(text); // Trigger search on text change
          }}
          style={styles.searchBar}
          placeholderTextColor="#888"
        />
        <Ionicons name="search" size={24} color="#000" style={styles.searchIcon} />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('CartPage')}>
        <Ionicons name="cart" size={30} color="#000" />
      </TouchableOpacity>

      {loading && <ActivityIndicator size="small" color="#0000ff" />}
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item.product_id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.suggestionItem} onPress={() => handleSelectProduct(item.product_id)}>

              <View style={styles.suggestionTextContainer}>
                <Text style={styles.suggestionText}>{item.product_name}</Text>
                <Text style={styles.suggestionPrice}>LKR {item.price}</Text>
              </View>
            </TouchableOpacity>
          )}
          style={styles.suggestionList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    height: 60,
    zIndex: 10, // Ensure the header stays on top
  },
  searchWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginHorizontal: 20,
    height: 40,
  },
  searchBar: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Lato-Regular',
  },
  searchIcon: {
    marginLeft: 10,
  },
  suggestionList: {
    backgroundColor: '#fff',
    position: 'absolute',
    top: 70,
    left: 0,
    right: 0,
    zIndex: 999, // Ensure it stays on top of other content
  },
  suggestionItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  suggestionImage: {
    width: 40,
    height: 40,
    borderRadius: 5,
    marginRight: 10,
  },
  suggestionTextContainer: {
    flexDirection: 'column',
  },
  suggestionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  suggestionPrice: {
    fontSize: 14,
    color: '#888',
  },
});

export default Header;
