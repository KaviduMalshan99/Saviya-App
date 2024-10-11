import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Import the navigation hook

const { width } = Dimensions.get('window');

const SideMenu = ({ visible, toggleMenu }) => {
  const slideAnim = useRef(new Animated.Value(-width * 0.75)).current; // Initial value for slide (off-screen)
  const navigation = useNavigation(); // Use the navigation hook for navigation control

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : -width * 0.75, // Slide in or out based on visibility
      duration: 300,
      useNativeDriver: false, // We're animating position, so we can't use native driver
    }).start();
  }, [visible]);

  return (
    <Animated.View style={[styles.menuContainer, { transform: [{ translateX: slideAnim }] }]}>
      <TouchableOpacity style={styles.closeIcon} onPress={toggleMenu}>
        <Ionicons name="close" size={30} color="#000" />
      </TouchableOpacity>

      <View style={styles.userInfo}>
        <Image
          source={require('../../assets/icons/01.png')}  // Replace with actual image path
          style={styles.userImage}
        />
        <View>
          <Text style={styles.userName}>Olivia Bennett</Text>
          <Text style={styles.userEmail}>oliviabennett@mail.com</Text>
        </View>
      </View>

      <View style={styles.menuItems}>
      <TouchableOpacity onPress={() => { 
          toggleMenu(); 
          navigation.navigate('BuyerHome'); 
        }}>
          <Text style={styles.menuItem}>{" >  Home"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { 
          toggleMenu(); 
          navigation.navigate('CategoryPage'); 
        }}>
          <Text style={styles.menuItem}>{" >  නිෂ්පාදන කාණ්ඩ"}</Text>
        </TouchableOpacity>

        {/* New Arrivals */}
        <TouchableOpacity onPress={() => { 
          toggleMenu(); 
          navigation.navigate('NewArrivalsPage'); 
        }}>
          <Text style={styles.menuItem}>{" >  නව පැමිණීම්"}</Text>
        </TouchableOpacity>

        {/* Best Sellers */}
        <TouchableOpacity onPress={() => { 
          toggleMenu(); 
          navigation.navigate('BestSellersPage'); 
        }}>
          <Text style={styles.menuItem}>{" >  හොඳම විකුණුම්කරුවන්"}</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.menuItem}>{" >  විශේෂාංග නිෂ්පාදන (Coming Soon)"}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { 
          toggleMenu(); 
          navigation.navigate('OrderHistoryPage'); 
        }}>
          <Text style={styles.menuItem}>{" >  ඇණවුම්"}</Text>
        </TouchableOpacity>
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
    fontSize: 18,
    fontFamily: 'Spartan-Bold',
  },
  userEmail: {
    fontSize: 14,
    fontFamily: 'Lato-Regular',
    color: '#666',
  },
  menuItems: {
    marginTop: 20,
  },
  menuItem: {
    fontSize: 16,
    fontFamily: 'Gurulugomi',
    marginVertical: 10,
    color: '#333',
  },
});

export default SideMenu;
