import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WhoAreYouScreen = ({ navigation }) => {
  
  const handleOptionSelect = async (role) => {
    try {
      // Save the selected role to AsyncStorage (Learner or Buyer)
      await AsyncStorage.setItem('userRole', role);
      // Navigate to the Register screen and pass the selected role
      navigation.navigate('Register', { userType: role });
    } catch (e) {
      console.error('Error saving user role', e);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/onBoardScreens/BG1.png')} // Your cloud background image
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Titles on the same line */}
        <View style={styles.titleRow}>
          <Text style={styles.title}>Who Are You?</Text>
          <Text style={styles.title2}>ඔබ?</Text>
        </View>

        {/* Learner and Buyer buttons vertically */}
        <View style={styles.optionsContainer}>
          {/* Learner Option */}
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => handleOptionSelect('Learner')} // Save Learner and navigate
          >
            <Image source={require('../../assets/images/whoareyou/whostudent.png')} style={styles.optionImage} />
            <View style={styles.titleRow}>
              <Text style={styles.optionText1}>Learner</Text>
              <Text style={styles.optionText2}>ශිෂ්‍යයා</Text>
            </View>
          </TouchableOpacity>

          {/* Buyer Option */}
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => handleOptionSelect('Buyer')} // Save Buyer and navigate
          >
            <Image source={require('../../assets/images/whoareyou/whobuyer.png')} style={styles.optionImage} />
            <View style={styles.titleRow}>
              <Text style={styles.optionText1}>Buyer</Text>
              <Text style={styles.optionText2}>වෙළෙන්දා</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Descriptions */}
        <Text style={styles.description1}>
          Access interactive tutorials and live workshops to grow your artisan skills,
          tailored to your level and craft.
        </Text>
        <Text style={styles.description2}>
          ඔබ ශිෂ්‍යයා තෝරා ගන්නේ නම්, ඔබව අධ්‍යාපන පුවරුව වෙත හරවා යවන අතර ඔබ විකුණුම්කරු තෝරා ගන්නේ නම් ඔබ විකුණුම් පුවරුව වෙත හරවා යවයි.
        </Text>

        {/* Become a Fundraiser Button */}
        <TouchableOpacity
          style={styles.fundraiserButton}
          onPress={() => console.log('Fundraiser clicked!')} // Replace with your fundraiser navigation
        >
          <Text style={styles.fundraiserText}>Become a Fundraiser</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    backgroundColor: '#15A196',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  titleRow: {
    flexDirection: 'row', 
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    color: 'white',
    marginRight: 10, 
    fontFamily: 'Lato-Bold',
  },
  title2: {
    fontSize: 22,
    color: 'white',
    fontFamily: 'guruogomi1',
  },
  optionsContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#FFFFFF90',
    borderRadius: 10,
    width: '70%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
    marginBottom: 20, // Space between buttons
  },
  optionText1: {
    fontSize: 18,
    color: '#000',
    fontFamily: 'Lato-Regular', // Add your custom font
  },
  optionText2: {
    fontSize: 16,
    marginTop: 3,
    color: '#000',
    fontFamily: 'guruogomi1', // Add your custom font
  },
  optionImage: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  description1: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginHorizontal: 16,
    marginBottom: 20,
    fontFamily: 'Lato-Bold',
  },
  description2: {
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
    marginHorizontal: 16,
    marginBottom: 40,
    fontFamily: 'guruogomi1',
  },
  fundraiserButton: {
    position: 'absolute',
    bottom: 30,
    backgroundColor: '#FFFFFF90',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  fundraiserText: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'Lato-Bold', // Add your custom font
  },
});

export default WhoAreYouScreen;
