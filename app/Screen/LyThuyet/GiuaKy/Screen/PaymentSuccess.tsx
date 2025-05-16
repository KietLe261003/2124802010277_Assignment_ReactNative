import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useCart } from "@/app/Context/CartContext";
import { useNavigation } from "@react-navigation/native";

const PaymentSuccess = () => {
  const { clearCart } = useCart();
  const navigation = useNavigation();

  useEffect(() => {
    // Xóa giỏ hàng khi vào màn hình này
    clearCart();
  }, []);

  const handleGoHome = () => {
    navigation.navigate("Home"); // hoặc tên màn hình bạn muốn quay về
  };

  return (
    <View style={styles.container}>
      <Text style={styles.successText}>🎉 Thanh toán thành công!</Text>
      <Text style={styles.msg}>
        Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đang được xử lý.
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleGoHome}>
        <Text style={styles.buttonText}>Quay về trang chính</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  successText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "green",
    marginBottom: 20,
  },
  msg: {
    fontSize: 16,
    color: "#444",
    textAlign: "center",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "green",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
