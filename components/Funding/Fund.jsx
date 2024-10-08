import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // for location icon
import Fundheader from './Fundheader'; // Import Fundheader
import Fside from './Fside'; // Import Fside

const Fundraiser = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Fund'); // Active Tab State for Fund
  const [isMenuVisible, setMenuVisible] = useState(false); // Side menu visibility state

  // Toggle function for the menu visibility
  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Fundheader toggleMenu={toggleMenu} />

      {/* Side Menu */}
      {isMenuVisible && (
        <View style={styles.menuOverlay}>
          <Fside visible={isMenuVisible} toggleMenu={toggleMenu} />
          <TouchableOpacity style={styles.overlay} onPress={() => setMenuVisible(false)} />
        </View>
      )}

      <Text style={styles.topicTitle}>Our Fundraisers</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
        {/* Fundraiser Card 1 */}
        <View style={styles.card}>
          <Image
            source={require('../../assets/images/Shalin.jpg')}
            style={styles.profileImage}
          />
          <View style={styles.cardContent}>
            <Text style={styles.userName}>Mr. Shalin Balasooriya</Text>
            <Text style={styles.position}>Co-Founder at SPA CEYLON</Text>
            <Text style={styles.date}>Mon, 15 Nov 2023 Joined</Text>
            <View style={styles.locationContainer}>
              <FontAwesome name="map-marker" size={16} color="gold" />
              <Text style={styles.location}>The Park Ave, Kandy</Text>
            </View>
          </View>
        </View>

        {/* Fundraiser Card 2 */}
        <View style={styles.card}>
          <Image
            source={require('../../assets/images/Otara.jpg')} // Path to the local image
            style={styles.profileImage}
          />
          <View style={styles.cardContent}>
            <Text style={styles.userName}>Mrs. Otara Gunawardhna</Text>
            <Text style={styles.position}>Co-Founder Embark Pvt.Ltd</Text>
            <Text style={styles.date}>Sun, 20 Oct 2023 Joined</Text>
            <View style={styles.locationContainer}>
              <FontAwesome name="map-marker" size={16} color="gold" />
              <Text style={styles.location}>The Stella St, Colombo</Text>
            </View>
          </View>
        </View>

        {/* Fundraiser Card 3 */}
        <View style={styles.card}>
          <Image
            source={require('../../assets/images/Yureni.jpg')} // Path to the local image
            style={styles.profileImage}
          />
          <View style={styles.cardContent}>
            <Text style={styles.userName}>Mrs. Yureni Noshika</Text>
            <Text style={styles.position}>Co-Founder in HelperSL Pvt Ltd</Text>
            <Text style={styles.date}>Thu, 20 June 2024 Joined</Text>
            <View style={styles.locationContainer}>
              <FontAwesome name="map-marker" size={16} color="gold" />
              <Text style={styles.location}>The Stella St, Colombo</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
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
    fontSize: 22, // Font size for the title
    fontWeight: '500',
    marginTop: 20,
    color: '#000',
    textAlign: 'center',
    marginBottom: 25, // Margin below the title
  },
  scrollView: {
    marginTop: 10,
  },
  card: {
    backgroundColor: '#000',
    borderRadius: 10,
    padding: 10,
    marginRight: 15,
    width: 260,
    height: 440,
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
    color: '#c0392b', // red color for the role
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 14,
    color: '#2980b9', // blue color for location
    marginLeft: 5,
  },
});

export default Fundraiser;
