import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert, Animated } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // for location icon
import Fundheader from './Fundheader'; // Import Fundheader
import Fside from './Fside';

const Fund = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Fund'); // Active Tab State for Fund
  const [isMenuVisible, setMenuVisible] = useState(false); // Side menu visibility state
  const [profiles, setProfiles] = useState([]); // State to store fetched profiles
  const fadeAnim = useRef(new Animated.Value(0)).current; // Animated value for fade

  // Fetch profile data from the server
  const fetchProfiles = async () => {
    try {
      const response = await fetch('http://192.168.8.113/myapp/retrieve_funder_profiles.php'); // Replace with your IP and PHP file
      const result = await response.json();

      if (result.status === 'success') {
        setProfiles(result.data); // Store the profiles in state
      } else {
        Alert.alert('Error', 'Failed to fetch profiles: ' + result.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Error fetching profiles: ' + error.message);
    }
  };

  // Use useEffect to fetch profiles on component mount
  useEffect(() => {
    fetchProfiles();

    // Trigger the fade-in animation when the component mounts
    Animated.timing(fadeAnim, {
      toValue: 1, // Fully visible
      duration: 2000, // Animation duration in milliseconds
      useNativeDriver: true, // Enable native driver for better performance
    }).start();

    const interval = setInterval(() => {
      fetchProfiles();
    }, 10000); // 10000 ms = 10 seconds

    return () => clearInterval(interval);
  }, []);

  // Toggle function for the menu visibility
  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  return (
    <ScrollView style={styles.container}> 
      <Fundheader toggleMenu={toggleMenu} />

      {/* Side Menu */}
      {isMenuVisible && (
        <View style={styles.menuOverlay}>
          <Fside visible={isMenuVisible} toggleMenu={toggleMenu} />
          <TouchableOpacity style={styles.overlay} onPress={() => setMenuVisible(false)} />
        </View>
      )}

      <Text style={styles.topicTitle}>Our Fundraisers</Text>

      
      <Animated.View style={[styles.descriptionContainer, { opacity: fadeAnim }]}>
        <Text style={styles.descriptionText}>
          "Together, we grow. Our fundraisers are dedicated to helping rural entrepreneurs like you succeed."
        </Text>
        <Text style={styles.descriptionText1}>
          "ඔබේ ව්‍යවසායකත්වයේ සිහිනය වෙනුවෙන් අපේ සහයෝගය අප ඔබ වෙනුවෙන් !"
        </Text>
      </Animated.View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
        {profiles.map((profile) => (
          <View style={styles.card} key={profile.id}>
            <Image
              source={profile.profileImageUri ? { uri: profile.profileImageUri } : require('../../assets/images/nonpro.jpg')} // Use profile image or default
              style={styles.profileImage}
            />
            <View style={styles.cardContent}>
              <Text style={styles.userName}>{profile.name}</Text>
              <Text style={styles.position}>Fundraiser</Text>
              <Text style={styles.date}>{new Date(profile.joinedDate).toDateString()} Joined</Text>
              <View style={styles.locationContainer}>
                <FontAwesome name="map-marker" size={16} color="gold" />
                <Text style={styles.location}>{profile.location}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <Animated.View style={[styles.descriptionContainer, { opacity: fadeAnim }]}>
          <Text style={styles.descriptionText1}>
            "Our fundraisers are dedicated to your success. With their help, your journey to growth and achievement is unstoppable."
          </Text>
          <Text style={styles.descriptionText1}>
          "Boost your profits by staying informed with up-to-date exchange rates and banking support."
          </Text>
        </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  menuOverlay: {
    position: 'absolute',  // Ensure it is positioned on top
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,  // High z-index to ensure it's on top of other elements
    flexDirection: 'row',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  topicTitle: {
    fontSize: 22,
    fontWeight: '500',
    marginTop: 20,
    color: '#000',
    textAlign: 'center',
    marginBottom: 25,
  },
  descriptionContainer: {
    marginBottom: 22,  // Space below the descriptions and above the cards
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: 22,
    fontStyle: 'italic',
    fontWeight: '600',
    color: '#004C00',
    textAlign: 'center',
    marginVertical: 20,  // Space between the sentences
  },
  descriptionText1: {
    fontSize: 22,
    fontStyle: 'italic',
    fontWeight: '600',
    color: '#004C00',
    textAlign: 'center',
    marginVertical: 20,  // Space between the sentences
  },
  scrollView: {
    marginTop: 10,
  },
  card: {
    backgroundColor: '#000',
    borderRadius: 10,
    padding: 10,
    marginRight: 15, // Spacing between horizontal cards
    width: 260,
    height: 440,
    marginBottom:100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  profileImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 18,
  },
  cardContent: {
    alignItems: 'center',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  position: {
    fontSize: 16,
    color: '#c0392b',
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: '#FFFF00',
    marginBottom: 5,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 14,
    color: '#2980b9',
    marginLeft: 5,
  },
});

export default Fund;
