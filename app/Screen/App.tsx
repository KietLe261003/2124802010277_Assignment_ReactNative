import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./StackScreen/Home";
import Lab1StackScreen from "./ThucHanh/Lab1Screen/StackLab1Screen";
import Lab1Screen from "./StackScreen/Lab1Screen";
import LyThuyetBuoi2 from "./LyThuyet/Buoi2/LyThuyetBuoi2";
import DrawerNav from "./LyThuyet/Buoi4/Drawer";
import Detail from "./LyThuyet/Buoi4/Detail";
import ContactAppStack from "./ThucHanh/Lab2Sreen/Navigation/Stack";
import CreateUserForm from "./ThucHanh/Lab3Screen/Lab3Screen";
import Lab2StackScreen from "./ThucHanh/Lab2Sreen/StackLab2Screen";
import Lab2Screen from "./StackScreen/Lab2Screen";
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={"Home"}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Lab1" component={Lab1Screen} />
      <Stack.Screen name="Lab2" component={Lab2Screen} />
      <Stack.Screen name="Lab1StackScreen" component={Lab1StackScreen} />
      <Stack.Screen name="LyThuyetBuoi2" component={LyThuyetBuoi2} />
      <Stack.Screen name="LyThuyetBuoi4" component={DrawerNav} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="Lab2StackScreen" component={Lab2StackScreen} />
      <Stack.Screen name="Lab3" component={CreateUserForm} />
    </Stack.Navigator>
  );
};

export default App;

const styles = StyleSheet.create({});
