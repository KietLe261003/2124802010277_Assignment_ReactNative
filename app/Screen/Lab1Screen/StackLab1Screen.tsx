import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HelloWorld from "../Lab1Screen/HelloWorld";
import StateAndProps from "../Lab1Screen/StateAndProps";
import Styling from "../Lab1Screen/Styling";
import CapturingTaps from "../Lab1Screen/CapturingTaps";
import CustomButtonScreen from "../Lab1Screen/CustomButton";
import Form from "../Lab1Screen/Form";
import LongList from "../Lab1Screen/LongList";
import ScrollableContent from "../Lab1Screen/ScrollableContent";

const Lab1Stack = createNativeStackNavigator();

export default function Lab1StackScreen() {
  return (
    <Lab1Stack.Navigator initialRouteName="HelloWorld">
      <Lab1Stack.Screen name="HelloWorld" component={HelloWorld} />
      <Lab1Stack.Screen name="StateAndProps" component={StateAndProps} />
      <Lab1Stack.Screen name="Styling" component={Styling} />
      <Lab1Stack.Screen name="CapturingTaps" component={CapturingTaps} />
      <Lab1Stack.Screen name="CustomButton" component={CustomButtonScreen} />
      <Lab1Stack.Screen name="Form" component={Form} />
      <Lab1Stack.Screen name="LongList" component={LongList} />
      <Lab1Stack.Screen name="ScrollableContent" component={ScrollableContent} />
    </Lab1Stack.Navigator>
  );
}
