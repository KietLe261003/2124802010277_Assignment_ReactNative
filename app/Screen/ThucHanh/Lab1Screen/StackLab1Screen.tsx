import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HelloWorld from "./HelloWorld";
import StateAndProps from "./StateAndProps";
import Styling from "./Styling";
import CapturingTaps from "./CapturingTaps";
import CustomButtonScreen from "./CustomButton";
import Form from "./Form";
import LongList from "./LongList";
import ScrollableContent from "./ScrollableContent";
import Calculator from "./Calculator";

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
      <Lab1Stack.Screen name="Calculator" component={Calculator} />
    </Lab1Stack.Navigator>
  );
}
