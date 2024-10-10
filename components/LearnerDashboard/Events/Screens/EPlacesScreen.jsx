import {
  FlatList,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useContext, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Place } from "../Context/PlaceContext";  // Import Place context
import { AntDesign } from "@expo/vector-icons";
import FontAwesome from '@expo/vector-icons/FontAwesome';

const PlacesScreen = () => {
  const navigation = useNavigation();

  // Set custom header options
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <Pressable
          onPress={() => navigation.goBack()} // Go back on press
          style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
          <Text style={{ fontSize: 14, letterSpacing: 0.5 }}>
            CHANGE LOCATION
          </Text>
        </Pressable>
      ),
    });
  }, [navigation]);

  const { selectedCity, setSelectedCity } = useContext(Place);  // Access context values

  const places = [
    {
      id: "0",
      place: "Bangalore",
      image:
        "https://images.pexels.com/photos/739987/pexels-photo-739987.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: "1",
      place: "Ahmedabad",
      image:
        "https://images.pexels.com/photos/6813041/pexels-photo-6813041.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: "2",
      place: "Chennai",
      image:
        "https://images.pexels.com/photos/10070972/pexels-photo-10070972.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: "3",
      place: "Delhi - NCR",
      image:
        "https://images.pexels.com/photos/789750/pexels-photo-789750.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: "4",
      place: "Hyderabad",
      image:
        "https://images.pexels.com/photos/11321242/pexels-photo-11321242.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: "5",
      place: "Kolkata",
      image:
        "https://images.pexels.com/photos/2846217/pexels-photo-2846217.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: "6",
      place: "Jaipur",
      image:
        "https://images.pexels.com/photos/3581364/pexels-photo-3581364.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: "7",
      place: "Lucknow",
      image:
        "https://images.pexels.com/photos/15351642/pexels-photo-15351642.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
  ];

  const selectCity = (city) => {
    setSelectedCity(city);  // Update selected city in context
    setTimeout(() => {
      navigation.navigate("EHomeScreen");  // Navigate after city is selected
    }, 800);
  };

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <View style={styles.searchContainer}>
        <TextInput placeholder="Search Your City" style={styles.searchInput} />
        <AntDesign name="search1" size={24} color="black" />
      </View>

      {/* Selected Location */}
      <View style={styles.selectedLocationContainer}>
        <Text style={styles.selectedLocationText}>Selected Location</Text>
        <Text style={styles.selectedCity}>{selectedCity}</Text>
      </View>

      {/* City List */}
      <FlatList
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        data={places}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable onPress={() => selectCity(item.place)} style={styles.placeContainer}>
            <ImageBackground
              imageStyle={{ borderRadius: 6 }}
              style={styles.imageBackground}
              source={{ uri: item.image }}
            >
              {selectedCity === item.place && (
                <View style={styles.checkIconContainer}>
                  <FontAwesome name="check-circle" size={24} color="white" />
                </View>
              )}
              <View style={styles.placeNameContainer}>
                <Text style={styles.placeName}>{item.place}</Text>
              </View>
            </ImageBackground>
          </Pressable>
        )}
      />
    </View>
  );
};

export default PlacesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchContainer: {
    margin: 15,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#E0E0E0",
    borderWidth: 1.5,
    borderRadius: 25,
  },
  searchInput: {
    flex: 1,
  },
  selectedLocationContainer: {
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  selectedLocationText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  selectedCity: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  placeContainer: {
    margin: 15,
  },
  imageBackground: {
    width: 150,
    height: 100,
  },
  checkIconContainer: {
    flex: 1,
    marginLeft: 7,
    marginTop: 7,
    alignItems: "flex-start",
  },
  placeNameContainer: {
    flex: 1,
    marginLeft: 10,
    marginBottom: 7,
    justifyContent: "flex-end",
  },
  placeName: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
  },
});
