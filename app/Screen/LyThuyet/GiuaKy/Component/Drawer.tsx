import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React, { ReactNode, useState } from "react";
import { Drawer } from "react-native-drawer-layout";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@/app/Config/AuthContext";
import { useCart } from "@/app/Context/CartContext";
type DrawerNavProps = {
  children: ReactNode;
};
const DrawerNav = ({ children }: DrawerNavProps) => {
  const [open, setOpen] = useState(false);
  const navigation = useNavigation<any>();
  const { logout } = useAuth();
  const { cartItems } = useCart();
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
              navigation.navigate("UserInfor");
            }}
          >
            <Ionicons name="person" size={24} color="#333" />
            <Text style={styles.menuText}>Trang cá nhân</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setOpen(false);
              logout();
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
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            toggleSidebar();
          }}
        >
          <FontAwesome name="bars" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Restaurant App</Text>
        <View style={styles.headerIcons}>
          <View style={styles.cartBadge}>
            <Text style={styles.cartCount}>{cartItems.length}</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
            <FontAwesome
              name="shopping-cart"
              size={22}
              color="#333"
              style={{ marginRight: 12 }}
            />
          </TouchableOpacity>
          <FontAwesome
            name="sign-out"
            size={22}
            color="#333"
            onPress={logout}
          />
        </View>
      </View>
      {/* Quan trọng: phải hiển thị children ở đây */}
      <View style={{ flex: 1 }}>{children}</View>
    </Drawer>
  );
};

export default DrawerNav;

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
