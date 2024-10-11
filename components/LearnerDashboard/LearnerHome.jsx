import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Import for search icon
import BottomNavbar from '../Common/BottomNavbar'; // Import BottomNavbar
import { useUser } from '../Auth/UserContext';

const LearnerHome = ({ navigation }) => {
  const { user } = useUser(); // Access user data from context

  useEffect(() => {
    if (user) {
      console.log('Current user in context:', user); // Log user data when available
    } else {
      console.log('No user is logged in');
    }
  }, [user]);

  return (
    <ImageBackground
      source={require('../../assets/images/onBoardScreens/BG3.png')}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        {/* Main Content */}
        <View style={styles.mainContentWrapper}>
          <View style={styles.mainContent}>
            <View style={styles.contentContainer}>
              {/* Profile Greeting */}
              <View style={styles.topWrapper}>
                <View style={styles.greetingWrapper}></View>
                {user && (
                  <Text style={styles.greetingText}>Hello, {user.firstname}</Text>
                )}
              </View>

              {/* Sinhala Text */}
              <Text style={styles.sinhalaText}>ඔබට අවශ්‍ය පාඨමාලාව සොයන්න</Text>

              {/* Search Bar */}
              <View style={styles.searchContainer}>
                <MaterialCommunityIcons name="magnify" size={24} color="white" style={styles.searchIcon} />
                <TextInput
                  placeholder="Search for courses..."
                  placeholderTextColor="white"
                  style={styles.searchInput}
                />
              </View>
            </View>

            {/* Horizontally Scrollable Cards */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardsContainer}>
              <View style={styles.card}>
                <Image
                  source={require('../../assets/images/carousel.png')} // Sample image 1
                  style={styles.cardImage}
                />
                
              </View>
              <View style={styles.card}>
                <Image
                  source={require('../../assets/images/carousel.png')} // Sample image 2
                  style={styles.cardImage}
                />
              </View>
              <View style={styles.card}>
                <Image
                  source={require('../../assets/images/carousel.png')} // Sample image 3
                  style={styles.cardImage}
                />
              </View>
              <View style={styles.card}>
                <Image
                  source={require('../../assets/images/carousel.png')} // Sample image 3
                  style={styles.cardImage}
                />
              </View>
            </ScrollView>
          </View>
        </View>

        {/* Bottom Navbar */}
        <BottomNavbar navigation={navigation} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  mainContentWrapper: {
    flex: 1,
    justifyContent: 'center', // Center the content vertically
    alignItems: 'center', // Center the content horizontally
  },
  mainContent: {
    width: '95%', // Reduce the width to allow padding on the sides
  },
  contentContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Transparent white background for the whole section
    borderRadius: 20, // Rounded corners for the container
    padding: 10, // Padding inside the container
    marginHorizontal: 5, // Margin on the sides for spacing
    marginTop: 5, // Space from the top
    alignItems: 'center', // Center the content horizontally
  },
  topWrapper: {
    flexDirection: 'row', // Align items in a row (horizontally)
    alignItems: 'left', // Center items vertically within the row
  },
  greetingWrapper: {
    width: 25, // Set the width of the circle
    height: 25, // Set the height of the circle
    borderRadius: 25, // Make it a perfect circle
    backgroundColor: '#FE9BB3', // Red color background
    justifyContent: 'center', // Center the content horizontally inside the circle
    alignItems: 'center', // Center the content vertically inside the circle
    marginRight: 15, // Add spacing between the circle and the text
  },
  greetingText: {
    fontSize: 23, // Adjust text size
    color: '#000', // White color for the text
    fontFamily: 'Lato-Bold',
  },
  sinhalaText: {
    color: 'white', // White text for Sinhala text
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 15, // Space below the Sinhala text
    fontFamily: 'guruogomi1',
    marginTop: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // More transparent background for the search bar
    borderRadius: 15, // Rounded corners for the search bar
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: '100%',
    marginBottom: 5,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1, // Take up the remaining space
    color: 'white', // White text color for the input
    fontSize: 18,
    fontFamily: 'Lato-Regular',
  },
  cardsContainer: {
    marginTop: 2,
  },
  card: {
    width: 350, // Width of each card
    height: 300, // Height of each card
    borderRadius: 10,
    marginRight: 10, // Spacing between cards
    alignItems: 'center', // Center content inside the card
    padding: 10,
    justifyContent: 'center',
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});

export default LearnerHome;
