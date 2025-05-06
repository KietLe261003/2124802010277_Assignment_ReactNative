import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "react-native-drawer-layout";
import { useNavigation } from "@react-navigation/native";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import ContactApp from "../Screen/App";
import Profile from "../Screen/Profile";
import Favorites from "../Screen/Favorite";
import User from "../Screen/User";
import Options from "../Screen/Option";
import { Header } from "@/app/Component/Header";

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="Contacts">
      <Stack.Screen
        name="Contacts"
        component={ContactApp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Favorites"
        component={Favorites}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="User"
        component={User}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Options"
        component={Options}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={({ route }) => {
          const { contact }: any = route.params;
          const { name } = contact;
          return {
            title: name.split(" ")[0],
            headerShown: false,
          };
        }}
      />
    </Stack.Navigator>
  );
};

const DrawerApp = () => {
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
              navigation.navigate(
                "Lab2StackScreen" as never,
                { screen: "Contacts" } as never
              );
            }}
          >
            <Ionicons name="list" size={24} color="#333" />
            <Text style={styles.menuText}>Danh bạ</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setOpen(false);
              navigation.navigate(
                "Lab2StackScreen" as never,
                { screen: "Favorites" } as never
              );
            }}
          >
            <Ionicons name="star" size={24} color="#333" />
            <Text style={styles.menuText}>Yêu thích</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setOpen(false);
              navigation.navigate(
                "Lab2StackScreen" as never,
                { screen: "User" } as never
              );
            }}
          >
            <Ionicons name="person" size={24} color="#333" />
            <Text style={styles.menuText}>Tôi</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setOpen(false);
              navigation.navigate(
                "Lab2StackScreen" as never,
                { screen: "Options" } as never
              );
            }}
          >
            <Ionicons name="settings" size={24} color="#333" />
            <Text style={styles.menuText}>Cài đặt</Text>
          </TouchableOpacity>
        </View>
      )}
    >
      <Header openSideBar={toggleSidebar}/>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>This is Home</Text>
      </View>
    </Drawer>
  );
};

export default DrawerApp;

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
