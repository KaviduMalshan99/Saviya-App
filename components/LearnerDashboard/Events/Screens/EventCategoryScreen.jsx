// import React, { useState } from "react";
// import { View, Text, StyleSheet, Image, Pressable, ScrollView } from "react-native";

// const categories = [
//   { id: 1, title: "Pottery", image: "https://example.com/pottery-image.jpg" },
//   { id: 2, title: "Laundry Soap", image: "https://example.com/soap-image.jpg" },
//   { id: 3, title: "Footwear", image: "https://example.com/footwear-image.jpg" },
//   { id: 4, title: "Curd", image: "https://example.com/curd-image.jpg" },
//   // Add more categories as needed
// ];

// const EventCategoryScreen = () => {
//   const [selectedCategories, setSelectedCategories] = useState([]);

//   const toggleCategorySelection = (id) => {
//     if (selectedCategories.includes(id)) {
//       setSelectedCategories(selectedCategories.filter((categoryId) => categoryId !== id));
//     } else {
//       setSelectedCategories([...selectedCategories, id]);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Choose Your Event Category</Text>
//       <Text style={styles.subtitle}>
//         Choose your favorite interest to get new shows all in one place.
//       </Text>

//       <View style={styles.categoriesContainer}>
//         {categories.map((category) => (
//           <Pressable
//             key={category.id}
//             style={[
//               styles.categoryCard,
//               selectedCategories.includes(category.id) && styles.selectedCard,
//             ]}
//             onPress={() => toggleCategorySelection(category.id)}
//           >
//             <Image source={{ uri: category.image }} style={styles.categoryImage} />
//             <Text style={styles.categoryTitle}>{category.title}</Text>
//             {selectedCategories.includes(category.id) && (
//               <Ionicons name="checkmark-circle" size={24} color="green" style={styles.checkIcon} />
//             )}
//           </Pressable>
//         ))}
//       </View>

//       <Pressable style={styles.selectButton}>
//         <Text style={styles.selectButtonText}>Select</Text>
//       </Pressable>
//     </ScrollView>
//   );
// };

// export default EventCategoryScreen;

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     alignItems: "center",
//     padding: 16,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "bold",
//     marginVertical: 16,
//   },
//   subtitle: {
//     fontSize: 14,
//     color: "#777",
//     textAlign: "center",
//     marginBottom: 20,
//   },
//   categoriesContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "center",
//   },
//   categoryCard: {
//     width: 150,
//     height: 150,
//     margin: 10,
//     borderRadius: 8,
//     overflow: "hidden",
//     backgroundColor: "#FFF",
//     alignItems: "center",
//     justifyContent: "center",
//     elevation: 4,
//   },
//   selectedCard: {
//     borderColor: "green",
//     borderWidth: 2,
//   },
//   categoryImage: {
//     width: "100%",
//     height: 100,
//     borderRadius: 8,
//   },
//   categoryTitle: {
//     fontSize: 16,
//     marginTop: 8,
//   },
//   checkIcon: {
//     position: "absolute",
//     top: 8,
//     right: 8,
//   },
//   selectButton: {
//     backgroundColor: "black",
//     padding: 16,
//     borderRadius: 8,
//     marginTop: 20,
//   },
//   selectButtonText: {
//     color: "white",
//     fontSize: 18,
//   },
// });
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Pressable, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

const EventCategoryScreen = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]); // Store categories from the server

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://172.20.10.2/event-api/get_categories.php'); // Replace with your server IP or URL
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const navigateToDetails = (category) => {
    // Navigate to CategoryDetailsScreen and pass the selected category, including the image URL
    navigation.navigate("CategoryDetailsScreen", {
      category: {
        ...category,
        image: category.image_url, // Ensure the image URL is passed correctly
      },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Choose Your Event Category</Text>
      <Text style={styles.subtitle}>Choose your favorite interest to get new shows all in one place.</Text>

      <View style={styles.categoriesContainer}>
        {categories.map((category) => (
          <Pressable
            key={category.id}
            style={styles.categoryCard}
            onPress={() => navigateToDetails(category)}
          >
            <Image source={{ uri: category.image_url }} style={styles.categoryImage} />
            <Text style={styles.categoryTitle}>{category.title}</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

export default EventCategoryScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 16,
  },
  subtitle: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
    marginBottom: 20,
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  categoryCard: {
    width: 150,
    height: 150,
    margin: 10,
    borderRadius: 8,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
  categoryImage: {
    width: "100%",
    height: 115,
    borderRadius: 8,
  },
  categoryTitle: {
    fontSize: 16,
    marginTop: 8,
  },
});
