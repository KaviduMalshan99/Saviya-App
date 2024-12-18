import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen1 from '../components/Onboarding/OnboardingScreen1';
import OnboardingScreen2 from '../components/Onboarding/OnboardingScreen2';
import OnboardingScreen3 from '../components/Onboarding/OnboardingScreen3';
import LoginScreen from '../components/Auth/LoginScreen';
import RegisterScreen from '../components/Auth/RegisterScreen';
import WhoAreYouScreen from '../components/Auth/WhoAreYouScreen';
import LearnerHome from '../components/LearnerDashboard/LearnerHome';
import EHomeScreen from '../components/LearnerDashboard/Events/Screens/EHomeScreen';
import EPlacesScreen from '../components/LearnerDashboard/Events/Screens/EPlacesScreen';
import { PlaceContext } from '../components/LearnerDashboard/Events/Context/PlaceContext';  // Import PlaceContext
import ECategoryScreen from '../components/LearnerDashboard/Events/Screens/EventCategoryScreen';
import EventDetailsScreen from '../components/LearnerDashboard/Events/Screens/EventDetailsScreen';
import CategoryDetailsScreen from '../components/LearnerDashboard/Events/Screens/CategoryDetailsScreen';
import SeatSelectionScreen from '../components/LearnerDashboard/Events/Screens/SelectSeat';
import BookedEventScreen from '../components/LearnerDashboard/Events/Screens/BookedEventScreen';
import EventCalendar from '../components/LearnerDashboard/Events/Screens/EventCalender';
import EventLocationScreen from '../components/LearnerDashboard/Events/Screens/EventLocationScreen';
import DrawerNavigator from '../navigation/DrawerNavigator';

import Events from '../components/LearnerDashboard/Events';
import Community from '../components/LearnerDashboard/Community';
import MarkerPlace from '../components/LearnerDashboard/MarketHome';
import Courses from '../components/LearnerDashboard/Courses';
import BuyerHome from '../components/BuyerDashBoard/BuyerHome';
import LoginBuyer1 from '../components/Auth/LoginBuyer1';
import CategoryPage from '../components/BuyerDashBoard/CategoryPage';
import ClayPotCategoryPage from '../components/BuyerDashBoard/ClayPotCategoryPage'; // Import the new page

import Profile from '../components/OtherPages/Profile';
import HelpSupport from '../components/OtherPages/HelpSupport';
import Wallet from '../components/OtherPages/Wallet';
import PrivacyPolicy from '../components/OtherPages/PrivacyPolicy';
import Settings  from '../components/OtherPages/Settings';

import CourseDetails from '../components/LearnerDashboard/CourseDetails';
import PaymentPage from '../components/OtherPages/Pyment';
import ContentDetails from '../components/LearnerDashboard/ContentDetails';
import CongratulationsPage from '../components/OtherPages/Conrajuulations';
import RatingPage from '../components/OtherPages/Rating';
import paymentSuccess from '../components/OtherPages/PaymentSuccess'

import FreeCoursesPage from '../components/LearnerDashboard/FreeCourses';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">

      {/* Splash Screen */}
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }} // Hide the header on the splash screen
      />

      {/* Onboarding Screens */}
      <Stack.Screen name="Onboarding1" component={OnboardingScreen1} />
      <Stack.Screen name="Onboarding2" component={OnboardingScreen2} />
      <Stack.Screen name="Onboarding3" component={OnboardingScreen3} />

      {/* Authentication Screens */}
      <Stack.Screen name="WhoAreYou" component={WhoAreYouScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="LoginBuyer1" component={LoginBuyer1} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="LearnerHome" component={LearnerHome} />

        {/* Use children prop instead of inline component */}
      <Stack.Screen name="EPlacesScreen">
        {props => (
          <PlaceContext>
            <EPlacesScreen {...props} />
          </PlaceContext>
        )}
      </Stack.Screen>

      <Stack.Screen name="EHomeScreen">
        {props => (
          <PlaceContext>
            <EHomeScreen {...props} />
          </PlaceContext>
        )}
      </Stack.Screen>
      <Stack.Screen name="ECategoryScreen" component={ECategoryScreen} />
      <Stack.Screen name="EventDetailsScreen" component={EventDetailsScreen} />
      <Stack.Screen name="CategoryDetailsScreen" component={CategoryDetailsScreen} />
      <Stack.Screen name="SeatSelectionScreen" component={SeatSelectionScreen} />
      <Stack.Screen name="BookedEventScreen" component={BookedEventScreen} />
      <Stack.Screen name="EventCalendar" component={EventCalendar} />
      <Stack.Screen name="EventLocationScreen" component={EventLocationScreen} />


      </Stack.Navigator>
      
      {/* Learner Dashboard Screens */}
      <Stack.Screen name="Drawer" component={DrawerNavigator} />
      <Stack.Screen name="Events" component={Events} />
      <Stack.Screen name="Community" component={Community} />
      <Stack.Screen name="MarketHome" component={MarkerPlace} />
      <Stack.Screen name='Courses' component={Courses} />

      {/* SideBar Screens */}
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Wallet" component={Wallet} />
      <Stack.Screen name="HelpSupport" component={HelpSupport} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="Settings" component={Settings} />

      <Stack.Screen name="CourseDetails" component={CourseDetails} />
      <Stack.Screen name="PaymentPage" component={PaymentPage} />
      <Stack.Screen name="ContentDetails" component={ContentDetails} />
      <Stack.Screen name="CongratulationsPage" component={CongratulationsPage} />
      <Stack.Screen name="Rating" component={RatingPage} />
      <Stack.Screen name="PaymentSuccessPage" component={paymentSuccess} />
      <Stack.Screen name="FreeCoursesPage" component={FreeCoursesPage} />

    

      
      
      
  );
};

export default AppNavigator;
