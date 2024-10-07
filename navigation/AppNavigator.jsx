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
// import Community from '../components/Funding/Community';
import TermsConditions1 from '../components/Funding/TermsConditions1';
import TermsConditions2 from '../components/Funding/TermsConditions2';
import FundAgrements from '../components/Funding/FundAgrements'
import Posting from '../components/Funding/Posting';
import Banking from '../components/Funding/Banking';
import News from '../components/Funding/News';
import Fund from '../components/Funding/Fund';

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
      {/* <Stack.Screen name="Community" component={Community} /> */}
      <Stack.Screen name="TermsConditions1" component={TermsConditions1} />
      <Stack.Screen name="TermsConditions2" component={TermsConditions2} />
      <Stack.Screen name="FundAgrements" component={FundAgrements} />
      <Stack.Screen name="Posting" component={Posting} />
      <Stack.Screen name="Banking" component={Banking} />
      <Stack.Screen name="News" component={News} />
      <Stack.Screen name="Fund" component={Fund} />

    </Stack.Navigator>
  );
};

export default AppNavigator;
