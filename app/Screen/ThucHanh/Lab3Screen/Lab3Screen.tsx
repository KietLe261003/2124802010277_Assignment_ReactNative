import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTab from "./Component/BottomTab";
import AddService from "./Screen/AddService";
import DetailService from "./Screen/DetailService";
import Login from "./Screen/Login";
const Lab3Stack = createNativeStackNavigator();
const Lab3StackScreen = () => {
  return (
    <Lab3Stack.Navigator
      screenOptions={{ headerShown: true }}
      initialRouteName="Login"
    >
      <Lab3Stack.Screen
        name="Login"
        options={{ headerShown: false }}
        component={Login}
      />
      <Lab3Stack.Screen
        name="BottomTab"
        options={{ headerShown: false }}
        component={BottomTab}
      />
      <Lab3Stack.Screen
        name="AddService"
        options={{
          title: "Service",
          headerStyle: {
            backgroundColor: "#f44336", 
          },
          headerTintColor: "#fff",
        }}
        component={AddService}
      />
      <Lab3Stack.Screen
        name="DeatilService"
        options={{
          title: "DetailService",
          headerStyle: {
            backgroundColor: "#f44336", 
          },
          headerTintColor: "#fff",
        }}
        component={DetailService}
      />
    </Lab3Stack.Navigator>
  );
};

export default Lab3StackScreen;
