import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, Image, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import Swiper from 'react-native-swiper';
import Header from '../BuyerDashBoard/Header';
import SideMenu from '../BuyerDashBoard/SideMenu'; // Ensure the path is correct
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width: screenWidth } = Dimensions.get('window');

const BuyerHome = () => {
  const [menuVisible, setMenuVisible] = useState(false); // State for menu visibility

  const toggleMenu = () => {
    setMenuVisible(!menuVisible); // Toggle menu visibility
  };

  const carouselData = [
    {
      image: require('../../assets/images/buyer_image/01.jpg'),
      text: 'ගෙවත්තේ අස්වැන්න සදහා 30% ක වට්ටමක් ලබා දෙන්න!',
      buttonText: 'Shop Now',
    },
    {
      image: require('../../assets/images/buyer_image/02.jpg'),
      text: 'අපගේ නව වසරේ ගෙවත්තේ වට්ටම්!',
      buttonText: 'Explore Now',
    },
    {
      image: require('../../assets/images/buyer_image/02.jpg'),
      text: 'විශේෂ ගෙවත්තේ අස්වැන්න!',
      buttonText: 'Shop Now',
    },
  ];

  const categoryItems = [
    { id: '1', name: 'මල් පැල', image: require('../../assets/images/buyer_image/01.jpg') },
    { id: '2', name: 'මැටි බඳුන්', image: require('../../assets/images/buyer_image/pot.png') },
    { id: '3', name: 'හදුන් කූරු', image: require('../../assets/images/buyer_image/insense.png') },
    { id: '4', name: 'හතු', image: require('../../assets/images/buyer_image/mushroom.png') },
  ];
  

  const bestSellers = [
    { id: '1', name: 'අඹ ජෑම්', price: 'LKR 450.99' },
    { id: '2', name: 'ඔකිඩ්', price: 'LKR 1490.00' },
  ];

  const newArrivals = [
    { id: '1', name: 'ලැවන්ඩර්', price: 'LKR 650.00' },
    { id: '2', name: 'ලියුම් කවර', price: 'LKR 5.00' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header toggleMenu={toggleMenu} />

      {/* Side Menu */}
      {menuVisible && <SideMenu visible={menuVisible} toggleMenu={toggleMenu} />}

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Image Slider */}
        <Swiper
          height={500}
          dot={<View style={styles.dot} />}
          activeDot={<View style={styles.activeDot} />}
          paginationStyle={{ bottom: 10, left: 10 }}
          loop
        >
          {carouselData.map((item, index) => (
            <View key={index} style={styles.carouselItem}>
              <Image source={item.image} style={styles.carouselImage} />
              <View style={styles.carouselContent}>
                <Text style={styles.carouselText}>{item.text}</Text>
                <TouchableOpacity style={styles.carouselButton}>
                  <Text style={styles.carouselButtonText}>{item.buttonText}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </Swiper>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
  {categoryItems.map((item) => (
    <View key={item.id} style={styles.categoryItem}>
      <Image source={item.image} style={styles.categoryImage} />
      <Text style={styles.categoryText}>{item.name}</Text>
    </View>
  ))}
</ScrollView>


        {/* Best Sellers */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Best Sellers</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>view all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {bestSellers.map((item) => (
              <View key={item.id} style={styles.productItem}>
                <View style={styles.productImagePlaceholder} />
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>{item.price}</Text>
                <TouchableOpacity style={styles.addButton}>
                  <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.promoSection}>
  <Image source={require('../../assets/images/buyer_image/banner_home.png')} style={styles.promoImage} />
  <View style={styles.promoContent}>
    <Text style={styles.promoText}>ජූලියේ පලමු සතියේ ගණුදෙණු වල 20% අමතර වට්ටමක්!</Text>
    <TouchableOpacity style={styles.promoButton}>
  <Ionicons name="cart-outline" size={20} color="#FFF" style={styles.iconStyle} />
  <Text style={styles.promoButtonText}>Shop Now</Text>
</TouchableOpacity>

  </View>
</View>


        {/* New Arrivals */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>New Arrivals</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>view all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {newArrivals.map((item) => (
              <View key={item.id} style={styles.productItem}>
                <View style={styles.productImagePlaceholder} />
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>{item.price}</Text>
                <TouchableOpacity style={styles.addButton}>
                  <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
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
  },
  carouselItem: {
    width: screenWidth,
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  carouselContent: {
    position: 'absolute',
    top: 30,
    left: 20,
    alignItems: 'flex-start',
  },
  carouselText: {
    fontFamily: 'Gurulugomi',
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 10,
    paddingRight: 50,
  },
  carouselButton: {
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
  },
  carouselButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  promoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Makes the image cover the entire area without being distorted
  },
  dot: {
    backgroundColor: 'rgba(0,0,0,.2)',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  activeDot: {
    backgroundColor: '#000',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  categoryScroll: {
    paddingVertical: 15,
  },
  categoryItem: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    resizeMode: 'cover',
  },
  categoryImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#DDD',
  },
  categoryText: {
    marginTop: 5,
    fontSize: 12,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewAllText: {
    color: '#888',
    fontSize: 14,
  },
  productItem: {
    width: 150,
    marginRight: 15,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
  },
  productImagePlaceholder: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#DDD',
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  addButton: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: '#000',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  promoSection: {
    width: '100%',
    height: 250, // Adjust height as needed
    position: 'relative', // To allow absolute positioning of text and button
  },
  promoContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Optional: Adds a dark overlay for better text visibility
  },
  promoText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
    promoButton: {
      flexDirection: 'row', // To place the icon and text in a row
      backgroundColor: '#000', // Black background
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 30, // Increase the border radius for rounded corners
      alignItems: 'center', // Center the icon and text vertically
    },
    promoButtonText: {
      color: '#FFF', // White text color
      fontSize: 14,
      fontWeight: 'bold',
      marginLeft: 10, // Add some space between the icon and the text
    },
    iconStyle: {
      marginRight: 10, // Space between the icon and text
    },
});

export default BuyerHome;
