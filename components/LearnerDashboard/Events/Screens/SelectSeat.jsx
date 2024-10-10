import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native"; 
import AsyncStorage from "@react-native-async-storage/async-storage";

const SeatIcon = ({ type, selected, booked, onPress }) => {
  const getColor = () => {
    if (booked) return "red"; // Booked seats should be red (sold)
    if (selected) return "green"; // Selected seats should be green
    switch (type) {
      case "sold":
        return "red";
      case "vip":
        return "blue";
      case "couple":
        return "yellow";
      case "selected":
        return "green";
      default:
        return "gray";
    }
  };

  return (
    <TouchableOpacity onPress={!booked ? onPress : null} disabled={booked}>
      <View style={[styles.seat, { backgroundColor: getColor() }]} />
    </TouchableOpacity>
  );
};

const SeatSelectionScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { title, date, location, price, image_url } = route.params; 

  const [selectedSeats, setSelectedSeats] = useState([]); // Store currently selected seats
  const [bookedSeats, setBookedSeats] = useState([]); // Store already booked seats from AsyncStorage

  const handleSeatPress = (row, col) => {
    const seatKey = `${row}${col}`; // Create a unique identifier for the seat

    if (selectedSeats.includes(seatKey)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatKey));
    } else {
      setSelectedSeats([...selectedSeats, seatKey]);
    }
  };

  useEffect(() => {
    // Load booked seats from AsyncStorage
    const loadBookedSeats = async () => {
      try {
        const storedEvents = await AsyncStorage.getItem("bookedEvents");
        if (storedEvents) {
          const events = JSON.parse(storedEvents);
          const bookedSeatsForEvent = events
            .filter((event) => event.title === title && event.date === date)
            .flatMap((event) => event.seats);
          setBookedSeats(bookedSeatsForEvent); // Set already booked seats
        }
      } catch (error) {
        console.error("Error loading booked seats:", error);
      }
    };

    loadBookedSeats();
  }, [title, date]);

  const handleBooking = async () => {
    if (selectedSeats.length === 0) {
      Alert.alert("No Seats Selected", "Please select at least one seat.");
      return;
    }

    const bookedEvent = {
      title,
      date,
      location,
      price,
      image_url,
      seats: selectedSeats, 
      time: "01:30PM", 
      orderId: "7376465", 
    };

    try {
      const storedEvents = await AsyncStorage.getItem("bookedEvents");
      const bookedEvents = storedEvents ? JSON.parse(storedEvents) : [];

      // Add the new event with the newly selected seats to AsyncStorage
      const updatedEvents = [...bookedEvents, bookedEvent];

      // Save the updated list back to AsyncStorage
      await AsyncStorage.setItem("bookedEvents", JSON.stringify(updatedEvents));

      // Navigate to the BookedEventScreen
      navigation.navigate("BookedEventScreen");
    } catch (error) {
      console.error("Error saving booking:", error);
    }
  };

  const isSeatBooked = (seatKey) => {
    return bookedSeats.includes(seatKey); // Check if the seat is already booked
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Select Seat</Text>
      </View>

      <ScrollView>
        <View style={styles.seatMapContainer}>
          <View style={styles.frontCurve}>
            <Text style={styles.frontText}>Front</Text>
          </View>

          <View style={styles.legendContainer}>
            {["Selected Seat", "Sold", "Empty Seat", "VIP Seat", "Couple Seat"].map(
              (text, index) => (
                <View key={index} style={styles.legendItem}>
                  <SeatIcon type={text.toLowerCase().split(" ")[0]} />
                  <Text style={styles.legendText}>{text}</Text>
                </View>
              )
            )}
          </View>

          <View style={styles.seatMap}>
            {["A", "B", "C", "D", "E", "F"].map((row, rowIndex) => (
              <View key={row} style={styles.row}>
                <Text style={styles.rowLabel}>{row}</Text>
                {Array(rowIndex === 5 ? 5 : 11)
                  .fill()
                  .map((_, colIndex) => {
                    const seatKey = `${row}${colIndex}`;
                    return (
                      <SeatIcon
                        key={seatKey}
                        selected={selectedSeats.includes(seatKey)}
                        booked={isSeatBooked(seatKey)} // Mark seat as booked if already taken
                        type={rowIndex === 5 ? "couple" : "empty"}
                        onPress={() => handleSeatPress(row, colIndex)}
                      />
                    );
                  })}
              </View>
            ))}
          </View>
        </View>

        <View style={styles.venueInfo}>
          <Image source={{ uri: image_url }} style={styles.venueImage} />
          <Text style={styles.eventName}>{title}</Text>
          <View style={styles.venueTextContainer}>
            <Text style={styles.venueName}>{location}</Text>
          </View>
          <Text style={styles.venueDate}>
            {new Date(date).toLocaleDateString()}
          </Text>
        </View>

        <View style={styles.bookingInfo}>
          <View style={styles.bookingRow}>
            <Text>Seats:</Text>
            <Text>{selectedSeats.length} Seat(s)</Text>
          </View>
          <View style={styles.bookingRow}>
            <Text>Total Price:</Text>
            <Text>Rs. {selectedSeats.length * price}</Text>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.bookButton} onPress={handleBooking}>
        <Text style={styles.bookButtonText}>Book Your Seat</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SeatSelectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6f7ff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 16,
  },
  seatMapContainer: {
    alignItems: "center",
    padding: 16,
  },
  frontCurve: {
    width: "100%",
    height: 40,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  frontText: {
    color: "gray",
  },
  legendContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 16,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
    marginBottom: 8,
  },
  legendText: {
    marginLeft: 4,
    fontSize: 12,
  },
  seatMap: {
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    marginBottom: 8,
  },
  rowLabel: {
    width: 20,
    textAlign: "center",
    marginRight: 8,
  },
  seat: {
    width: 20,
    height: 20,
    borderRadius: 4,
    margin: 2,
  },
  venueInfo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 16,
    margin: 16,
    borderRadius: 8,
  },
  venueImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  venueTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  venueName: {
    fontWeight: "bold",
  },
  venueDate: {
    fontWeight: "bold",
  },
  bookingInfo: {
    backgroundColor: "white",
    padding: 16,
    margin: 16,
    borderRadius: 8,
  },
  bookingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  bookButton: {
    backgroundColor: "black",
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  bookButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  eventName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginVertical: 8,
    textAlign: "center",
  },
});
