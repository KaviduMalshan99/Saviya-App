import React from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const EventDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  // Retrieve event details from the route
  const { event } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image style={styles.eventImage} source={{ uri: event.image_url }} />

      <View style={styles.eventDetailsContainer}>
        <Text style={styles.eventTitle}>{event.title}</Text>
        <View style={styles.eventMeta}>
          <Ionicons name="location-outline" size={16} color="gray" />
          <Text style={styles.eventLocation}>{event.location}</Text>
        </View>
        <View style={styles.eventMeta}>
          <View style={styles.eventDateContainer}>
            <Ionicons name="calendar-outline" size={16} color="gray" />
            <Text style={styles.eventDateText}>
              {new Date(event.date).toLocaleDateString()}
            </Text>
          </View>
        </View>
        <View style={styles.eventMeta}>
          <Ionicons name="time-outline" size={16} color="gray" />
          <Text>{event.time}</Text>
        </View>
        <View style={styles.eventMeta}>
          <Ionicons name="cash-outline" size={16} color="gray" />
          <Text>{event.price}</Text>
        </View>

        <Text style={styles.eventDescription}>
          We're celebrating our 10th edition of the {event.title}.
        </Text>

        {/* Book Event Button */}
        <Pressable
          style={styles.bookButton}
          onPress={() =>
            navigation.navigate("SeatSelectionScreen", {
              title: event.title,
              date: event.date,
              location: event.location,
              price: event.price,
              image_url: event.image_url, // Pass the image URL here
            })
          }
        >
          <Text style={styles.bookButtonText}>Book Your Event</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default EventDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  eventImage: {
    width: "100%",
    height: 200,
  },
  eventDetailsContainer: {
    padding: 16,
    backgroundColor: "#FFF",
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  eventMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  eventLocation: {
    marginLeft: 5,
    fontSize: 16,
    color: "gray",
  },
  eventDescription: {
    marginVertical: 10,
    fontSize: 16,
    color: "#333",
  },
  bookButton: {
    backgroundColor: "black",
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  bookButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  eventDateContainer: {
    flexDirection: "row", // Arrange items in a row
    alignItems: "center", // Align the icon and text vertically in the center
    marginTop: 4, // Add some space at the top
  },
  eventDateText: {
    color: "#333",
    marginLeft: 5, // Space between the icon and the text
  },
});
