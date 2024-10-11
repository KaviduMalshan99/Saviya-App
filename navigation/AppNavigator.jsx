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
import CategoryPage from '../components/BuyerDashBoard/CategoryPage';
import ClayPotCategoryPage from '../components/BuyerDashBoard/ClayPotCategoryPage'; // Import the new page
import CategoryProductsPage from '../components/BuyerDashBoard/CategoryProductsPage';
import NewArrivalsPage from '../components/BuyerDashBoard/NewArrivalsPage'; // Import NewArrivalsPage
import BestSellersPage from '../components/BuyerDashBoard/BestSellersPage'; // Import BestSellersPage
import SellerDashboardPage from '../components/LearnerDashboard/sellerDashboard/SellerDashboardPage'; // Import BestSellersPage
import AddProductPage from '../components/LearnerDashboard/sellerDashboard/AddProductPage'; // Import BestSellersPage
import ProductPage from '../components/BuyerDashBoard/ProductPage'; // Import BestSellersPage
import OrderPage from '../components/BuyerDashBoard/OrderPage'; // Import BestSellersPage
import CheckoutPage from '../components/BuyerDashBoard/CheckoutPage'; // Import BestSellersPage
import OrderSuccessPage from '../components/BuyerDashBoard/OrderSuccessPage'; // Import BestSellersPage
import OrderFailurePage from '../components/BuyerDashBoard/OrderFailurePage'; // Import BestSellersPage
import OrderHistoryPage from '../components/BuyerDashBoard/OrderHistoryPage'; // Import BestSellersPage
import LeaveReviewPage from '../components/BuyerDashBoard/LeaveReviewPage'; // Import BestSellersPage
import CartPage from '../components/BuyerDashBoard/CartPage'; // Import BestSellersPage
import SearchResultPage from '../components/BuyerDashBoard/SearchResultPage'; // Import BestSellersPage



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
      <Stack.Screen name="CategoryPage" component={CategoryPage} />
      <Stack.Screen name="CategoryProductsPage" component={CategoryProductsPage} />
      <Stack.Screen name="NewArrivalsPage" component={NewArrivalsPage} options={{ title: 'New Arrivals' }} />
      <Stack.Screen name="BestSellersPage" component={BestSellersPage} options={{ title: 'Best Sellers' }} />
      <Stack.Screen name="SellerDashboardPage" component={SellerDashboardPage} />
      <Stack.Screen name="AddProductPage" component={AddProductPage} />
      <Stack.Screen name="ProductPage" component={ProductPage} />
      <Stack.Screen name="OrderPage" component={OrderPage} />
      <Stack.Screen name="CheckoutPage" component={CheckoutPage} />
      <Stack.Screen name="OrderSuccessPage" component={OrderSuccessPage} />
      <Stack.Screen name="OrderFailurePage" component={OrderFailurePage} />
      <Stack.Screen name="OrderHistoryPage" component={OrderHistoryPage} />
      <Stack.Screen name="LeaveReviewPage" component={LeaveReviewPage} />
      <Stack.Screen name="CartPage" component={CartPage} />
      <Stack.Screen name="SearchResultPage" component={SearchResultPage} />



      <Stack.Screen 
        name="ClayPotCategoryPage" 
        component={ClayPotCategoryPage} 
        options={{ title: 'මැටි බඳුන්' }}  // Setting a title for the ClayPotCategoryPage screen
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
