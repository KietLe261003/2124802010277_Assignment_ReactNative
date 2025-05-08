import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import Home from '../Screen/Home';
import Transaction from '../Screen/Transaction';
import Customer from '../Screen/Customer';
import Setting from '../Screen/Setting';

const Tab = createMaterialBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#e57373"
      inactiveColor="#888"
      barStyle={{ backgroundColor: '#fff' }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }:{color: string}) => (
            <MaterialIcons name="home" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Transaction"
        component={Transaction}
        options={{
          tabBarLabel: 'Transaction',
          tabBarIcon: ({ color }:{color: string}) => (
            <MaterialIcons name="attach-money" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Customer"
        component={Customer}
        options={{
          tabBarLabel: 'Customer',
          tabBarIcon: ({ color }:{color: string}) => (
            <MaterialIcons name="group" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarLabel: 'Setting',
          tabBarIcon: ({ color }:{color: string}) => (
            <MaterialIcons name="settings" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
