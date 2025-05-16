import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import React from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from '@/app/Config/firebaseconfig';

const foodItems = [
  {
    name: "Pizza",
    image: require("../../../../../assets/images/pizza.png"),
    price: 10.99,
    category: "Fast Food",
    description: "Delicious cheese pizza with tomato sauce and herbs",
  },
  {
    name: "Burger",
    image: require("../../../../../assets/images/placeholder-food.png"),
    price: 8.99,
    category: "Fast Food",
    description: "Juicy beef burger with lettuce, tomato, and cheese",
  },
  {
    name: "Biryani",
    image: require("../../../../../assets/images/biryani.png"),
    price: 12.5,
    category: "Indian",
    description: "Fragrant basmati rice with spiced chicken or lamb",
  },
  {
    name: "Chinese Noodles",
    image: require("../../../../../assets/images/chinese.png"),
    price: 9.99,
    category: "Chinese",
    description: "Stir-fried noodles with vegetables and soy sauce",
  },
  {
    name: "North Indian Thali",
    image: require("../../../../../assets/images/north-indian.png"),
    price: 11.5,
    category: "Indian",
    description: "Traditional thali with curry, rice, and naan",
  },
  {
    name: "Mexican Tacos",
    image: require("../../../../../assets/images/mexican.png"),
    price: 10.0,
    category: "Mexican",
    description: "Soft tacos filled with spiced meat and fresh vegetables",
  },
  {
    name: "Banana Smoothie",
    image: require("../../../../../assets/images/banana.png"),
    price: 4.99,
    category: "Beverages",
    description: "Creamy banana smoothie made with fresh bananas and milk",
  },
  {
    name: "Ice Creams",
    image: require("../../../../../assets/images/ice-creams.png"),
    price: 6.5,
    category: "Dessert",
    description: "Assorted ice creams with different flavors",
  },
  {
    name: "Desserts",
    image: require("../../../../../assets/images/desserts.png"),
    price: 5.99,
    category: "Dessert",
    description: "Chocolate cake, fruit tart, and more sweets",
  },
  {
    name: "Drinks",
    image: require("../../../../../assets/images/beverages.png"),
    price: 3.0,
    category: "Beverages",
    description: "Refreshing drinks including soda, juice, and water",
  },
];

const SaveFood = () => {
  const db = getFirestore(app);

  const handleUpload = async () => {
    try {
      const foodCollection = collection(db, "foodItems");

      for (const item of foodItems) {
        await addDoc(foodCollection, {
          name: item.name,
          price: item.price,
          category: item.category,
          description: item.description,
          // Lưu đường dẫn ảnh tạm (vì require không dùng được trên Firestore)
          imagePath: item.image.toString(), // hoặc chỉ lưu tên file: "pizza.png"
        });
      }

      Alert.alert("Success", "All food items uploaded!");
    } catch (error) {
      console.error("Upload failed: ", error);
      Alert.alert("Error", "Failed to upload food items.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Save Food</Text>
      <TouchableOpacity style={styles.button} onPress={handleUpload}>
        <Text style={styles.buttonText}>Upload Food Items</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SaveFood;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
