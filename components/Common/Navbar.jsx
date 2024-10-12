import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Navbar = ({ navigation }) => {
  return (
    <View style={styles.topBar}>
      {/* Sidebar Menu Icon */}
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <MaterialCommunityIcons name="view-grid-outline" size={25} color="black" marginLeft={10} />
      </TouchableOpacity>

      {/* Additional Icons (Cart, Notifications) */}
      <View style={styles.iconGroup}>
        <TouchableOpacity>
          <MaterialCommunityIcons name="cart-outline" size={25} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialCommunityIcons name="bell-outline" size={25} color="black" marginRight={10} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    position: 'absolute', // Overlay the navbar on top of the screen
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Transparent background with some opacity
    zIndex: 1000, // Ensure it appears above other content
  },
  iconGroup: {
    flexDirection: 'row',
    gap: 10,
    marginLeft:20
  },
});

export default Navbar;
