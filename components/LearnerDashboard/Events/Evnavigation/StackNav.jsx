import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EHomeScreen from "../Screens/EHomeScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import EPlacesScreen from "../Screens/EPlacesScreen";
import { Entypo, FontAwesome5, AntDesign, Feather } from "@expo/vector-icons";

// Import PlaceContext
import { PlaceContext } from "../Context/PlaceContext";

const ProfileStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="EHomeScreen" component={EHomeScreen} options={{ title: "" }} />
      <HomeStack.Screen name="EPlacesScreen" component={EPlacesScreen} />
    </HomeStack.Navigator>
  );
}

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function Navigation() {
  return (
    <PlaceContext> {/* Wrap NavigationContainer with PlaceContext */}
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeStackScreen}
            options={{
              tabBarLabel: "Home",
              tabBarLabelStyle: { color: "black" },
              headerShown: false,
              tabBarIcon: ({ focused }) =>
                focused ? (
                  <Entypo name="home" size={24} color="black" />
                ) : (
                  <AntDesign name="home" size={24} color="black" />
                ),
            }}
          />
{/* 
          <Tab.Screen
            name="Profile"
            component={ProfileStackScreen}
            options={{
              tabBarLabel: "Profile",
              tabBarLabelStyle: { color: "black" },
              headerShown: false,
              tabBarIcon: ({ focused }) =>
                focused ? (
                  <FontAwesome5 name="user-alt" size={24} color="black" />
                ) : (
                  <Feather name="user" size={24} color="black" />
                ),
            }}
          /> */}
        </Tab.Navigator>
      </NavigationContainer>
    </PlaceContext>
  );
}

export default Navigation;
