import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import ContactApp from '../Screen/App';
import Profile from '../Screen/Profile';

const Stack = createNativeStackNavigator();

const StackApp = () => {
  return (
    <Stack.Navigator
      initialRouteName="Contacts"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Contacts" component={ContactApp} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

export default StackApp;