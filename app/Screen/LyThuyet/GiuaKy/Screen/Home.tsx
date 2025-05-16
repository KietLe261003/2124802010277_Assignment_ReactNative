import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ListRenderItem,
} from "react-native";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "@/app/Config/firebaseconfig";
import { FontAwesome } from "@expo/vector-icons";
import { useAuth } from "@/app/Config/AuthContext";
import { useCart } from "@/app/Context/CartContext";
import { useNavigation, DrawerActions } from "@react-navigation/native";

export interface FoodItem {
  id: string;
  name: string;
  imagePath: string;
  price: number;
  category: string;
  description: string;
}

const Home: React.FC = () => {
  const db = getFirestore(app);
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const { logout } = useAuth();
  const { cartItems } = useCart();
  const navigation = useNavigation<any>();

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const snapshot = await getDocs(collection(db, "foodItems"));
        const items: FoodItem[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<FoodItem, "id">),
        }));
        setFoodItems(items);
      } catch (error) {
        console.error("Error fetching food items:", error);
      }
    };

    fetchFoodItems();
  }, []);

  const getImageSource = (imagePath: string) => {
    if (imagePath.includes("pizza"))
      return require("../../../../../assets/images/pizza.png");
    if (imagePath.includes("biryani"))
      return require("../../../../../assets/images/biryani.png");
    if (imagePath.includes("chinese"))
      return require("../../../../../assets/images/chinese.png");
    if (imagePath.includes("north-indian"))
      return require("../../../../../assets/images/north-indian.png");
    if (imagePath.includes("banana"))
      return require("../../../../../assets/images/banana.png");
    if (imagePath.includes("ice-creams"))
      return require("../../../../../assets/images/ice-creams.png");
    if (imagePath.includes("desserts"))
      return require("../../../../../assets/images/desserts.png");
    if (imagePath.includes("beverages"))
      return require("../../../../../assets/images/beverages.png");
    return require("../../../../../assets/images/placeholder-food.png");
  };

  const renderItem: ListRenderItem<FoodItem> = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("FoodListByCategory", {
          category: item.category,
        })
      }
    >
      <Image
        source={getImageSource(item.imagePath)}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.label}>{item.name}</Text>
      <Text style={styles.category}>{item.category}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cuisine</Text>
      <FlatList
        data={foodItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#B22222",
    alignSelf: "center",
  },
  row: {
    justifyContent: "space-between",
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    alignItems: "center",
    padding: 12,
    marginBottom: 16,
    width: "48%",
  },
  image: {
    width: 60,
    height: 60,
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  category: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#B22222",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  cartBadge: {
    backgroundColor: "#ccc",
    borderRadius: 10,
    position: "absolute",
    top: -8,
    right: 30,
    zIndex: 1,
    minWidth: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  cartCount: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
});
