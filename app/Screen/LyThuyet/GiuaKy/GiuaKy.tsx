import { useAuth } from "@/app/Config/AuthContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Login from "./Screen/Login";
import Register from "./Screen/Register";
import Home from "./Screen/Home";
import FoodListByCategory from "./Screen/FoodListByCategory";
import CartScreen from "./Screen/CartScreen";
import PaymentSuccess from "./Screen/PaymentSuccess";
import { CartProvider } from "@/app/Context/CartContext";
import DrawerNav from "./Component/Drawer";
import HomeWithDrawer from "./Screen/HomeWithDrawer";
import UserInfoScreen from "./Screen/UserInfoScreen";

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
              component={Login}
              options={{ headerShown: false }}
            />
            <GiuaKy.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <GiuaKy.Screen
              name="Home"
              component={HomeWithDrawer}
              options={{ headerShown: false }}
            />
            <GiuaKy.Screen
              name="FoodListByCategory"
              component={FoodListByCategory}
              options={({ route }: any) => ({
                title: route.params?.category || "Food List",
              })}
            />
            <GiuaKy.Screen
              name="Cart"
              component={CartScreen}
              options={{ title: "Cart" }}
            />
            <GiuaKy.Screen
              name="PaymentSuccess"
              component={PaymentSuccess}
              options={{ headerShown: false }}
            />
            <GiuaKy.Screen
              name="UserInfor"
              component={UserInfoScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </GiuaKy.Navigator>
    </CartProvider>
  );
};

export default GiuaKyScreen;
