import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Import the navigation hook

const { width } = Dimensions.get('window');

const Fside = ({ visible, toggleMenu }) => {
  const slideAnim = useRef(new Animated.Value(-width * 0.75)).current; // Initial value for slide (off-screen)
  const navigation = useNavigation(); // Use the navigation hook for navigation control

  // Handle the sliding animation when visible changes
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : -width * 0.75, // Slide in or out based on visibility
      duration: 300,
      useNativeDriver: true, // Optimize performance by using native driver
    }).start();
  }, [visible]);

  return (
    <Animated.View style={[styles.menuContainer, { transform: [{ translateX: slideAnim }] }]}>
      <TouchableOpacity style={styles.closeIcon} onPress={toggleMenu}>
        <Ionicons name="close" size={30} color="#000" />
      </TouchableOpacity>

      <Text style={styles.userName}>MENU</Text>

      <View style={styles.menuItems}>
        {/* Menu Items */}
        <TouchableOpacity onPress={() => { 
          toggleMenu(); 
          navigation.navigate('FunderProfile'); 
        }}>
          <Text style={styles.menuItem}>Make Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { 
          toggleMenu(); 
          navigation.navigate('Posting'); 
        }}>
          <Text style={styles.menuItem}>Make Post</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { 
          toggleMenu(); 
          navigation.navigate('News'); 
        }}>
          <Text style={styles.menuItem}>News Feed</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { 
          toggleMenu(); 
          navigation.navigate('Banking'); 
        }}>
          <Text style={styles.menuItem}>Banking Help</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { 
          toggleMenu(); 
          navigation.navigate('Fund'); 
        }}>
          <Text style={styles.menuItem}>Our Fundraiser</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Self-Employed Persons not allow to create a Profile as fundraiser-Community verison 1.2</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width * 0.75, // The width will take up 75% of the screen width
    height: '100%',
    backgroundColor: '#fff',
    zIndex: 20, // Ensure it appears on top of other content
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRightWidth: 1,
    borderRightColor: '#ddd',
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginHorizontal: 20,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  menuItems: {
    marginTop: 40,
  },
  menuItem: {
    fontSize: 18,
    fontWeight: '500',
    marginVertical: 15,
    marginHorizontal: 20,
    color: '#000',
  },
  footer: {
    position: 'absolute',
    bottom: 45,
    left: 25,
  },
  footerText: {
    fontSize: 14,
    color: '#888',
  },
});

export default Fside;
