// Header.js
import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Header = ({ toggleMenu }) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={toggleMenu}>
        <Ionicons name="menu" size={30} color="#000" />
      </TouchableOpacity>
      <TextInput 
        placeholder="Search" 
        style={styles.searchBar}
        placeholderTextColor="#888" 
      />
      <TouchableOpacity>
        <Ionicons name="cart" size={30} color="#000" />
      </TouchableOpacity>
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
  searchBar: {
    flex: 1,
    marginHorizontal: 20,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 15,
    fontSize: 16,
    fontFamily: 'Lato-Regular',
  },
});

export default Header;
