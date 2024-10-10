import React from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";

const events = [
  {
    id: 1,
    title: "Giving New Pottery Ideas",
    date: "12 December, 2024",
    location: "BMICH, Colon",
    image: "https://example.com/pottery.jpg",
  },
  {
    id: 2,
    title: "How to be the best",
    date: "22 October, 2024",
    location: "The Taprobane, Colon",
    image: "https://example.com/howtobethebest.jpg",
  },
  {
    id: 3,
    title: "Amateur Footwear Design",
    date: "24 December, 2024",
    location: "Main Hall, Kegalle",
    image: "https://example.com/footwear.jpg",
  },
];

const EventCalendar = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Calendar</Text>
      </View>
      {events.map((event) => (
        <View key={event.id} style={styles.eventContainer}>
          <Text style={styles.eventDate}>{event.date}</Text>
          <View style={styles.card}>
            <Image source={{ uri: event.image }} style={styles.eventImage} />
            <View style={styles.eventDetails}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventLocation}>{event.location}</Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0F7FA",
  },
  header: {
    padding: 16,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  eventContainer: {
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  eventDate: {
    fontSize: 16,
    color: "#FF5252",
    marginBottom: 4,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  eventImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  eventDetails: {
    flex: 1,
    justifyContent: "center",
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  eventLocation: {
    fontSize: 14,
    color: "#666",
  },
});

export default EventCalendar;
