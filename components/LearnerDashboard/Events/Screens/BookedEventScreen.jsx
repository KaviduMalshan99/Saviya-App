import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';

const getCurrentDate = () => {
  const today = new Date();
  return today;
};

const BookedEventScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("Upcoming");
  const [bookedEvents, setBookedEvents] = useState([]);

  useEffect(() => {
    // Fetch booked events from AsyncStorage when the screen is loaded
    const loadBookedEvents = async () => {
      try {
        const storedEvents = await AsyncStorage.getItem('bookedEvents');
        if (storedEvents) {
          setBookedEvents(JSON.parse(storedEvents));
        }
      } catch (error) {
        console.error("Error loading booked events:", error);
      }
    };

    loadBookedEvents();
  }, []);

  const currentDate = getCurrentDate();

  const upcomingEvents = bookedEvents.filter(
    (event) => new Date(event.date) >= currentDate
  );

  const pastEvents = bookedEvents.filter(
    (event) => new Date(event.date) < currentDate
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Booked Events</Text>
        <Pressable onPress={() => navigation.navigate('EventCalendar')}>
          <Ionicons name="calendar-outline" size={24} color="black" />
        </Pressable>
      </View>

      <View style={styles.tabContainer}>
        <Pressable
          style={[styles.tab, activeTab === "Upcoming" && styles.activeTab]}
          onPress={() => setActiveTab("Upcoming")}
        >
          <Text style={[styles.tabText, activeTab === "Upcoming" && styles.activeTabText]}>
            Upcoming
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, activeTab === "Past" && styles.activeTab]}
          onPress={() => setActiveTab("Past")}
        >
          <Text style={[styles.tabText, activeTab === "Past" && styles.activeTabText]}>
            Past
          </Text>
        </Pressable>
      </View>

      <ScrollView>
        {(activeTab === "Upcoming" ? upcomingEvents : pastEvents).map((event, index) => (
          <View key={index} style={styles.eventCard}>
            <Image source={{ uri: event.image_url }} style={styles.eventImage} />
            <View style={styles.eventInfo}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <View style={styles.eventDetails}>
                <Ionicons name="ticket-outline" size={16} color="#666" />
                <Text style={styles.eventText}>
                  Quantity: {event.seats.length} tickets
                </Text>
              </View>
              <View style={styles.eventDetails}>
                <Ionicons name="time-outline" size={16} color="#666" />
                <Text style={styles.eventText}>Time: {event.time}</Text>
                <Text style={styles.eventText}>Seats: {event.seats.join(", ")}</Text>
              </View>
              <View style={styles.eventDetails}>
                <MaterialCommunityIcons name="seat-outline" size={16} color="#666" />
                <Text style={styles.eventText}>Seats: {event.seats.join(", ")}</Text>
              </View>
            </View>
            <View style={styles.dateContainer}>
              <Text style={styles.dateText}>{new Date(event.date).toLocaleDateString()}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default BookedEventScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#E0E0E0",
    borderRadius: 25,
    margin: 16,
    padding: 4,
  },
  tab: {
    flex: 1,
    padding: 8,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#fff",
    borderRadius: 25,
  },
  tabText: {
    fontSize: 16,
    color: "#666",
  },
  activeTabText: {
    color: "#000",
    fontWeight: "bold",
  },
  eventCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 16,
    overflow: "hidden",
    flexDirection: "row",
  },
  eventImage: {
    width: 100,
    height: 100,
  },
  eventInfo: {
    flex: 1,
    padding: 12,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  eventDetails: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  eventText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
    marginRight: 8,
  },
  dateContainer: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    padding: 4,
  },
  dateText: {
    fontSize: 12,
    fontWeight: "bold",
  },
});
