import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { getCoursesByCategory } from '../../api'; // Assuming the api.js is in the same folder
import { useNavigation } from '@react-navigation/native';
import BottomNavbar from '../Common/BottomNavbar';

const FreeCoursesPage = () => {
  const [freeCourses, setFreeCourses] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch Free Courses (replace with your actual API calls)
    getCoursesByCategory('free-courses')
      .then(setFreeCourses)
      .catch(error => console.error('Error fetching free courses:', error));
  }, []);

  // Render a single course in a grid
  const renderCourseItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('CourseDetails', { courseId: item.id })}>
      <View style={styles.gridItem}>
        <Image source={require('../../assets/images/img2.png')} style={styles.courseImage} />
        <Text style={styles.courseTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require('../../assets/images/onBoardScreens/BG4.png')} // Background image
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        {/* Page Title */}
        <Text style={styles.pageTitle}>Free Courses</Text>

        {/* Courses Grid */}
        <FlatList
          data={freeCourses}
          renderItem={renderCourseItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2} // Display courses in a grid with 2 columns
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.grid}
        />
      </View>
      <BottomNavbar navigation={navigation} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Transparent background
    marginBottom:50
  },
  pageTitle: {
    fontSize: 24,
    color: 'black',
    fontFamily: 'Lato-Bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  grid: {
    justifyContent: 'space-between',

  },
  gridItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // More solid background for readability
    borderRadius: 10,
    marginBottom: 15,
    marginRight: 10,
    width: 180, // Explicit width for uniform grid item size
    height: 250, // Explicit height for uniform grid item size
    alignItems: 'center',
    padding: 10,
    shadowColor: '#000', // Shadow for card effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Elevation for Android shadow
  },
  courseImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 10,
  },
  courseTitle: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    fontFamily: 'guruogomi1',
    marginTop:10
  },
});

export default FreeCoursesPage;
