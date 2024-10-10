import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ScrollView, Dimensions, Alert, Animated } from 'react-native';
import Fundheader from './Fundheader'; // Import Fundheader
import Fside from './Fside'; // Import Fside

const News = ({ navigation }) => {
  const [isMenuVisible, setMenuVisible] = useState(false); // Side menu visibility state
  const [cardData, setCardData] = useState([]); // State to hold the fetched data
  const { width } = Dimensions.get('window'); // Get the width of the screen for full-width image slides
  const [loading, setLoading] = useState(true); // State to manage loading
  const [currentSlide, setCurrentSlide] = useState(0); // State to track the current image slide

  const images = [
    require('../../assets/images/Helpwomen.jpeg'),
    require('../../assets/images/hands.jpeg'),
    
  ];

  // Fetch data from the PHP API
  const fetchData = async () => {
    try {
      const response = await fetch('http://192.168.8.113/myapp/retrieve_data.php'); // Adjust with your IP
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCardData(data); // Set the fetched data into the state
      setLoading(false); // Turn off loading after fetching data
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch data from server');
      setLoading(false);
    }
  };

  // Use polling mechanism to fetch new data every 10 seconds
  useEffect(() => {
    fetchData(); // Fetch data when the component is first mounted

    const interval = setInterval(() => {
      fetchData(); // Poll the server every 10 seconds
    }, 10000); // 10000 milliseconds = 10 seconds

    return () => clearInterval(interval); // Clean up the interval when the component unmounts
  }, []);

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible); // Toggle the side menu visibility
  };

  const handleScroll = (event) => {
    // Calculate the current slide based on scroll position
    const slideIndex = Math.floor(event.nativeEvent.contentOffset.x / width);
    setCurrentSlide(slideIndex);
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
        <Text style={styles.label}>Note:</Text> {item.description}
      </Text>
      {item.image && (
        <Image source={{ uri: `http://192.168.8.113/myapp/${item.image}` }} style={styles.cardImage} />
      )}

      {/* Button at the bottom */}
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
          onScroll={handleScroll} // Detect slide change
          scrollEventThrottle={16} // Control how often scroll events are fired
          style={styles.imageSlider}
        >
          {images.map((image, index) => (
            <Image key={index} source={image} style={[styles.sliderImage, { width: width - 30 }]} />
          ))}
        </ScrollView>

        {/* Dots Container */}
        <View style={styles.dotsContainer}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentSlide ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>

        {/* Loading indicator */}
        {loading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : (
          <FlatList
            data={cardData}
            renderItem={renderCard}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContainer}
            scrollEnabled={true}
          />
        )}
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    flexDirection: 'row',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  topicTitle: {
    fontSize: 24,
    fontWeight: '500',
    marginTop: 25,
    color: '#000',
    textAlign: 'center',
    marginBottom: 25,
  },
  imageSlider: {
    height: 350,
    marginBottom: 20,
  },
  sliderImage: {
    height: '100%',
    borderRadius: 15,
    marginRight: 1,
  },
  listContainer: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#6E260E',
    position: 'relative',
    minHeight: 250, // Adjust to fit the button and content
    paddingBottom: 55, // Ensure space at the bottom for the button
  },
  cardImage: {
    width: '100%',
    height: 220,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#000',
  },
  inactiveDot: {
    backgroundColor: '#989898',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  MarketplaceButton: {
    backgroundColor: '#000',
    padding: 12,
    borderRadius: 20,
    width: '75%',
    alignItems: 'center',
  },
  MarketplaceButtonText: {
    color: '#fff',
    fontSize: 20,
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
});

export default News;
