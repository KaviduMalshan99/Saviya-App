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
  RefreshControl, // Import RefreshControl for pull-to-refresh
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EHomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute(); // Use useRoute to access route params
  const moveAnima = new Animated.Value(0);
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [bookings, setBookings] = useState({}); // Track booked seats for each event
  const [selectedLocation, setSelectedLocation] = useState("");
  const [refreshing, setRefreshing] = useState(false); // State to handle refreshing

  // Get selected location from route params (if available)
  useEffect(() => {
    if (route.params?.selectedLocation) {
      setSelectedLocation(route.params.selectedLocation);
      console.log("Selected location from EventLocationScreen:", route.params.selectedLocation);
    }
  }, [route.params?.selectedLocation]);

  // Start animation
  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(moveAnima, {
        toValue: 0,
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
            onPress={() => navigation.navigate("EventLocationScreen")}
            name="location-outline"
            size={24}
            color="black"
          />
          <Pressable onPress={() => navigation.navigate("EventLocationScreen")}>
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
  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        "http://172.20.10.2/event-api/events.php"
      );
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // Load booked seat count from AsyncStorage
  const loadBookings = async () => {
    try {
      const storedEvents = await AsyncStorage.getItem("bookedEvents");
      if (storedEvents) {
        const events = JSON.parse(storedEvents);
        const bookingsMap = {};

        // Count how many users have booked seats for each event
        events.forEach((event) => {
          if (bookingsMap[event.title]) {
            bookingsMap[event.title] += event.seats.length;
          } else {
            bookingsMap[event.title] = event.seats.length;
          }
        });

        setBookings(bookingsMap); // Set the booked seat count per event
      }
    } catch (error) {
      console.error("Error loading bookings:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
    loadBookings();
  }, []);

  // Handle search functionality
  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation ? event.location.includes(selectedLocation) : true;
    return matchesSearch && matchesLocation; // Filter by both search term and selected location
  });

  // Pull-to-refresh handler
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchEvents(); // Fetch the events again when refreshing
    setRefreshing(false);
  };

  // Navigate to EventDetailsScreen
  const navigateToDetails = (event) => {
    navigation.navigate("EventDetailsScreen", { event });
  };

  return (
    <View style={styles.container}>
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

      {/* ScrollView for Event Cards with RefreshControl */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContentContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
                  <Text style={styles.eventLocation}>Time: {event.time}</Text>
                  <View style={styles.eventDate}>
                    <Text style={styles.eventDateText}>
                      {new Date(event.date).toLocaleDateString()}
                    </Text>
                  </View>
                  <Text style={styles.eventPrice}>
                    Ticket Price: Rs. {event.price}
                  </Text>

                  {/* Show the number of seats booked */}
                  <Text style={styles.bookedSeats}>
                    {bookings[event.title]
                      ? `${bookings[event.title]} seat(s) booked`
                      : "No seats booked yet"}
                  </Text>
                </View>
              </Pressable>
            ))
          ) : (
            <Text>No events found</Text>
          )}
        </View>
      </ScrollView>

      {/* Fixed Button at the Bottom */}
      <Pressable
        style={styles.bookedEventsButton}
        onPress={() => navigation.navigate("BookedEventScreen")}
      >
        <Text style={styles.bookedEventsButtonText}>Booked Events</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0F8FC",
  },
  greetingText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  searchSection: {
    marginVertical: 16,
    paddingHorizontal: 16,
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
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
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
    bottom: 10,
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
  bookedSeats: {
    marginTop: 8,
    color: "#007BFF",
  },
  bookedEventsButton: {
    position: "absolute",
    bottom: 10,
    left: 16,
    right: 16,
    backgroundColor: "#007BFF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  bookedEventsButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EHomeScreen;
