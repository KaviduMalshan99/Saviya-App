import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';

const categories = [
  { id: 1, name: 'මැටි බඳුන්', subcategories: ['Vases', 'Bowls', 'Mugs', 'Decorative Items'] },
  { id: 2, name: 'චට්නි', subcategories: ['Spicy', 'Sweet', 'Mixed'] },
  { id: 3, name: 'හතු', subcategories: ['Edible', 'Medicinal', 'Decorative'] },
  { id: 4, name: 'මල් පැල', subcategories: ['Indoor Plants', 'Outdoor Plants', 'Succulents'] },
  { id: 5, name: 'හදුන් කූරු', subcategories: ['Sandalwood', 'Agarwood', 'Mixed Scents'] },
  { id: 6, name: 'කඩදාසි නිෂ්පාදන', subcategories: ['Gift Wrapping', 'Packaging', 'Stationery'] },
];

const AddProductPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [mainImages, setMainImages] = useState([]);
  const [colorImages, setColorImages] = useState({});
  const [selectedColor, setSelectedColor] = useState('');

  // Function to handle image picking
  const pickImage = async (type) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (type === 'main') {
        setMainImages([...mainImages, result.assets[0].uri]); // Fixed uri access
      } else {
        setColorImages({ ...colorImages, [selectedColor]: result.assets[0].uri }); // Fixed uri access
      }
    }
  };

  const saveProduct = async () => {
    const productData = {
      category: selectedCategory,
      subcategory: selectedSubcategory,
      product_id: productId,
      product_name: productName,
      stock_quantity: stockQuantity,
      price: price,
      description: description,
      main_images: mainImages,
      color_images: colorImages,
    };
  
    try {
      const response = await fetch('http://localhost/product_app/save_product.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  // Ensure JSON content type
        },
        body: JSON.stringify(productData),  // Convert product data to JSON string
      });
      const result = await response.text();
      alert(result); // Show success or error message
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Error saving product");
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Page Title */}
        <Text style={styles.pageTitle}>නිෂ්පාදන එකතු කරන්න</Text>

        {/* Category Selection */}
        <Text style={styles.label}>නිෂ්පාදන කාණ්ඩ</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedCategory}
            style={styles.picker}
            onValueChange={(itemValue) => {
              setSelectedCategory(itemValue);
              setSelectedSubcategory('');
            }}
          >
            <Picker.Item label="කාණ්ඩයක් තෝරන්න" value="" />
            {categories.map((category) => (
              <Picker.Item key={category.id} label={category.name} value={category.name} />
            ))}
          </Picker>
        </View>

        {/* Subcategory Selection */}
        {selectedCategory !== '' && (
          <>
            <Text style={styles.label}>උපකාණ්ඩ තෝරන්න</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedSubcategory}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedSubcategory(itemValue)}
              >
                <Picker.Item label="උපකාණ්ඩයක් තෝරන්න" value="" />
                {categories
                  .find((category) => category.name === selectedCategory)
                  ?.subcategories.map((subcategory, index) => (
                    <Picker.Item key={index} label={subcategory} value={subcategory} />
                  ))}
              </Picker>
            </View>
          </>
        )}

        {/* Product ID */}
        <Text style={styles.label}>නිෂ්පාදන හැඳුනුම් අංකය</Text>
        <TextInput
          style={styles.input}
          placeholder="නිෂ්පාදන හැඳුනුම් අංකය ඇතුළත් කරන්න"
          value={productId}
          onChangeText={setProductId}
        />

        {/* Product Name */}
        <Text style={styles.label}>නිෂ්පාදන නාමය</Text>
        <TextInput
          style={styles.input}
          placeholder="නිෂ්පාදන නාමය ඇතුළත් කරන්න"
          value={productName}
          onChangeText={setProductName}
        />

        {/* Stock Quantity */}
        <Text style={styles.label}>ගබඩා ප්‍රමාණය</Text>
        <TextInput
          style={styles.input}
          placeholder="ගබඩා ප්‍රමාණය ඇතුළත් කරන්න"
          keyboardType="numeric"
          value={stockQuantity}
          onChangeText={setStockQuantity}
        />

        {/* Color Selection */}
        <Text style={styles.label}>වර්ණය</Text>
        <TextInput
          style={styles.input}
          placeholder="වර්ණය ඇතුළත් කරන්න (e.g., රතු, නිල්)"
          value={selectedColor}
          onChangeText={setSelectedColor}
        />
        <TouchableOpacity style={styles.addImageButton} onPress={() => pickImage('color')}>
          <Ionicons name="image" size={20} color="#000" />
          <Text style={styles.addImageText}>{selectedColor} සඳහා රූපයක් එකතු කරන්න</Text>
        </TouchableOpacity>

        {/* Price */}
        <Text style={styles.label}>මිල</Text>
        <TextInput
          style={styles.input}
          placeholder="නිෂ්පාදන මිල ඇතුළත් කරන්න"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />

        {/* Description */}
        <Text style={styles.label}>විස්තරය</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="නිෂ්පාදනය පිළිබඳ විස්තර ඇතුළත් කරන්න"
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
        />

        {/* Main Images */}
        <Text style={styles.label}>ප්‍රධාන රූප</Text>
        <TouchableOpacity style={styles.addImageButton} onPress={() => pickImage('main')}>
          <Ionicons name="image" size={20} color="#000" />
          <Text style={styles.addImageText}>ප්‍රධාන රූපයක් එකතු කරන්න</Text>
        </TouchableOpacity>

        {/* Show selected main images */}
        <View style={styles.imagePreviewContainer}>
          {mainImages.map((imageUri, index) => (
            <Image key={index} source={{ uri: imageUri }} style={styles.imagePreview} />
          ))}
        </View>

        {/* Show selected color images */}
        <Text style={styles.label}>තෝරාගත් වර්ණ සහ රූප</Text>
        <View style={styles.imagePreviewContainer}>
          {Object.entries(colorImages).map(([color, imageUri]) => (
            <View key={color} style={styles.colorImageContainer}>
              <Text>{color}</Text>
              <Image source={{ uri: imageUri }} style={styles.imagePreview} />
            </View>
          ))}
        </View>

        {/* Save Button */}
        <View style={styles.buttonContainer}>
          <Button title="Save Product" onPress={saveProduct} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    padding: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Gurulugomi',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: 'Lato-Regular',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    marginBottom: 20,
    borderRadius: 5,
    elevation: 2,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    fontFamily: 'Lato-Regular',
  },
  textArea: {
    height: 100,
  },
  addImageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  addImageText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
    fontFamily: 'Lato-Regular',
  },
  imagePreviewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 10,
  },
  colorImageContainer: {
    alignItems: 'center',
    marginRight: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default AddProductPage;
