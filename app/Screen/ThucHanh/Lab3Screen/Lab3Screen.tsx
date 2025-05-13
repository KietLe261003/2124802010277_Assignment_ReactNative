import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import BottomTab from "./Component/BottomTab";
import AddService from "./Screen/AddService";
import DetailService from "./Screen/DetailService";
import Login from "./Screen/Login";
import { useAuth } from "@/app/Config/AuthContext";
import EditService from "./Screen/EditService";
import UserScreen from "./Screen/UserScreen";
import Register from "./Screen/Register";
import BottomTabUser from "./Component/BottomTabUser";

const Lab3Stack = createNativeStackNavigator();

const Lab3StackScreen = () => {
  const { user } = useAuth();
  console.log(user?.role);
  

  return (
    <Lab3Stack.Navigator
      screenOptions={{ headerShown: true }}
      initialRouteName={user ? (user.role === "admin" ? "BottomTab" : "HomeUserScreen") : "Login"}
    >
      {!user ? (
        <>
        <Lab3Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={Login}
        />
        <Lab3Stack.Screen
          name="Register"
          options={{ headerShown: false }}
          component={Register}
        />
        </>
      ) : user.role === "admin" ? (
        <>
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
            name="DetailService"
            options={{
              title: "DetailService",
              headerStyle: {
                backgroundColor: "#f44336",
              },
              headerTintColor: "#fff",
            }}
            component={DetailService}
          />
          <Lab3Stack.Screen
            name="EditService"
            options={{
              title: "EditService",
              headerStyle: {
                backgroundColor: "#f44336",
              },
              headerTintColor: "#fff",
            }}
            component={EditService}
          />
        </>
      ) : (
        <>
          <Lab3Stack.Screen
            name="HomeUserScreen"
            options={{ headerShown: false }}
            component={BottomTabUser}
          />  
          <Lab3Stack.Screen
            name="UserScreen"
            options={{
              title: "UserScreen",
              headerStyle: {
                backgroundColor: "#f44336",
              },
              headerTintColor: "#fff",
            }}
            component={UserScreen}
          />
        </>
      )}
    </Lab3Stack.Navigator>
  );
};

export default Lab3StackScreen;
