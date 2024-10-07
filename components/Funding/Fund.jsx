import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // for location icon

const Fundraiser = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Fund'); // Active Tab State for Fund

  return (
    <View style={styles.container}>
      {/* Tab Container */}
      <View style={styles.tabContainer}>
        <Pressable
          style={[styles.tab, activeTab === 'Post' && styles.activeTab]}
          onPress={() => navigation.navigate('Posting')}
        >
          <Text style={[styles.tabText, activeTab === 'Post' && styles.activeTabText]}>Post</Text>
        </Pressable>

        <Pressable
          style={[styles.tab, activeTab === 'News' && styles.activeTab]}
          onPress={() => navigation.navigate('News')}
        >
          <Text style={[styles.tabText, activeTab === 'News' && styles.activeTabText]}>News</Text>
        </Pressable>

        <Pressable
          style={[styles.tab, activeTab === 'Banking' && styles.activeTab]}
          onPress={() => navigation.navigate('Banking')}
        >
          <Text style={[styles.tabText, activeTab === 'Banking' && styles.activeTabText]}>Banking</Text>
        </Pressable>

        <Pressable
          style={[styles.tab, activeTab === 'Fund' && styles.activeTab]}
          onPress={() => setActiveTab('Fund')}
        >
          <Text style={[styles.tabText, activeTab === 'Fund' && styles.activeTabText]}>Funding</Text>
        </Pressable>
      </View>

      {/* Popular Fundraiser Section */}
      <Text style={styles.sectionTitle}>Popular Fundraiser</Text>

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
            style={styles.profileImage}s
          />
          <View style={styles.cardContent}>
            <Text style={styles.userName}>Mrs. Otara Gunawardhna</Text>
            <Text style={styles.position}>Co - Funder Embark Pvt.Ltd</Text>
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
            style={styles.profileImage}s
          />
          <View style={styles.cardContent}>
            <Text style={styles.userName}>Mrs. Yureni Noshika</Text>
            <Text style={styles.position}>Co - Funder in HelperSL Pvt Ltd</Text>
            <Text style={styles.date}>Thu, 20 june 2024 Joined</Text>
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
    backgroundColor: '#e0f8fc',
    paddingHorizontal: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#000',
    borderRadius: 25,
    marginVertical: 20,
    padding: 5,
  },
  tab: {
    flex: 1,
    padding: 8,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#fff',
    borderRadius: 25,
  },
  tabText: {
    fontSize: 18,
    color:'#fff',
  },
  activeTabText: {
    fontWeight: 'bold',
    color: '#000',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2f4f4f',
    marginTop: 10,
    marginBottom: 10,
  },
  scrollView: {
    marginTop: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginRight: 15,
    width: 260,
    height:440,
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
    color: '#333',
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
