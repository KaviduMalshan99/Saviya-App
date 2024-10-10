import React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const locations = [
  { id: 1, title: "Use Current Location", description: "Based on device GPS location" },
  { id: 2, title: "Colombo", description: "Colombo, Sri Lanka" },
  { id: 3, title: "Matara", description: "Matara, Sri Lanka" },
  { id: 4, title: "Kegalle", description: "Kegalle, Sri Lanka" },
  { id: 5, title: "Kandy", description: "Kandy, Sri Lanka" },
  { id: 6, title: "Ambalangoda", description: "Ambalangoda, Sri Lanka" },
];

const EventLocationScreen = () => {
  const navigation = useNavigation();

  const selectLocation = (location) => {
    // Handle the location selection logic here
    console.log("Selected location:", location.title);
    // You can navigate back or pass the selected location data to the previous screen
    navigation.goBack();
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
