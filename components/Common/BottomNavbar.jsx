import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Get screen width for dynamic styling
const screenWidth = Dimensions.get('window').width;

const BottomNavbar = ({ navigation }) => {
  return (
    <View style={styles.navContainer}>
      {/* Background bar with rounded edges */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Courses')}>
          <Ionicons name="book" size={24} color="white" />
          <Text style={styles.navText}>Courses</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButtoncommunity} onPress={() => navigation.navigate('Community')}>
          <Ionicons style={styles.peoplebtn} name="people" size={24} color="white" />
          <Text style={styles.navTextcommuity}>Community</Text>
        </TouchableOpacity>

        {/* Middle Button */}
        <View style={styles.middleButtonContainer}>
          <TouchableOpacity style={styles.middleButton} onPress={() => navigation.navigate('Drawer')}>
            <Ionicons name="home" size={30} color="black" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('MarketHome')}>
          <Ionicons name="pricetag" size={24} color="white" />
          <Text style={styles.navText}>Market</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Events')}>
          <Ionicons name="calendar" size={24} color="white" />
          <Text style={styles.navText}>Events</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    position: 'absolute',
    bottom: 0,
    width: screenWidth,
    alignItems: 'center',
  },
  navBar: {
    width: '100%',  // Adjust this as per your design
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1E819F',
    borderTopEndRadius:30,
    borderTopStartRadius:30,
    paddingVertical: 15,
    paddingHorizontal: 20,
    elevation: 10, // To create a shadow effect
  },
  navButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  peoplebtn:{
    marginLeft:15
  },
  navText: {
    marginTop: 5,
    fontSize: 12,
    color: 'white',
    
  },
  navTextcommuity:{
    marginTop: 5,
    fontSize: 12,
    color: 'white',
    marginRight:50
  },
  middleButtonContainer: {
    position: 'absolute',
    top: -35, // Moves the middle button above the nav bar
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '47%', // Centering the middle button horizontally
  },
  middleButton: {
    backgroundColor: 'white', // Background color for the button
    width: 70,
    height: 70,
    borderRadius: 35, // Circular shape
    borderWidth: 5, // Border width
    borderColor: '#1E819F', // Border color to match the navbar
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  
});

export default BottomNavbar;
