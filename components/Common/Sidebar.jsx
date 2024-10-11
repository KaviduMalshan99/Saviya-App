import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importing icons
import { useUser } from '../Auth/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage'; // For clearing storage

const Sidebar = (props) => {
  const { navigation } = props;
  const { user, setUser } = useUser(); // Get user and setUser from context

  const menuItems = [
    { name: 'Profile', icon: 'person', screen: 'Profile' },
    { name: 'My Courses', icon: 'school', screen: 'Courses' },
    { name: 'Community', icon: 'people', screen: 'Community' },
    { name: 'Marketplace', icon: 'shopping-cart', screen: 'MarketHome' },
    { name: 'Events & Exhibitions', icon: 'event', screen: 'Events' },
    { name: 'Wallet', icon: 'account-balance-wallet', screen: 'Wallet' },
    { name: 'Help & Support', icon: 'support', screen: 'HelpSupport' },
    { name: 'Privacy Policy', icon: 'privacy-tip', screen: 'PrivacyPolicy' },
    { name: 'Settings', icon: 'settings', screen: 'Settings' },
  ];

  const handleLogout = async () => {
    // Clear user token from AsyncStorage or any other storage
    await AsyncStorage.removeItem('userToken');
    
    // Clear user state from context
    setUser(null);

    // Navigate to login page
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        {/* User profile at the top */}
        <View style={styles.profileSection}>
          <Image
            source={require('../../assets/images/img.png')}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>{user?.firstname} {user?.lastname}</Text>
        </View>

        {/* List of links (menu items) */}
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => navigation.navigate(item.screen)}
          >
            <View style={styles.menuItemContent}>
              <Icon name={item.icon} size={24} color="#007BFF" style={styles.menuIcon} />
              <Text style={styles.linkText}>{item.name}</Text>
            </View>
            <Icon name="chevron-right" size={24} color="#007BFF" />
          </TouchableOpacity>
        ))}
      </DrawerContentScrollView>

      {/* Log out button at the bottom */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout} // Call the logout function
      >
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  profileSection: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  profileImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginRight: 16,
  },
  linkText: {
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    padding: 16,
    backgroundColor: '#ff5252',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Sidebar;
