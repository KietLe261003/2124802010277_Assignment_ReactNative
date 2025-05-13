import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import UserScreen from '../Screen/UserScreen';
import Appointment from '../Screen/Appointment';
import Setting from '../Screen/Setting';

const Tab = createMaterialBottomTabNavigator();

const BottomTabUser = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeUser"
      activeColor="#e57373"
      inactiveColor="#888"
      barStyle={{ backgroundColor: '#fff' }}
    >
      <Tab.Screen
        name="HomeUser"
        component={UserScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }:{color: string}) => (
            <MaterialIcons name="home" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Appointment"
        component={Appointment}
        options={{
          tabBarLabel: 'Appointment',
          tabBarIcon: ({ color }:{color: string}) => (
            <MaterialIcons name="attach-money" color={color} size={24} />
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

export default BottomTabUser;
