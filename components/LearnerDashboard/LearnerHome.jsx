import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // For icons
import BottomNavbar from '../Common/BottomNavbar'; // Import BottomNavbar
import { getCoursesByCategory } from '../../api'; // Import API to fetch courses
import { useUser } from '../Auth/UserContext';

const LearnerHome = ({ navigation }) => {
  const { user } = useUser(); // Access user data from context
  const [freeCourses, setFreeCourses] = useState([]);
  const [paidCourses, setPaidCourses] = useState([]);

  useEffect(() => {
    if (user) {
      console.log('Current user in context:', user); // Log user data when available
    }

    // Fetch Free Courses
    getCoursesByCategory('free-courses')
      .then(setFreeCourses)
      .catch(error => console.error('Error fetching free courses:', error));

    // Fetch Paid Courses
    getCoursesByCategory('paid-courses')
      .then(setPaidCourses)
      .catch(error => console.error('Error fetching paid courses:', error));

  }, [user]);

  // Render Course Item for Free/Paid Courses (Vertical)
  const renderCourseItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('CourseDetails', { courseId: item.id })}>
      <View style={styles.verticalCourseItem}>
        <Image source={require('../../assets/images/img2.png')} style={styles.verticalCourseImage} />
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
      source={require('../../assets/images/onBoardScreens/BG3.png')}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        <View style={styles.container}>
          {/* Main Content */}
          <View style={styles.mainContentWrapper}>
            <View style={styles.mainContent}>
              <View style={styles.contentContainer}>
                {/* Profile Greeting */}
                <View style={styles.topWrapper}>
                  <View style={styles.greetingWrapper}></View>
                  {user && (
                    <Text style={styles.greetingText}>Hello, {user.firstname}</Text>
                  )}
                </View>

                {/* Sinhala Text */}
                <Text style={styles.sinhalaText}>ඔබට අවශ්‍ය පාඨමාලාව සොයන්න</Text>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                  <MaterialCommunityIcons name="magnify" size={24} color="white" style={styles.searchIcon} />
                  <TextInput
                    placeholder="Search for courses..."
                    placeholderTextColor="white"
                    style={styles.searchInput}
                  />
                </View>
              </View>

              {/* Horizontally Scrollable Cards */}
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardsContainer}>
                <View style={styles.card}>
                  <Image
                    source={require('../../assets/images/carousel.png')} // Sample image 1
                    style={styles.cardImage}
                  />
                </View>
                <View style={styles.card}>
                  <Image
                    source={require('../../assets/images/carousel.png')} // Sample image 2
                    style={styles.cardImage}
                  />
                </View>
                <View style={styles.card}>
                  <Image
                    source={require('../../assets/images/carousel.png')} // Sample image 3
                    style={styles.cardImage}
                  />
                </View>
              </ScrollView>
            </View>
          </View>

          {/* Free Courses Section */}
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

          {/* Paid Courses Section */}
          <View style={styles.paidCoursesSection}>
            <TouchableOpacity style={styles.titleContainer} onPress={() => navigation.navigate('PaidCoursesPage')}>
              <Text style={styles.mainTopic}>Events</Text>
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
        {/* Bottom Navbar */}
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
    backgroundColor: 'transparent',
  },
  scrollContentContainer: {
    paddingBottom: 20, // Add padding at the bottom to allow space for scroll
  },
  mainContentWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContent: {
    width: '95%',
  },
  contentContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Transparent white background
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 5,
    marginTop: 65,
    alignItems: 'center',
  },
  topWrapper: {
    flexDirection: 'row',
    alignItems: 'left',
  },
  greetingWrapper: {
    width: 25,
    height: 25,
    borderRadius: 25,
    backgroundColor: '#FE9BB3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  greetingText: {
    fontSize: 23,
    color: '#000',
    fontFamily: 'Lato-Bold',
  },
  sinhalaText: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 15,
    fontFamily: 'guruogomi1',
    marginTop: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: '100%',
    marginBottom: 5,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: 'black',
    fontSize: 18,
    fontFamily: 'Lato-Regular',
  },
  cardsContainer: {
    marginTop: 2,
  },
  card: {
    width: 350,
    height: 300,
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
  },
  cardImage: {
    width: '100%',
    height: 220,
    borderRadius: 10,
    marginBottom: 5,
  },
  // Free and Paid Courses
  freeCoursesSection: {
    marginTop: 5,
  },
  paidCoursesSection: {
    marginTop: 10,
    marginBottom:80
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
  verticalCourseItem: {
    flexDirection: 'row',
    width: '100%',
    height: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 10,
    marginVertical: 10,
    alignSelf: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  verticalCourseImage: {
    width: 80,
    height: '90%',
    borderRadius: 8,
    marginRight: 10,
    marginLeft: 5,
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
    right: 10,
  },
  verticalCourseList: {
    paddingLeft: 20,
    paddingRight: 20,
    width: '100%',
  },
});

export default LearnerHome;
