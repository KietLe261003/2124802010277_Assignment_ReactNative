import { useAuth } from "@/app/Config/AuthContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Login from "./Screen/Login";
import Register from "./Screen/Register";
import Home from "./Screen/Home";
import { CartProvider } from "@/app/Context/CartContext";

const GiuaKy = createNativeStackNavigator();

const GiuaKyScreen = () => {
  const { user } = useAuth();

  return (
    <CartProvider>
      <GiuaKy.Navigator
        screenOptions={{ headerShown: true }}
        initialRouteName={user ? "Home" : "Login"}
      >
        {!user ? (
          <>
            <GiuaKy.Screen
              name="Login"
              options={{ headerShown: false }}
              component={Login}
            />
            <GiuaKy.Screen
              name="Register"
              options={{ headerShown: false }}
              component={Register}
            />
          </>
        ) : (
          <>
            <GiuaKy.Screen
              name="Home"
              options={{ headerShown: false }}
              component={Home}
            />
          </>
        )}
      </GiuaKy.Navigator>
    </CartProvider>
  );
};

export default GiuaKyScreen;
