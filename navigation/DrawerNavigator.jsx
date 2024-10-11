import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LearnerHome from '../components/LearnerDashboard/LearnerHome'; // Your LearnerHome screen
import Sidebar from '../components/Common/Sidebar'; // Custom Sidebar component
import Navbar from '../components/Common/Navbar';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <Sidebar {...props} />} // Custom Sidebar
    >
      <Drawer.Screen
        name="LearnerHome"
        component={LearnerHomeWrapper} // Wrap LearnerHome with Navbar
        options={{ headerShown: false }} // Disable default header to use custom Navbar
      />
    </Drawer.Navigator>
  );
};

// Wrapper for LearnerHome to include Navbar
const LearnerHomeWrapper = ({ navigation }) => {
  return (
    <>
      {/* Navbar with drawer icon, cart, and notifications */}
      <Navbar navigation={navigation} />

      {/* Main content below the Navbar */}
      <LearnerHome navigation={navigation} />
    </>
  );
};

export default DrawerNavigator;
