// import React, { useState, useRef } from 'react';
// import { View, Text, ScrollView, StyleSheet, Pressable, Animated, Easing } from 'react-native';

// const Community = ({ navigation }) => {
//   const [activeTab, setActiveTab] = useState('Upcoming'); // State for tabs
//   const translateX = useRef(new Animated.Value(0)).current; // Animated value for swipe

//   // Function to trigger the swipe animation and navigate
//   const handlePostPress = () => {
//     // Start the animation (swipe left)
//     Animated.timing(translateX, {
//       toValue: -500, // Adjust this value based on screen width
//       duration: 300,
//       easing: Easing.linear,
//       useNativeDriver: true,
//     }).start(() => {
//       // After the animation completes, navigate to the Posting page
//       navigation.navigate('Posting');
//     });
//   };

//   return (
//     <View style={styles.container}>
//       {/* Tabs for Post, News, Banking, and Funding */}
//       <View style={styles.tabContainer}>
//         <Pressable
//           style={[styles.tab, activeTab === 'Post' && styles.activeTab]}
//           onPress={handlePostPress} // Call the handlePostPress function on Post click
//         >
//           <Text style={[styles.tabText, activeTab === 'Post' && styles.activeTabText]}>Post</Text>
//         </Pressable>
//         <Pressable
//           style={[styles.tab, activeTab === 'News' && styles.activeTab]}
//           onPress={() => setActiveTab('News')}
//         >
//           <Text style={[styles.tabText, activeTab === 'News' && styles.activeTabText]}>News</Text>
//         </Pressable>
//         <Pressable
//           style={[styles.tab, activeTab === 'Banking' && styles.activeTab]}
//           onPress={() => setActiveTab('Banking')}
//         >
//           <Text style={[styles.tabText, activeTab === 'Banking' && styles.activeTabText]}>Banking</Text>
//         </Pressable>
//         <Pressable
//           style={[styles.tab, activeTab === 'Funding' && styles.activeTab]}
//           onPress={() => setActiveTab('Funding')}
//         >
//           <Text style={[styles.tabText, activeTab === 'Funding' && styles.activeTabText]}>Funding</Text>
//         </Pressable>
//       </View>

//       {/* Display content based on activeTab with animated swipe */}
//       <Animated.View style={[styles.scrollViewContainer, { transform: [{ translateX }] }]}>
//         <ScrollView style={styles.scrollView}>
         
//         </ScrollView>
//       </Animated.View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#e0f8fc', // Updated to match Posting.jsx background
//     paddingHorizontal: 20, // Matching padding from Posting.jsx
//   },
//   tabContainer: {
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//     borderRadius: 25,
//     marginVertical: 20, // Margin to match Posting.jsx
//     padding: 5,
//   },
//   tab: {
//     flex: 1,
//     padding: 8,
//     alignItems: 'center',
//   },
//   activeTab: {
//     backgroundColor: '#000',
//     borderRadius: 25,
//   },
//   tabText: {
//     fontSize: 18,
//   },
//   activeTabText: {
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   scrollView: {
//     padding: 10, // Padding remains consistent
//   },
//   card: {
//     backgroundColor: '#fff',
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 20,
//     borderWidth: 1,
//     borderColor: '#ddd',
//   },
//   userName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//   },
// });

// export default Community;