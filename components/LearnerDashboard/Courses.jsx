import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, ImageBackground, ScrollView,TouchableOpacity,navigation } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Import for search icon and heart icon
import { getCoursesByCategory } from '../../api'; // Assuming the api.js is in the same folder
import { useNavigation } from '@react-navigation/native';


const sampleImage = 'https://via.placeholder.com/150'; // Sample placeholder image

const Courses = () => {
  const [trendingCourses, setTrendingCourses] = useState([]);
  const [freeCourses, setFreeCourses] = useState([]);
  const [paidCourses, setPaidCourses] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch Trending Courses (replace with your actual API calls)
    getCoursesByCategory('trending-courses')
      .then(setTrendingCourses)
      .catch(error => console.error('Error fetching trending courses:', error));

    // Fetch Free Courses
    getCoursesByCategory('free-courses')
      .then(setFreeCourses)
      .catch(error => console.error('Error fetching free courses:', error));

    // Fetch Paid Courses
    getCoursesByCategory('paid-courses')
      .then(setPaidCourses)
      .catch(error => console.error('Error fetching paid courses:', error));
  }, []);

  // Render Course Item for Trending Courses (Horizontal)
  const renderTrendingCourseItem = ({ item }) => (
    <TouchableOpacity onPress={()=>navigation.navigate('CourseDetails', { courseId: item.id })}>

    <View style={styles.horizontalCourseItem}>
      <Image source={require('../../assets/images/img1.png')} style={styles.horizontalCourseImage} />
      <Text style={styles.horizontalCourseTitle}>{item.title}</Text>
      <MaterialCommunityIcons
        name="heart-outline"
        size={24}
        color="red"
        style={styles.heartIconTrending} // Position the heart icon
      />
    </View>      
    </TouchableOpacity>
  );

  // Render Course Item for Free/Paid Courses (Vertical)
  const renderCourseItem = ({ item }) => (
    <TouchableOpacity onPress={()=>navigation.navigate('CourseDetails', { courseId: item.id })}>
    <View style={styles.verticalCourseItem}>
      <Image source={require('../../assets/images/img2.png') } style={styles.verticalCourseImage} />
      <View style={styles.courseDetailsContainer}>
        <Text style={styles.verticalCourseTitle}>{item.title}</Text>
        {item.price ? (
          <Text style={styles.verticalCoursePrice}>LKR.{item.price}</Text>
        ) : (
          <Text style={styles.verticalCoursePrice}>Free</Text>
        )}
      </View>
      <MaterialCommunityIcons
        name="heart-outline"
        size={24}
        color="red"
        style={styles.heartIconVertical} // Position the heart icon for vertical items
      />
    </View>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require('../../assets/images/onBoardScreens/BG4.png')} // Same background image as LearnerHome
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        <View style={styles.container}>
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <MaterialCommunityIcons name="magnify" size={25} color="black" style={styles.searchIcon} />
            <TextInput
              placeholder="සොයන්න..."
              placeholderTextColor="black"
              style={styles.searchInput}
            />
          </View>

          {/* Trending Courses Section (Horizontal) */}
          <View style={styles.trendingSection}>
            <TouchableOpacity style={styles.titleContainer} onPress={() => navigation.navigate('TrendingCoursesPage')}>
              <Text style={styles.mainTopic}>Trending Courses</Text>
              <MaterialCommunityIcons name="chevron-right" size={24} color="black" />
            </TouchableOpacity>
            <FlatList
              data={trendingCourses}
              renderItem={renderTrendingCourseItem}
              keyExtractor={item => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.trendingCourseList} // Ensure items don't shrink
            />
          </View>

          {/* Free Courses Section (Vertical) */}
          <View style={styles.freeCoursesSection}>
            <TouchableOpacity style={styles.titleContainer} onPress={() => navigation.navigate('FreeCoursesPage')}>
              <Text style={styles.mainTopic}>Free Courses</Text>
              <MaterialCommunityIcons name="chevron-right" size={24} color="black" />
            </TouchableOpacity>
            <FlatList
              data={freeCourses}
              renderItem={renderCourseItem}
              keyExtractor={item => item.id.toString()}
              showsVerticalScrollIndicator={false}
              style={styles.verticalCourseList}
            />
          </View>

          {/* Paid Courses Section (Vertical) */}
          <View style={styles.paidCoursesSection}>
            <TouchableOpacity style={styles.titleContainer} onPress={() => navigation.navigate('PaidCoursesPage')}>
              <Text style={styles.mainTopic}>Paid Courses</Text>
              <MaterialCommunityIcons name="chevron-right" size={24} color="black" />
            </TouchableOpacity>
            <FlatList
              data={paidCourses}
              renderItem={renderCourseItem}
              keyExtractor={item => item.id.toString()}
              showsVerticalScrollIndicator={false}
              style={styles.verticalCourseList}
            />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingBottom: 20, // Add padding at the bottom to allow space for scroll
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent', // Ensure the background image is visible
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Transparent background for the search bar
    borderRadius: 15, // Rounded corners
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginTop: 10, // Margin from the top of the page
    marginHorizontal: 20, 
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1, // Take up the remaining space
    color: 'black', // White text color for the input
    fontSize: 18,
    fontFamily: 'guruogomi1',
    marginLeft:10
  },
  mainTopic: {
    fontSize: 20, // Increase font size for the main topic
    color: 'black',
    marginBottom: 15,
    marginLeft: 20, // Align with the search bar
    fontFamily: 'Lato-Bold'
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  mainTopic: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  // Trending Courses (Horizontal)
  trendingSection: {
    marginTop: 20,
  },
  trendingCourseList: {
    paddingLeft: 20,
  },
  horizontalCourseItem: {
    width: 200, // Updated width
    height: 280, // Updated height
    marginRight: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.4)', // Transparent background
    borderRadius: 10,
    alignItems: 'center',
    position: 'relative', // To position the heart icon
  },
  horizontalCourseImage: {
    width: '100%',
    height: 180, // Adjust image height
    borderRadius: 8,
    marginBottom:2
  },
  horizontalCourseTitle: {
    fontSize: 18,
    color: 'black',
    marginTop: 5,
    textAlign: 'center',
    fontFamily: 'guruogomi1',
    padding:10
  },
  heartIconTrending: {
    position: 'absolute',
    top: 10,
    right: 10, // Top right corner of the trending course
  },
  // Free Courses (Vertical)
  freeCoursesSection: {
    marginTop: 40,
  },
  verticalCourseItem: {
    flexDirection: 'row',
    width: '100%',
    height: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 10,
    marginVertical: 10,
    alignSelf: 'center',
    alignItems: 'center',
    position: 'relative', // To position the heart icon
  },
  verticalCourseImage: {
    width: 80,
    height: '90%',
    borderRadius: 8,
    marginRight: 10,
    marginLeft:5
  },
  courseDetailsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  verticalCourseTitle: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'guruogomi1',
  },
  verticalCoursePrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'green',
    marginTop: 5,
  },
  heartIconVertical: {
    position: 'absolute',
    right: 10, // Middle right of the vertical courses
  },
  verticalCourseList: {
    marginBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    width: '100%',
  },
  // Paid Courses (Vertical)
  paidCoursesSection: {
    marginTop: 20,
  },
});

export default Courses;
