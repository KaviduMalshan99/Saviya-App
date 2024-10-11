import React from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";

// Helper function to group events by date
const groupEventsByDate = (events) => {
  return events.reduce((groupedEvents, event) => {
    const eventDate = new Date(event.date).toLocaleDateString(); // Format date
    if (!groupedEvents[eventDate]) {
      groupedEvents[eventDate] = [];
    }
    groupedEvents[eventDate].push(event);
    return groupedEvents;
  }, {});
};

const EventCalendar = ({ route }) => {
  const { events } = route.params; // Receive events passed from BookedEventScreen

  // Group the events by date
  const groupedEvents = groupEventsByDate(events);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Event Calendar</Text>
      </View>
      {Object.keys(groupedEvents).length > 0 ? (
        Object.keys(groupedEvents).map((date) => (
          <View key={date} style={styles.dateSection}>
            <Text style={styles.eventDate}>{date}</Text>
            {groupedEvents[date].map((event) => (
              <View key={event.id} style={styles.card}>
                <Image source={{ uri: event.image_url }} style={styles.eventImage} />
                <View style={styles.eventDetails}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <Text style={styles.eventLocation}>{event.location}</Text>
                </View>
              </View>
            ))}
          </View>
        ))
      ) : (
        <Text style={styles.noEventsText}>No booked events available.</Text>
      )}
    </ScrollView>
  );
};

export default EventCalendar;

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
  dateSection: {
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  eventDate: {
    fontSize: 16,
    color: "#FF5252",
    marginBottom: 8,
    fontWeight: "bold",
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
    marginBottom: 8,
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
  noEventsText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#666",
  },
});
