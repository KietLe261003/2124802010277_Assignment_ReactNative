import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { app } from "@/app/Config/firebaseconfig";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";

const db = getFirestore(app);
const auth = getAuth(app);

const EditService = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { idService } = route.params;

  const [serviceName, setServiceName] = useState("");
  const [price, setPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch existing service info
  useEffect(() => {
    const fetchService = async () => {
      try {
        const serviceRef = doc(db, "services", idService);
        const serviceSnap = await getDoc(serviceRef);

        if (serviceSnap.exists()) {
          const data = serviceSnap.data();
          setServiceName(data.name);
          setPrice(data.price.toString());
        } else {
          Alert.alert("Không tìm thấy dịch vụ.");
        }
      } catch (error: any) {
        console.error(error);
        Alert.alert("Lỗi khi tải dịch vụ:", error.message);
      }
    };

    fetchService();
  }, [idService]);

  const handleUpdateService = async () => {
    if (!serviceName.trim() || !price) {
      Alert.alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    setIsLoading(true);
    try {
      const user = auth.currentUser;
      const displayName = user?.displayName || user?.email || "Unknown";
      const userInfo = await getDoc(doc(db, "users", user?.uid || ""));

      await updateDoc(doc(db, "services", idService), {
        name: serviceName.trim(),
        price: parseFloat(price),
        updateAt: new Date(),
        updatedBy: userInfo.data()?.name || displayName,
      });

      Alert.alert("Cập nhật dịch vụ thành công!");
      navigation.navigate("BottomTab");
    } catch (error: any) {
      console.error(error);
      Alert.alert("Lỗi khi cập nhật dịch vụ:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tên dịch vụ *</Text>
      <TextInput
        placeholder="Nhập tên dịch vụ"
        value={serviceName}
        onChangeText={setServiceName}
        style={styles.input}
      />

      <Text style={styles.label}>Giá *</Text>
      <TextInput
        placeholder="0"
        value={price}
        onChangeText={setPrice}
        style={styles.input}
        keyboardType="numeric"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleUpdateService}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? "Đang cập nhật..." : "Cập nhật"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditService;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  label: {
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 16,
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#f3f3f6",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#f44336",
    marginTop: 24,
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
