import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';

const TermsConditions2 = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Page Title at the top of the screen */}
      <Text style={styles.title}>Terms & Conditions</Text>

      {/* Image between the title and text container */}
      <Image 
        source={require('../../assets/images/Hand22.png')}     // Add your image path here
        style={styles.image}
      />

      <View style={styles.textContainer}>
        <Text style={styles.termsText}>
        Fundraisers must provide regular updates and reports on
the status of their fundraising efforts and how the
funds are impacting the beneficiaries.
        </Text>
        <Text style={styles.termsText}>
        Fundraisers are expected to behave ethically in all aspects
of their role, ensuring that their actions reflect the integrity
of the project and contribute to the greater good of the
communities being served.
        </Text>
      </View>

      {/* Pressable Text for "Skip" */}
      <Pressable onPress={() => navigation.navigate('FundAgrements')}>
        <Text style={styles.skipText}>Skip</Text>
      </Pressable>

      {/* Black dots under the Skip text */}
      <View style={styles.dotsContainer}>
        <View style={styles.dot} />
        <View style={styles.dot1} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  title: {
    fontSize: 25,
    fontWeight:'450',
    color: '#000',
    marginTop: -15,
    marginBottom: 2,
    textAlign: 'center',
  },
  image: {
    marginTop: -30,
    width: 200, // Reduced width
    height: 340, // Reduced height
    marginBottom: -40,
  },
  textContainer: {
    backgroundColor: '#e0f7fa',
    borderRadius: 10,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  termsText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 15,
  },
  skipText: {
    fontSize: 20,
    color: '#007BFF',
    textAlign: 'center',
    marginTop: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: '#989898',
    borderRadius: 4,
    marginHorizontal: 5,
  },
  dot1: {
    width: 8,
    height: 8,
    backgroundColor: '#000',
    borderRadius: 4,
    marginHorizontal: 5,
  },
  
});

export default TermsConditions2;
