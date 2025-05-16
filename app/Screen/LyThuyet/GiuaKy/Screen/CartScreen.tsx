import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useCart } from "@/app/Context/CartContext";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { app } from "@/app/Config/firebaseconfig";
import { useAuth } from "@/app/Config/AuthContext";

const TAX_RATE = 0.08;
const DELIVERY_CHARGES = 30;
const DISCOUNT = 18;

const CartScreen = () => {
  const { cartItems, increaseQty, decreaseQty, removeFromCart, clearCart } =
    useCart();
  const navigation = useNavigation();
  const db = getFirestore(app);
  const { user } = useAuth();

  // Tính toán tổng tiền
  const itemsTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = itemsTotal * TAX_RATE;
  const totalPay =
    cartItems.length === 0 ? 0 : itemsTotal + tax + DELIVERY_CHARGES - DISCOUNT;

  const renderItem = ({ item }: any) => (
    <View style={styles.itemRow}>
      <Text style={styles.itemName}>{item.name}</Text>
      <View style={styles.qtyBox}>
        <TouchableOpacity onPress={() => decreaseQty(item.id)}>
          <Text style={styles.qtyBtn}>−</Text>
        </TouchableOpacity>
        <Text style={styles.qtyText}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => increaseQty(item.id)}>
          <Text style={styles.qtyBtn}>＋</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.itemPrice}>₹ {item.price * item.quantity}</Text>
      <TouchableOpacity onPress={() => removeFromCart(item.id)}>
        <FontAwesome
          name="trash"
          size={20}
          color="red"
          style={{ marginLeft: 10 }}
        />
      </TouchableOpacity>
    </View>
  );
  const handleProceedToPay = async () => {
    if (cartItems.length === 0) return;

    const transactionData = {
      userId: user.uid,
      items: cartItems,
      itemsTotal,
      tax: parseFloat(tax.toFixed(2)),
      deliveryCharges: DELIVERY_CHARGES,
      discount: DISCOUNT,
      totalPay: parseFloat(totalPay.toFixed(2)),
      createdAt: Timestamp.now(),
    };

    try {
      await addDoc(collection(db, "transactions"), transactionData);
      clearCart();
      navigation.navigate("PaymentSuccess");
    } catch (error) {
      console.error("Lỗi khi lưu transaction:", error);
      // Bạn có thể hiển thị Toast hoặc Alert ở đây
    }
  };

  return (
    <View style={styles.container}>

      {cartItems.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>Giỏ hàng của bạn đang trống.</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
          />

          <View style={styles.billContainer}>
            <Text style={styles.billTitle}>Bill Receipt</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Items Total</Text>
              <Text>₹ {itemsTotal.toFixed(2)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Offer Discount</Text>
              <Text>- ₹ {DISCOUNT}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Taxes (8%)</Text>
              <Text>₹ {tax.toFixed(2)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Delivery Charges</Text>
              <Text>₹ {DELIVERY_CHARGES}</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.row}>
              <Text style={styles.totalText}>Total Pay</Text>
              <Text style={styles.totalText}>₹ {totalPay.toFixed(2)}</Text>
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerTotal}>₹ {totalPay.toFixed(2)}</Text>
            <TouchableOpacity
              style={styles.payButton}
              onPress={handleProceedToPay}
            >
              <Text style={styles.payText}>Proceed To Pay</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default CartScreen;

// Styles giữ nguyên
const styles = StyleSheet.create({
  // ... (giữ nguyên phần styles của bạn)
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    paddingBottom: 60
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    color: "red",
    marginBottom: 16,
  },
  list: {
    paddingBottom: 20,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
    paddingVertical: 10,
    borderColor: "#ccc",
  },
  itemName: {
    flex: 1,
    fontWeight: "500",
    color: "#B22222",
  },
  qtyBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#aaa",
    borderRadius: 6,
    marginHorizontal: 10,
  },
  qtyBtn: {
    paddingHorizontal: 10,
    fontSize: 18,
    color: "#333",
  },
  qtyText: {
    paddingHorizontal: 8,
    fontSize: 16,
    fontWeight: "600",
  },
  itemPrice: {
    width: 60,
    textAlign: "right",
  },
  billContainer: {
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  billTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
    color: "#333",
  },
  totalText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#eee",
    padding: 12,
    marginTop: 16,
    borderRadius: 10,
  },
  footerTotal: {
    color: "#d60000",
    fontWeight: "bold",
    fontSize: 18,
  },
  payButton: {
    backgroundColor: "green",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  payText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  emptyBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    fontStyle: "italic",
  },
});
