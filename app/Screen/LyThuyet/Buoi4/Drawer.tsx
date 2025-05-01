import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button,
} from "react-native";
import React, { useEffect, useState, useTransition } from "react";
import { Drawer } from "react-native-drawer-layout";

import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const DrawerNav = () => {
  const [open, setOpen] = useState(false);
  const navigation = useNavigation<any>();
  const toggleSidebar = () => setOpen(!open);

  return (
    <Drawer
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      drawerType="slide"
      hideStatusBarOnOpen={true}
      renderDrawerContent={() => (
        <View style={styles.drawerContent}>
          <View style={styles.userInfo}>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/16869/16869838.png",
              }}
              style={styles.avatar}
            />
            <Text style={styles.userName}>Kiệt Lê</Text>
          </View>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setOpen(false);
              navigation.navigate('Detail');
            }}
          >
            <Ionicons name="person" size={24} color="#333" />
            <Text style={styles.menuText}>Trang cá nhân</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              navigation.navigate("LyThuyetBuoi2")
              setOpen(false);
            }}
          >
            <Ionicons name="log-out" size={24} color="#53045F" />
            <Text style={[styles.menuText, { color: "#53045F" }]}>
              Đăng xuất
            </Text>
          </TouchableOpacity>
        </View>
      )}
    >
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Trang chủ</Text>
        <Button
          title="Đi đến chi tiết"
          onPress={() => toggleSidebar()}
        />
      </View>
    </Drawer>
  );
};
const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    padding: 20,
  },
  userInfo: {
    alignItems: "center",
    marginVertical: 30,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    color: "#333",
    fontWeight: "bold",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    padding: 10,
  },
  menuText: {
    marginLeft: 15,
    fontSize: 16,
    color: "#333",
    fontFamily: "Cairo-Regular",
  },
});
export default DrawerNav;
