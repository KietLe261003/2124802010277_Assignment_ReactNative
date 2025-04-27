import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Login from "./Login";
import Register from "./Register";
import ResetPassworld from "./ResetPassworld";


const Lab1Stack = createNativeStackNavigator();

export default function LyThuyetBuoi2() {
  return (
    <Lab1Stack.Navigator initialRouteName="Login">
      <Lab1Stack.Screen name="Login" component={Login} />
      <Lab1Stack.Screen name="Register" component={Register} />
      <Lab1Stack.Screen name="ResetPassworld" component={ResetPassworld} />
    </Lab1Stack.Navigator>
  );
}
