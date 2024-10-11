import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios'; // You can use fetch() or axios for API calls

const EventLocationScreen = () => {
  const navigation = useNavigation();
  const [locations, setLocations] = useState([]);

  // Fetch locations from the backend
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get("http://172.20.10.2/event-api/get_locations.php");
        setLocations(response.data); // Update state with fetched locations
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  // const selectLocation = (location) => {
  //   console.log("Selected location:", location.title);
  //   navigation.goBack();
  // };

  const selectLocation = (location) => {
    console.log("Selected location:", location.title);
    // Pass the selected location back to the EHomeScreen
    navigation.navigate("EHomeScreen", { selectedLocation: location.title });
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Event Location</Text>
      <Text style={styles.searchPlaceholder}>Find nearby events in...</Text>

      <View style={styles.locationList}>
        {locations.map((location) => (
          <Pressable
            key={location.id}
            style={styles.locationItem}
            onPress={() => selectLocation(location)}
          >
            <Ionicons name="location-outline" size={24} color="black" />
            <View style={styles.locationTextContainer}>
              <Text style={styles.locationTitle}>{location.title}</Text>
              <Text style={styles.locationDescription}>{location.description}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

export default EventLocationScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 16,
  },
  searchPlaceholder: {
    fontSize: 16,
    color: "#777",
    marginBottom: 20,
  },
  locationList: {
    width: "100%",
  },
  locationItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginVertical: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  locationTextContainer: {
    marginLeft: 10,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  locationDescription: {
    fontSize: 14,
    color: "#777",
  },
});
