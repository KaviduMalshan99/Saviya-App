import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Slider from '@react-native-community/slider'; // For the price range slider
import { useNavigation } from '@react-navigation/native'; // Import navigation hook


const CategoryDetailsScreen = ({ route }) => {
  const { category } = route.params;
  const bottomSheetRef = useRef(null);
   // Access navigation
   const navigation = useNavigation();

  // Define snap points for the bottom sheet
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

  const handleSheetChanges = useCallback((index) => {
    console.log('BottomSheet position changed to:', index);
  }, []);

  // Filter state (for managing selection)
  const [selectedEventType, setSelectedEventType] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(60); // Default price range
  const [selectedMode, setSelectedMode] = useState(null);

   // Add a function to handle the navigation to EventLocationScreen
   const navigateToEventLocation = () => {
    navigation.navigate('EventLocationScreen'); // Assuming you have 'EventLocationScreen' set up in your navigation stack
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{category.title} Events</Text>
        <Image source={category.image} style={styles.headerImage} />

        {/* Display event details */}
        <View style={styles.eventCard}>
          <Image source={{ uri: "https://example.com/event1.jpg" }} style={styles.eventImage} />
          <View style={styles.eventInfo}>
            <Text style={styles.eventTitle}>How to be the best!</Text>
            <Text style={styles.eventPrice}>Rs.100.00 / Ticket</Text>
            <Text style={styles.eventDate}>Thu, 29 Oct 2024</Text>
            <Text style={styles.eventLocation}>The Taprobane, Colombo</Text>
          </View>
        </View>

        {/* Button to trigger the filter bottom sheet */}
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => bottomSheetRef.current?.expand()}
        >
          <Text style={styles.filterButtonText}>Open Filter</Text>
        </TouchableOpacity>
      </ScrollView>

       {/* Choose Location Button */}
       <TouchableOpacity style={styles.chooseLocationButton} onPress={navigateToEventLocation}>
        <Text style={styles.chooseLocationText}>Choose Location</Text>
      </TouchableOpacity>

      {/* Bottom Sheet for Filters */}
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true} // Allow swipe-down to close
      >
        <View style={styles.bottomSheetContent}>
          <Text style={styles.bottomSheetTitle}>Filter Events</Text>

          {/* Event Type Section */}
          {/* <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Event Type</Text>
            <View style={styles.filterOptions}>
              {['Soap', 'Pottery', 'Curd'].map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.filterOption,
                    selectedEventType === type && styles.activeOption,
                  ]}
                  onPress={() => setSelectedEventType(type)}
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      selectedEventType === type && styles.activeOptionText,
                    ]}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View> */}

          {/* Date Section */}
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Dates</Text>
            <View style={styles.filterOptions}>
              {['Today', 'Tomorrow', 'This Week', 'This Month'].map((date) => (
                <TouchableOpacity
                  key={date}
                  style={[
                    styles.filterOption,
                    selectedDate === date && styles.activeOption,
                  ]}
                  onPress={() => setSelectedDate(date)}
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      selectedDate === date && styles.activeOptionText,
                    ]}
                  >
                    {date}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Location Section */}
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Location</Text>
            <View style={styles.filterOptions}>
              {['Colombo', 'Galle', 'Kandy'].map((location) => (
                <TouchableOpacity
                  key={location}
                  style={[
                    styles.filterOption,
                    selectedLocation === location && styles.activeOption,
                  ]}
                  onPress={() => setSelectedLocation(location)}
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      selectedLocation === location && styles.activeOptionText,
                    ]}
                  >
                    {location}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Event Mode Section */}
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Event Mode</Text>
            <View style={styles.filterOptions}>
              {['Offline', 'Online'].map((mode) => (
                <TouchableOpacity
                  key={mode}
                  style={[
                    styles.filterOption,
                    selectedMode === mode && styles.activeOption,
                  ]}
                  onPress={() => setSelectedMode(mode)}
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      selectedMode === mode && styles.activeOptionText,
                    ]}
                  >
                    {mode}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <Text style={styles.filterLabel}>Price Range</Text>
          <Slider
            style={styles.priceSlider}
            minimumValue={20}
            maximumValue={120}
            step={10}
            value={selectedPrice}
            onValueChange={(value) => setSelectedPrice(value)}
            minimumTrackTintColor="#1E90FF"
            maximumTrackTintColor="#d3d3d3"
          />
          <Text style={styles.priceRangeText}>Rs. {selectedPrice}</Text>

          {/* Reset and Apply Buttons */}
          <View style={styles.filterActions}>
            <TouchableOpacity
              style={styles.resetButton}
              onPress={() => {
                setSelectedEventType(null);
                setSelectedDate(null);
                setSelectedLocation(null);
                setSelectedMode(null);
              }}
            >
              <Text style={styles.resetButtonText}>RESET</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyButton}>
              <Text style={styles.applyButtonText}>APPLY</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default CategoryDetailsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F9F9F9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  headerImage: {
    width: '100%',
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
  },
  eventImage: {
    width: 100,
    height: 100,
  },
  eventInfo: {
    padding: 10,
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventPrice: {
    color: '#E74C3C',
    marginVertical: 4,
  },
  eventDate: {
    color: '#555',
  },
  eventLocation: {
    color: '#555',
    fontSize: 12,
  },
  filterButton: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  filterButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bottomSheetContent: {
    padding: 16,
    backgroundColor: '#FFF',
    flex: 1,
  },
  bottomSheetTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  filterSection: {
    marginBottom: 16,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  filterOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  filterOption: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    marginBottom: 8,
    width: '48%', // Adjust for two items per row
    alignItems: 'center',
  },
  activeOption: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  filterOptionText: {
    color: '#000',
  },
  activeOptionText: {
    color: '#fff',
  },
  filterActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  resetButton: {
    padding: 15,
    backgroundColor: '#ddd',
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    marginRight: 8,
  },
  resetButtonText: {
    color: '#555',
    fontWeight: 'bold',
  },
  applyButton: {
    padding: 15,
    backgroundColor: '#000',
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    marginLeft: 8,
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  chooseLocationButton: {
    position: 'absolute',
    top: 40, // Position the button at the top right corner
    right: 20,
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 20,
  },
  chooseLocationText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
