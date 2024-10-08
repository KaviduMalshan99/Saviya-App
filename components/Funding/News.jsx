import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ScrollView, Dimensions } from 'react-native'; 
import Fundheader from './Fundheader'; // Import Fundheader
import Fside from './Fside'; // Import Fside

const News = ({ navigation }) => {
  // const [activeTab, setActiveTab] = useState('News'); // Active Tab State for News
  const [isMenuVisible, setMenuVisible] = useState(false); // Side menu visibility state

  const images = [
    require('../../assets/images/hands.jpeg'),
    require('../../assets/images/Helpwomen.jpeg'),
  ];

  const { width } = Dimensions.get('window'); // Get the width of the screen for full-width image slides

  // Sample data for the cards
  const cardData = [
    {
      id: '1',
      name: 'Janith Hewage',
      contact: '+9471 6767 467',
      location: 'මාතර, ශ්‍රී ලංකාව',
      note: 'මට මටි භාජන සාදුකම් දැනටමත් මට කිහිපයක් market place එකට දමා ඇත...',
      images: [require('../../assets/images/p1.jpg'), require('../../assets/images/p2.jpg')],
    },
    {
      id: '2',
      name: 'Anula Perera',
      contact: '+9475 2190 167',
      location: 'Ampara, Sri Lanka',
      note: 'I’m making and selling spoons using wood and coconut parts...',
      images: [require('../../assets/images/p3.jpg'), require('../../assets/images/p4.jpg')],
    },
    // More cards can be added here...
  ];

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible); // Toggle the side menu visibility
  };

  const renderCard = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.userName}>
        <Text style={styles.label}>Name:</Text> {item.name}
      </Text>
      <Text style={styles.userDetails}>
        <Text style={styles.label}>Contact:</Text> {item.contact}
      </Text>
      <Text style={styles.userDetails}>
        <Text style={styles.label}>Location:</Text> {item.location}
      </Text>
      <Text style={styles.userNote}>
        <Text style={styles.label}>Note:</Text> {item.note}
      </Text>
      <View style={styles.imageContainer}>
        {item.images.map((image, index) => (
          <Image key={index} source={image} style={styles.productImage} />
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.MarketplaceButton}>
          <Text style={styles.MarketplaceButtonText}>Marketplace</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header with toggleMenu function */}
      <Fundheader toggleMenu={toggleMenu} />

      {/* Side Menu */}
      {isMenuVisible && (
        <View style={styles.menuOverlay}>
          <Fside visible={isMenuVisible} toggleMenu={toggleMenu} />
          <TouchableOpacity style={styles.overlay} onPress={() => setMenuVisible(false)} />
        </View>
      )}

      <ScrollView style={styles.content}>
        {/* Topic Title */}
        <Text style={styles.topicTitle}>Help Hands Community</Text>

        {/* Image Slider */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.imageSlider}
        >
          {images.map((image, index) => (
            <Image key={index} source={image} style={[styles.sliderImage, { width: width - 30 }]} />
          ))}
        </ScrollView>

        {/* FlatList for grid view */}
        <FlatList
          data={cardData}
          renderItem={renderCard}
          keyExtractor={item => item.id}
          numColumns={2} // Number of columns in the grid
          columnWrapperStyle={styles.columnWrapper} // Styling for the rows
          contentContainerStyle={styles.gridContainer}
          scrollEnabled={false} // Disable scrolling in the FlatList because the entire page scrolls
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
  },
  content: {
    flex: 1,
  },
  menuOverlay: {
    position: 'absolute',  // Ensure it is positioned on top
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,  // High z-index to ensure it's on top of other elements
    flexDirection: 'row',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  topicTitle: {
    fontSize: 22, // Font size for the title
    fontWeight: '500',
    marginTop:20,
    color: '#000',
    textAlign: 'center',
    marginBottom: 25, // Margin below the title
  },
  imageSlider: {
    height: 350, // Height for the image slider
    marginBottom: 20, // Margin below the image slider
  },
  sliderImage: {
    height: '100%',
    borderRadius: 15,
    marginRight: 1, // Space between images
  },
  gridContainer: {
    paddingTop: 10,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#6E260E',
    width: '48%', // Adjust width for two cards per row
    position: 'relative', // Ensure relative positioning for the button container to work properly
    paddingBottom: 55, // Add bottom padding to make space for the button
  },
  userName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
  },
  userDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  userNote: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  productImage: {
    width: '48%',
    height: 100,
    borderRadius: 10,
  },
  buttonContainer: {
    position: 'absolute', // Absolute positioning
    bottom: 15, // Distance from the bottom of the card
    left: 0,
    right: 0,
    justifyContent: 'center', // Horizontally center
    alignItems: 'center',
  },
  MarketplaceButton: {
    backgroundColor: '#355E3B',
    padding: 10,
    borderRadius: 20,
    width: '70%',
    alignItems: 'center',
  },
  MarketplaceButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default News;
