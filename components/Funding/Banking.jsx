import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Banking = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Banking'); // Active Tab State

  return (
    <ScrollView style={styles.scrollView}>
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
          onPress={() => setActiveTab('Banking')}
        >
          <Text style={[styles.tabText, activeTab === 'Banking' && styles.activeTabText]}>Banking</Text>
        </Pressable>
        <Pressable
          style={[styles.tab, activeTab === 'Fund' && styles.activeTab]}
          onPress={() => navigation.navigate('Fund')}
        >
          <Text style={[styles.tabText, activeTab === 'Fund' && styles.activeTabText]}>Funding</Text>
        </Pressable>
      </View>
              {/* Top Image */}
              {/* <Image
          source={require('../../assets/images/NSB.png')} // Update with your local image path
          style={styles.topImage}
        /> */}

        {/* Bank Card 1 */}
        <View style={styles.card}>
        <Image
            source={require('../../assets/images/NSB.png')} // Update with your local image path
            style={styles.bankLogo1}
          />
          <Text style={styles.bankDetail}>Bank Name: National Savings Bank (NSB)</Text>
          <Text style={styles.bankDetail}>Bank Email: nsb@gmail.com</Text>
          <Text style={styles.bankDetail}>Hot-line No: +94 111 223 456</Text>
          <Text style={styles.bankDetail}>Interest rate: 10.7% - 11.1%</Text>
          <Text style={styles.bankDetail}>Time Period: 1 month - 10 months</Text>
          <Text style={styles.bankDetail}>Bank Website: https://www.nsb.lk/</Text>

          {/* Action Buttons */}
          <View style={styles.iconContainer}>
            <TouchableOpacity style={styles.iconButton}>
              <FontAwesome name="envelope" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <FontAwesome name="phone" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Bank Card 2 */}
        <View style={styles.card}>
        <Image
            source={require('../../assets/images/HSBC.png')} // Update with your local image path
            style={styles.bankLogo}
          />
          <Text style={styles.bankDetail}>Bank Name: HSBC Limited Bank</Text>
          <Text style={styles.bankDetail}>Bank Email: hsbsclk@gmail.com</Text>
          <Text style={styles.bankDetail}>Hot-line No: +94 114 472 200</Text>
          <Text style={styles.bankDetail}>Interest rate: 11.2% - 11.8%</Text>
          <Text style={styles.bankDetail}>Time Period: 1 month - 10 months</Text>
          <Text style={styles.bankDetail}>Bank Website: https://www.hsbc.lk/</Text>

          {/* Action Buttons */}
          <View style={styles.iconContainer}>
            <TouchableOpacity style={styles.iconButton}>
              <FontAwesome name="envelope" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <FontAwesome name="phone" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        </View>
      </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#e0f8fc', // Ensure the entire scroll view has a consistent background
  },
  container: {
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
    color: '#fff',
  },
  activeTabText: {
    fontWeight: 'bold',
    color: '#000',
  },

  topImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover', // Ensure the image covers the allotted space without stretching
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center', // This centers all child components including the logo
  },
  bankLogo: {
    width: 150, // Increased width
    height: 150, // Increased height to maximize logo size
    resizeMode: 'contain',
    marginBottom: 5,
    marginTop:-30,
  },
  bankLogo1: {
    width: 180, // Increased width
    height: 120, // Increased height to maximize logo size
    resizeMode: 'contain',
    marginBottom: 5,
    marginTop:-30,
  },
  bankDetail: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap:120,
  },
  iconButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: 50,

  },
});

export default Banking;