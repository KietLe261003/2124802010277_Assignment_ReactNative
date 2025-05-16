// app/Screen/FoodListByCategory.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "@/app/Config/firebaseconfig";
import { useRoute } from "@react-navigation/native";
import { useCart } from "@/app/Context/CartContext";

interface FoodItem {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  imagePath: string;
  quantity?: number; // 👈 Đã thêm để tương thích với CartContext
}

const getImageSource = (imagePath: string) => {
  if (imagePath.includes("pizza")) return require("@/assets/images/pizza.png");
  if (imagePath.includes("biryani")) return require("@/assets/images/biryani.png");
  if (imagePath.includes("chinese")) return require("@/assets/images/chinese.png");
  if (imagePath.includes("north-indian")) return require("@/assets/images/north-indian.png");
  if (imagePath.includes("banana")) return require("@/assets/images/banana.png");
  if (imagePath.includes("ice-creams")) return require("@/assets/images/ice-creams.png");
  if (imagePath.includes("desserts")) return require("@/assets/images/desserts.png");
  if (imagePath.includes("beverages")) return require("@/assets/images/beverages.png");
  return require("@/assets/images/placeholder-food.png");
};

const FoodListByCategory = () => {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const db = getFirestore(app);
  const route = useRoute<any>();
  const { category } = route.params;
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(collection(db, "foodItems"));
        const items = snapshot.docs
          .map((doc) => ({ id: doc.id, ...(doc.data() as FoodItem) }))
          .filter((item) => item.category.toLowerCase() === category.toLowerCase());
        setFoods(items);
      } catch (err) {
        console.error("Error fetching food:", err);
      }
    };

    fetchData();
  }, [category]);

  const renderItem = ({ item }: { item: FoodItem }) => (
    <View style={styles.card}>
      <Image source={getImageSource(item.imagePath)} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.desc}>{item.description}</Text>
      <Text style={styles.price}>Price: ${item.price.toFixed(2)}</Text>
      <TouchableOpacity style={styles.button} onPress={() => addToCart({ ...item, quantity: 1 })}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category} Dishes</Text>
      <FlatList
        data={foods}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  );
};

export default FoodListByCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#B22222",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 120,
    resizeMode: "contain",
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
  },
  desc: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 6,
    color: "green",
  },
  button: {
    backgroundColor: "#FF4500",
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
