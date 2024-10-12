import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getCourseById, getCourseSections, getSubSectionsBySectionId } from '../../api';

const CourseDetails = () => {
  const route = useRoute();
  const { courseId } = route.params;
  const navigation = useNavigation();

  const [activeTab, setActiveTab] = useState('description');
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sections, setSections] = useState([]);
  const [activeSection, setActiveSection] = useState(null); // Keep track of the active section
  const [subSections, setSubSections] = useState({}); // Store subsections for each section

  useEffect(() => {
    // Fetch course details
    getCourseById(courseId)
      .then((data) => {
        setCourse(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching course details:', error);
        setLoading(false);
      });

    // Fetch course sections
    getCourseSections(courseId)
      .then((data) => {
        setSections(data);
      })
      .catch((error) => {
        console.error('Error fetching course sections:', error);
      });
  }, [courseId]);

  const fetchSubSections = (sectionId) => {
    // Fetch subsections for the clicked section
    getSubSectionsBySectionId(sectionId)
      .then((data) => {
        setSubSections((prevSubSections) => ({
          ...prevSubSections,
          [sectionId]: data, // Store subsections for the corresponding section
        }));
      })
      .catch((error) => {
        console.error('Error fetching subsections:', error);
      });
  };

  const toggleSection = (sectionId) => {
    // Toggle visibility of the subsection when a section is clicked
    if (activeSection === sectionId) {
      setActiveSection(null); // Collapse if the same section is clicked again
    } else {
      setActiveSection(sectionId);
      if (!subSections[sectionId]) {
        fetchSubSections(sectionId); // Fetch subsections only if they are not already fetched
      }
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />;
  }

  if (!course) {
    return <Text style={styles.errorText}>Error fetching course details. Please try again later.</Text>;
  }

  const handleContentClick = (content) => {
    // Navigate to the content description page
    navigation.navigate('ContentDetails', { content }); // Pass the content data to the new page
  };

  const handleButtonPress = () => {
    if (course.price === null || course.price === 0) {
      setActiveTab('lessons');
    } else {
      navigation.navigate('PaymentPage', { courseId: course.id });
    }
  };

  const handleCompletionClick = () => {
    // Navigate to the congratulations page
    navigation.navigate('CongratulationsPage');
  };

  return (
    <View style={styles.container}>
      {/* Course Image and Details */}
      <ImageBackground source={require('../../assets/images/onBoardScreens/BG7.png')} style={styles.imageBackground}>
        <View style={styles.overlay}>
          <Text style={styles.courseTitle}>{course.title}</Text>
          <View style={styles.courseInfo}>
            <View style={styles.ratingContainer}>
              <MaterialCommunityIcons name="star" size={20} color="gold" />
              <MaterialCommunityIcons name="star" size={20} color="gold" />
              <MaterialCommunityIcons name="star" size={20} color="gold" />
              <MaterialCommunityIcons name="star" size={20} color="gold" />
              <Text style={styles.ratingText}>{course.rating} ({course.ratingCount} 4.3)</Text>
            </View>
            <Text style={styles.infoText}>Lessons: 15</Text>
            <Text style={styles.infoText}>Author: Saviya App</Text>
            <Text style={styles.infoText}>Certificate of Completion</Text>
          </View>
        </View>
      </ImageBackground>

      {/* Tab Navigation */}
      <ImageBackground source={require('../../assets/images/onBoardScreens/BG6.png')} style={styles.contentBackgroundImage}>
        <View style={styles.tabContainer}>
          <TouchableOpacity style={styles.tabButton} onPress={() => setActiveTab('description')}>
            <Text style={[styles.tabText, activeTab === 'description' && styles.activeTabText]}>Description</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabButton} onPress={() => setActiveTab('lessons')}>
            <Text style={[styles.tabText, activeTab === 'lessons' && styles.activeTabText]}>Lessons</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabButton} onPress={() => setActiveTab('reviews')}>
            <Text style={[styles.tabText, activeTab === 'reviews' && styles.activeTabText]}>Reviews</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      {/* Content Section */}
      
      <ScrollView>
        <ImageBackground source={require('../../assets/images/onBoardScreens/BG6.png')} style={styles.contentBackgroundImage}>
        <View style={styles.contentContainer}>
          {activeTab === 'description' && (
            <>
              <Text style={styles.contentText}>{course.description}</Text>
              <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
                <Text style={styles.buttonText}>
                  {course.price === null || course.price === 0 ? 'Start Course' : 'Buy this Course'}
                </Text>
              </TouchableOpacity>
            </>
          )}
          {activeTab === 'lessons' && (
              <>
                {sections.map((section, index) => (
                  <View key={section.id} style={styles.lessonItem}>
                    <TouchableOpacity onPress={() => toggleSection(section.id)}>
                      <View style={styles.lessonTitle}>
                        <View style={styles.circle}>
                          <Text style={styles.circleText}>{index + 1}</Text>
                        </View>
                        <Text style={styles.lessonText}>{section.title}</Text>
                      </View>
                    </TouchableOpacity>

                    {/* Display subsections if the section is active */}
                    {activeSection === section.id && subSections[section.id] && (
                      <View style={styles.subSectionContainer}>
                        {subSections[section.id].map((subSection) => (
                          <TouchableOpacity key={subSection.id} onPress={() => handleContentClick(subSection)}>
                            <View style={styles.subSectionItem}>
                              <Text style={styles.subSectionText}>- {subSection.title}</Text>
                            </View>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                  </View>
                ))}

                {/* Display "නිමාව" only at the end of the last section */}
                {sections.length > 0 && (
                  <TouchableOpacity onPress={handleCompletionClick}>
                    <View style={styles.completionItem}>
                      <Text style={styles.completionText}>නිමාව</Text>
                    </View>
                  </TouchableOpacity>
                )}
              </>
            )}
          {activeTab === 'reviews' && <Text style={styles.contentText}>{course.reviews}</Text>}
        </View>
      </ImageBackground>
      </ScrollView>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  courseTitle: {
    color: 'white',
    fontSize: 27,
    fontFamily: 'guruogomi1',
    marginBottom: 10,
  },
  courseInfo: {
    alignItems: 'left',
    marginLeft:-200
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 1,
    marginTop: 30,
  },
  ratingText: {
    color: 'white',
    marginLeft: 5,
    fontFamily: 'Lato-Bold',
    
  },
  infoText: {
    color: 'white',
    marginTop: 7,
    fontFamily: 'Lato-Bold',
    textAlign:'left'
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tabButton: {
    paddingVertical: 10,
  },
  tabText: {
    fontSize: 16,
    color: 'gray',
  },
  activeTabText: {
    color: 'black',
    fontFamily: 'Lato-Bold',
    borderBottomWidth: 2,
    borderBottomColor: 'black',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  contentText: {
    fontSize: 20,
    lineHeight: 35,
    fontFamily: 'guruogomi1',
    textAlign:'center'
  },
  button: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Lato-Bold',
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lessonItem: {
    marginBottom: 10,
  },
  lessonTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: '#ccc',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    padding: 10,
    height:85
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#1289A5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  circleText: {
    color: 'white',
    fontWeight: 'bold',
    
  },
  lessonText: {
    fontSize: 17,
    color: '#000',
    fontFamily: 'guruogomi1',
    marginRight:25,
  },
  subSectionContainer: {
    paddingLeft: 50,
    marginTop: 5,
  },
  subSectionItem: {
    marginBottom: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
    padding: 10,
  },
  subSectionText: {
    fontSize: 16,
    color: '#555',
    fontFamily: 'guruogomi1',
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    marginTop: 20,
  },
  completionItem:{
    backgroundColor:'black',
    borderRadius:10,
    height:60,
    marginTop:10
  },
  completionText:{
    color:'white',
    textAlign:'center',
    marginTop:13,
    fontSize:25,
    fontFamily: 'guruogomi1',
  }
});

export default CourseDetails;
