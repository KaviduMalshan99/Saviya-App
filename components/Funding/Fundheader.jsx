import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Fundheader = ({ toggleMenu }) => {
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

    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#b8f6f1',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    height: 60,
    zIndex: 10, // Ensure the header stays on top
  },
  searchBar: {
    flex: 1,
    marginHorizontal: 15,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 25,
    fontSize: 16,
  },
});

export default Fundheader;