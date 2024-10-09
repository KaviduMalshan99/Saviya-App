import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const LearnerHome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={28} color="#000" />
        </TouchableOpacity>
        <View style={styles.iconGroup}>
          <TouchableOpacity>
            <Ionicons name="cart" size={28} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="notifications" size={28} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Welcome Message */}
      <Text style={styles.welcomeText}>Welcome to the Learner Dashboard!</Text>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Courses')}
        >
          <Ionicons name="book" size={24} color="#007BFF" />
          <Text style={styles.navText}>Courses</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Events')}
        >
          <Ionicons name="calendar" size={24} color="#007BFF" />
          <Text style={styles.navText}>Events</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('SellerDashboardPage')}
        >
          <Ionicons name="pricetag" size={24} color="#007BFF" />
          <Text style={styles.navText}>Market</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Community')}
        >
          <Ionicons name="people" size={24} color="#007BFF" />
          <Text style={styles.navText}>Community</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  iconGroup: {
    flexDirection: 'row',
  },
  welcomeText: {
    fontSize: 22,
    textAlign: 'center',
    marginVertical: 20,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f5f5f5',
    paddingVertical: 20,
  },
  navButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  navText: {
    marginTop: 5,
    fontSize: 12,
    color: '#007BFF',
  },
});

export default LearnerHome;
