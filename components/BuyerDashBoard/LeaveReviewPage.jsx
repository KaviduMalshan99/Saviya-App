import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import Header from './Header'; // Assume Header component exists
import { Rating } from 'react-native-ratings'; // Optional library for star ratings

const LeaveReviewPage = ({ route, navigation }) => {
  const { productName, productImage } = route.params; // Receive product details from OrderHistoryPage
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const submitReview = async () => {
    if (rating === 0) {
      Alert.alert('Error', 'Please select a rating.');
      return;
    }

    // Send review to the backend (PHP)
    try {
      const response = await fetch('http://192.168.1.6/product_app/save_review.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          product_name: productName,
          stars: rating,
          comment: comment,
        }).toString(),
      });

      const result = await response.json();
      if (result.status === 'success') {
        Alert.alert('Success', 'Your review has been submitted.');
        navigation.goBack(); // Go back to the order history page
      } else {
        Alert.alert('Error', result.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to submit the review. ' + error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Leave a Review" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: productImage }} style={styles.productImage} />
        </View>

        <Text style={styles.titleText}>Please rate the quality of service for the order!</Text>

        {/* Star rating system */}
        <View style={styles.starContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => setRating(star)}>
              <Text style={rating >= star ? styles.starSelected : styles.star}>★</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.subText}>Your comments and suggestions help us improve the service quality better!</Text>

        {/* Comment input */}
        <View style={styles.commentSection}>
          <Text style={styles.commentLabel}>COMMENT</Text>
          <TextInput
            style={styles.commentInput}
            placeholder="Enter your comment"
            value={comment}
            onChangeText={(text) => setComment(text)}
            multiline={true}
          />
        </View>

        {/* Submit button */}
        <TouchableOpacity style={styles.submitButton} onPress={submitReview}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  star: {
    fontSize: 40,
    color: '#ddd',
  },
  starSelected: {
    fontSize: 40,
    color: '#FFD700',
  },
  subText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 20,
  },
  commentSection: {
    marginBottom: 20,
  },
  commentLabel: {
    fontSize: 16,
    marginBottom: 10,
    color: '#555',
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    height: 80,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LeaveReviewPage;
