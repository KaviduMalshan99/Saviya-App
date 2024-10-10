import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  ScrollView,
  Text,
  View,
  Animated,
  Image,
  Pressable,
  TextInput,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const EHomeScreen = () => {
  const navigation = useNavigation();
  const moveAnima = new Animated.Value(0);
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Start animation
  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(moveAnima, {
        toValue: -30,
        duration: 2000,
        useNativeDriver: true,
      })
    );
    animation.start();
    return () => animation.stop(); // Clean up on unmount
  }, []);

  // Customize header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <Text style={styles.greetingText}>Hey Nirmal!</Text>,
      headerStyle: {
        backgroundColor: "#F5F5F5",
        shadowColor: "transparent",
        shadowOpacity: 0.3,
        shadowOffset: { width: -1, height: 1 },
      },
      headerRight: () => (
        <Pressable
          style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
        >
          <Ionicons name="notifications-outline" size={24} color="black" />
          <Ionicons
            onPress={() => navigation.navigate("EPlacesScreen")}
            name="location-outline"
            size={24}
            color="black"
          />
          <Pressable onPress={() => navigation.navigate("EPlacesScreen")}>
            <Animated.Text
              style={[styles.text, { transform: [{ translateX: moveAnima }] }]}
            >
              Colombo
            </Animated.Text>
          </Pressable>
        </Pressable>
      ),
    });
  }, [navigation]);

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          "http://172.20.10.2/event-api/events.php"
        );
        console.log("Fetched events:", response.data);
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  // Handle search functionality
  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Navigate to EventDetailsScreen
  const navigateToDetails = (event) => {
    navigation.navigate("EventDetailsScreen", { event });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Search Section */}
      <View style={styles.searchSection}>
        <View style={styles.searchHeader}>
          <Text style={styles.titleText}>Where do you plan to join?</Text>
          <Ionicons
            name="filter-outline"
            size={24}
            color="black"
            onPress={() => navigation.navigate("ECategoryScreen")}
            style={styles.filterIcon}
          />
        </View>
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={20} color="gray" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            value={searchTerm}
            onChangeText={setSearchTerm} // Update search term
          />
        </View>
      </View>

      {/* Event Cards */}
      <View>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <Pressable
              key={event.id}
              onPress={() => navigateToDetails(event)}
              style={styles.popularEventCard}
            >
              <Image
                style={styles.eventImage}
                source={{ uri: event.image_url }}
              />
              <View style={styles.eventInfo}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventLocation}>{event.location}</Text>
                <View style={styles.eventDate}>
                  <Text style={styles.eventDateText}>
                    {new Date(event.date).toLocaleDateString()}
                  </Text>
                </View>
                <Text style={styles.eventPrice}>
                  Ticket Price: {event.price}
                </Text>
              </View>
            </Pressable>
          ))
        ) : (
          <Text>No events found</Text>
        )}
      </View>
      <Pressable
        style={styles.bookedEventsButton}
        onPress={() => navigation.navigate("BookedEventScreen")}
      >
        <Text style={styles.bookedEventsButtonText}>Booked Events</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0F8FC",
    padding: 16,
  },
  greetingText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  searchSection: {
    marginVertical: 16,
  },
  searchHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleText: {
    fontSize: 18,
    fontWeight: "500",
  },
  filterIcon: {
    paddingLeft: 10,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E0E0E0",
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
    color: "#333",
  },
  popularEventCard: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    overflow: "hidden",
    flexDirection: "row",
    position: "relative",
    marginBottom: 20,
  },
  eventImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  eventInfo: {
    flex: 1,
    padding: 10,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  eventLocation: {
    fontSize: 14,
    color: "#666",
  },
  eventPrice: {
    fontSize: 14,
    color: "#333",
    marginTop: 4,
  },
  eventDate: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#E0E0E0",
    padding: 8,
    borderRadius: 6,
    alignItems: "center",
  },
  eventDateText: {
    color: "#333",
    fontWeight: "bold",
  },
  bookedEventsButton: {
    backgroundColor: "#007BFF",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
    marginTop: 20,
  },
  bookedEventsButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EHomeScreen;
