import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Book, ResponseApiBook } from "@/app/Type/BookType";
import { BookService } from "@/app/Service/BookService";
import { Ionicons } from "@expo/vector-icons";
import { KEY_IMAGEURL } from "@/env";
import { useNavigation } from "expo-router";
import { useAuth } from "@/app/Context/AuthContext";
const ImageURL = KEY_IMAGEURL;
const BookScreen = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const navigation = useNavigation<any>();
  const {logout}=useAuth();

  const getAllBook = async () => {
    try {
      const response: ResponseApiBook = await BookService.getAllBook();
      setBooks(response.data);
    } catch (error) {
      console.log("Lỗi nek: ", error);
    }
  };

  useEffect(() => {
    getAllBook();
  }, []);
  const renderItem = ({ item }: { item: Book }) => (
  <TouchableOpacity
    style={styles.cardRow}
    onPress={() => navigation.navigate("BookDetail", { book: item })}
  >
    {/* Ảnh */}
    <Image
      source={{ uri: ImageURL + item.imageUrl[0] }}
      style={styles.cardImage}
    />

    {/* Nội dung bên phải */}
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDesc} numberOfLines={2}>
        {item.description || "This is a short description of the book."}
      </Text>

      {/* Khoảng cách + rating */}
      <View style={styles.cardMeta}>
        <Text style={styles.distance}>{item.numberOfPage} page</Text>
        <Ionicons name="star" size={14} color="green" />
        <Text style={styles.reviews}>{item.rating} reviews</Text>
      </View>

      {/* Nút */}
      <TouchableOpacity style={styles.bookButton}>
        <Text style={styles.bookButtonText}>Read Book</Text>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Good Morning</Text>
        <Text style={styles.username}>Username</Text>
        <TouchableOpacity style={styles.pointBox}>
          <Text style={styles.pointText}>+ 200 point</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bookButton} onPress={()=>{logout()}}>
        <Text style={styles.bookButtonText}>Logout</Text>
      </TouchableOpacity>
      </View>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionBtn}>
          <Text style={styles.actionText}>Claim</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Text style={styles.actionText}>Get Point</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Text style={styles.actionText}>My Card</Text>
        </TouchableOpacity>
      </View>

      {/* Book List */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.bookScroll}
      >
        {books.map((item, index) => (
          <View key={index} style={styles.bookCard}>
            <Image
              source={{ uri: ImageURL + item.imageUrl[0] }}
              style={styles.bookImage}
            />
            <Text numberOfLines={1} style={styles.bookTitle}>
              {item.title}
            </Text>
            <View style={styles.bookInfo}>
              <Ionicons name="time-outline" size={14} color="#999" />
              <Text style={styles.infoText}>3d 5h</Text>
              <Ionicons
                name="bar-chart-outline"
                size={14}
                color="#999"
                style={{ marginLeft: 10 }}
              />
              <Text style={styles.infoText}>75%</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Tabs (Dummy UI) */}
      <View style={styles.tabBar}>
        <Text style={styles.tabActive}>Best Seller</Text>
        <Text style={styles.tabInactive}>The Latest</Text>
        <Text style={styles.tabInactive}>Coming Soon</Text>
      </View>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        // horizontal không cần nữa
        showsVerticalScrollIndicator={false} // nếu muốn ẩn thanh cuộn dọc
      />
    </ScrollView>
  );
};

export default BookScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  greeting: {
    color: "#fff",
    fontSize: 16,
  },
  username: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  pointBox: {
    marginTop: 8,
    backgroundColor: "#FF6B00",
    alignSelf: "flex-start",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  pointText: {
    color: "#fff",
    fontWeight: "600",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  actionBtn: {
    backgroundColor: "#222",
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  actionText: {
    color: "#fff",
  },
  bookScroll: {
    marginBottom: 20,
  },
  bookCard: {
    width: 120,
    marginRight: 12,
  },
  bookImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 6,
  },
  bookTitle: {
    color: "#fff",
    fontWeight: "600",
  },
  bookInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  infoText: {
    color: "#ccc",
    marginLeft: 4,
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    paddingBottom: 20,
  },
  tabActive: {
    color: "#fff",
    fontWeight: "bold",
    borderBottomColor: "#FF6B00",
    borderBottomWidth: 2,
    paddingBottom: 4,
  },
  tabInactive: {
    color: "#888",
  },
  card: {
    marginRight: 12,
    backgroundColor: "#222",
    borderRadius: 10,
    padding: 8,
  },
  image: { width: "100%", height: 120, borderRadius: 10 },
  title: { color: "#fff", marginTop: 8, fontWeight: "bold" },
  info: { color: "#aaa", fontSize: 12 },
  cardRow: {
  flexDirection: "row",
  backgroundColor: "#fff",
  borderRadius: 10,
  marginBottom: 16,
  overflow: "hidden",
  shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 2,
},
cardImage: {
  width: 120,
  height: "100%",
},
cardContent: {
  flex: 1,
  padding: 12,
  justifyContent: "space-between",
},
cardTitle: {
  fontSize: 16,
  fontWeight: "bold",
  marginBottom: 4,
  color: "#000",
},
cardDesc: {
  color: "#555",
  fontSize: 13,
  marginBottom: 8,
},
cardMeta: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 8,
},
distance: {
  fontWeight: "bold",
  marginRight: 8,
  color: "#333",
},
reviews: {
  color: "#666",
  marginLeft: 4,
},
bookButton: {
  backgroundColor: "#7b2ff7",
  paddingVertical: 6,
  paddingHorizontal: 12,
  borderRadius: 8,
  alignSelf: "flex-start",
},
bookButtonText: {
  color: "#fff",
  fontWeight: "bold",
},

});
