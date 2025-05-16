import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useAuth } from "@/app/Config/AuthContext";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { app } from "@/app/Config/firebaseconfig";

// Định nghĩa type cho đơn hàng
type Order = {
  id: string;
  userId: string;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  itemsTotal: number;
  tax: number;
  deliveryCharges: number;
  discount: number;
  totalPay: number;
  createdAt: Timestamp;
  status?: string;
};

const UserInfoScreen = () => {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  const db = getFirestore(app);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      try {
        const q = query(
          collection(db, "transactions")
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Order, "id">),
        }));
        const filteredData = data.filter((item) => item.userId === user.uid);
        setOrders(filteredData);
      } catch (error) {
        console.error("Lỗi khi tải đơn hàng:", error);
      }
    };

    fetchOrders();
  }, [user]);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Chưa đăng nhập</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Thông tin khách hàng</Text>
      <Text>Họ tên: {user.name}</Text>
      <Text>Email: {user.email}</Text>

      <View style={{ marginTop: 16 }}>
        <Button title="Đăng xuất" onPress={logout} color="red" />
      </View>

      <Text style={styles.subtitle}>Lịch sử giao dịch:</Text>
      {orders.length === 0 ? (
        <Text>Bạn chưa có đơn hàng nào.</Text>
      ) : (
        orders.map((order) => (
          <View key={order.id} style={styles.orderBox}>
            <Text style={styles.orderText}>🧾 Mã đơn: {order.id}</Text>
            <Text style={styles.orderText}>
              Tổng tiền: ₹ {order.totalPay.toFixed(2)}
            </Text>
            <Text style={styles.orderText}>
              Ngày tạo: {order.createdAt.toDate().toLocaleString("vi-VN")}
            </Text>
            <Text style={styles.orderText}>
              Trạng thái: {order.status || "Đã thanh toán"}
            </Text>
          </View>
        ))
      )}
    </ScrollView>
  );
};

export default UserInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 12,
  },
  subtitle: {
    marginTop: 24,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  orderBox: {
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  orderText: {
    fontSize: 14,
    marginBottom: 4,
  },
});
