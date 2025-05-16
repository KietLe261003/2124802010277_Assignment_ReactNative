import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Login from "./Screen/Login";
import BookScreen from "./Screen/Book";
import DetailScreen from "./Screen/Detail";
import { AuthProvider, useAuth } from "@/app/Context/AuthContext";
import { Text, View } from "react-native";

const Lab4Stack = createNativeStackNavigator();

const Lab4StackScreen = () => {
  const { isLoading, token } = useAuth();

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>;
      </View>
    );
  }
  return (
    <Lab4Stack.Navigator
      screenOptions={{ headerShown: true }}
      initialRouteName={!token ? "Login" : "Book"}
    >
      {!token ? (
        <>
          <Lab4Stack.Screen name="Login" component={Login} />
        </>
      ) : (
        <>
          <Lab4Stack.Screen
            name="Book"
            options={{ headerShown: false }}
            component={BookScreen}
          />
          <Lab4Stack.Screen
            name="BookDetail"
            options={{ headerShown: false }}
            component={DetailScreen}
          />
        </>
      )}
    </Lab4Stack.Navigator>
  );
};

export default Lab4StackScreen;
