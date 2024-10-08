import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, Image, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook
import Header from './Header';
import SideMenu from '../BuyerDashBoard/SideMenu'; // Ensure the path is correct

const { width: screenWidth } = Dimensions.get('window');

const categories = [
  { id: 1, name: 'මැටි බඳුන්', image: require('../../assets/images/buyer_image/category_pot.png'), page: 'ClayPotCategoryPage' }, // Add the page property for navigation
  { id: 2, name: 'මල් පැල', image: require('../../assets/images/buyer_image/category_flower.png') },
  { id: 3, name: 'හතු', image: require('../../assets/images/buyer_image/mushroom.png') },
  { id: 4, name: 'චට්නි', image: require('../../assets/images/buyer_image/category_chuttny.png') },
  { id: 5, name: 'හදුන් කූරු', image: require('../../assets/images/buyer_image/category_insense.png') },
  { id: 6, name: 'කඩදාසි නිෂ්පාදන', image: require('../../assets/images/buyer_image/category_paper.png') },
];

const CategoryPage = () => {
  const navigation = useNavigation(); // Use the navigation hook for navigation control
  const [menuVisible, setMenuVisible] = useState(false);

  // Toggle function to show/hide the side menu
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header toggleMenu={toggleMenu} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Categories Section */}
        <View style={styles.categoriesGrid}>
          {categories.map((category) => (
            <TouchableOpacity 
              key={category.id} 
              style={styles.categoryItem}
              onPress={() => {
                console.log('Navigating to:', category.page); // Debugging step
                navigation.navigate(category.page); // Navigate to the linked page
              }} // Navigate to the linked page
            >
              <Image source={category.image} style={styles.categoryImage} />
              <Text style={styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
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
    flexGrow: 1,
    paddingTop: 30,
    paddingHorizontal: 10,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: screenWidth * 0.45, // Adjust to fit 2 columns
    marginBottom: 20, // Add margin between rows
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3, // For Android shadow effect
    alignItems: 'center',
  },
  categoryImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  categoryText: {
    textAlign: 'center',
    paddingVertical: 10,
    fontFamily: 'Gurulugomi', // Assuming you have this font installed
    fontSize: 16,
    color: '#333',
  },
});

export default CategoryPage;
