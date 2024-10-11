import 'react-native-gesture-handler'; // Must be at the top for gesture handler to work properly
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { UserProvider } from './components/Auth/UserContext';
import {useFonts} from 'expo-font'
import AppLoading from 'expo-app-loading';

import AppNavigator from './navigation/AppNavigator';
    
  
export default function App() {

  const [fontsLoaded] = useFonts({
    'Lato-Black': require('./assets/fonts/Lato-Black.ttf'),
    'Lato-BlackItalic': require('./assets/fonts/Lato-BlackItalic.ttf'),
    'Lato-Bold': require('./assets/fonts/Lato-Bold.ttf'),
    'Lato-BoldItalic': require('./assets/fonts/Lato-BoldItalic.ttf'),
    'Lato-Italic': require('./assets/fonts/Lato-Italic.ttf'),
    'Lato-Light': require('./assets/fonts/Lato-Light.ttf'),
    'Lato-LightItalic': require('./assets/fonts/Lato-LightItalic.ttf'),
    'Lato-Regular': require('./assets/fonts/Lato-Regular.ttf'),
    'Lato-Thin': require('./assets/fonts/Lato-Thin.ttf'),
    'guruogomi1': require('./assets/fonts/UN-Gurulugomi(1).ttf'),
    'Lato-ThinItalic': require('./assets/fonts/Lato-ThinItalic.ttf'),
    'spartan': require('./assets/fonts/spartan.ttf'),
    'Spartan-SemiBold': require('./assets/fonts/Spartan-SemiBold.ttf'),
    'Spartan-Bold': require('./assets/fonts/Spartan-Bold.ttf'),
    'Spartan-Black': require('./assets/fonts/Spartan-Black.ttf'),
    'Spartan-Light': require('./assets/fonts/Spartan-Light.ttf'),
    'gurulugomi': require('./assets/fonts/UN-Gurulugomi.ttf'),
  });

  // If fonts aren't loaded, show a loading screen
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  
  return (

    <UserProvider>
      <NavigationContainer>
        <AppNavigator/>
      </NavigationContainer>
    </UserProvider>
  );
}
