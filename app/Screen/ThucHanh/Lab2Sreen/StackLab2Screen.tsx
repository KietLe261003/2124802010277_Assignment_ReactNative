import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import BottomTab from "./Navigation/BottomTab";
import DrawerApp from "./Navigation/Drawer";
import StackApp from "./Navigation/Stack";
import Index from "./Screen/Index";
import ContactApp from "./Screen/App";
import Favorites from "./Screen/Favorite";
import User from "./Screen/User";
import Options from "./Screen/Option";
import Profile from "./Screen/Profile";


const Lab2Stack = createNativeStackNavigator();

export default function Lab2StackScreen() {
  return (
    <Lab2Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="BottomTab">
      <Lab2Stack.Screen name="BottomTab" component={BottomTab} />
      <Lab2Stack.Screen name="DrawerApp" component={DrawerApp} />
      <Lab2Stack.Screen name="StackApp" component={StackApp} />
      <Lab2Stack.Screen
        name="Contacts"
        component={ContactApp}
        options={{ headerShown: false }}
      />
      <Lab2Stack.Screen
        name="Favorites"
        component={Favorites}
        options={{ headerShown: false }}
      />
      <Lab2Stack.Screen
        name="User"
        component={User}
        options={{ headerShown: false }}
      />
      <Lab2Stack.Screen
        name="Options"
        component={Options}
        options={{ headerShown: false }}
      />
      <Lab2Stack.Screen
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
    </Lab2Stack.Navigator>
  );
}
