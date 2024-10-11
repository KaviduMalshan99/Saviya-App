import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
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

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Onboarding1">
      <Stack.Screen name="Onboarding1" component={OnboardingScreen1} />
      <Stack.Screen name="Onboarding2" component={OnboardingScreen2} />
      <Stack.Screen name="Onboarding3" component={OnboardingScreen3} />
      <Stack.Screen name="WhoAreYou" component={WhoAreYouScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
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
      
  );
};

export default AppNavigator;
