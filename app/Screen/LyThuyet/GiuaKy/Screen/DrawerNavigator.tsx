import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import GiuaKyScreen from "../GiuaKy"; // stack chính
import UserInfoScreen from "./UserInfoScreen";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: true }}
      initialRouteName="GiuaKy"
    >
      <Drawer.Screen
        name="GiuaKy"
        component={GiuaKyScreen}
        options={{ title: "Trang Chủ" }}
      />
      <Drawer.Screen
        name="UserInfo"
        component={UserInfoScreen}
        options={{ title: "Thông tin người dùng" }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
