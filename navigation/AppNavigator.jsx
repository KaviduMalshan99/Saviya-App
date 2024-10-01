import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen1 from '../components/Onboarding/OnboardingScreen1';
import OnboardingScreen2 from '../components/Onboarding/OnboardingScreen2';
import OnboardingScreen3 from '../components/Onboarding/OnboardingScreen3';
import LoginScreen from '../components/Auth/LoginScreen';
import RegisterScreen from '../components/Auth/RegisterScreen';
import WhoAreYouScreen from '../components/Auth/WhoAreYouScreen';
import LearnerHome from '../components/LearnerDashboard/LearnerHome';
import Courses from '../components/LearnerDashboard/Courses';
import BuyerHome from '../components/BuyerDashBoard/BuyerHome';
import LoginBuyer1 from '../components/Auth/LoginBuyer1';


const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Onboarding1">
      <Stack.Screen name="Onboarding1" component={OnboardingScreen1} />
      <Stack.Screen name="Onboarding2" component={OnboardingScreen2} />
      <Stack.Screen name="Onboarding3" component={OnboardingScreen3} />
      <Stack.Screen name="WhoAreYou" component={WhoAreYouScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="LoginBuyer1" component={LoginBuyer1} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="LearnerHome" component={LearnerHome} />
      <Stack.Screen name="BuyerHome" component={BuyerHome} />

      
    </Stack.Navigator>
  );
};

export default AppNavigator;