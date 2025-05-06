import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import ContactApp from '../Screen/App';
import Profile from '../Screen/Profile';
import Favorites from '../Screen/Favorite';
import User from '../Screen/User';
import Options from '../Screen/Option';


const getTabBarIcon =
  (icon: any) =>
  ({tintColor}: any) =>
    <MaterialIcons name={icon} size={26} style={{color: tintColor}} />;

const Stack = createNativeStackNavigator();
const ContactsScreens = () => {
  return (
    <Stack.Navigator
      initialRouteName="Contacts"
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: {backgroundColor: 'tomato'},
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="Contacts"
        component={ContactApp}
        options={{title: 'Contacts'}}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={({route}) => {
          const {contact}: any = route.params;
          const {name} = contact;
          return {
            title: name.split(' ')[0],
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: '#3498DB',
            },
          };
        }}
      />
    </Stack.Navigator>
  );
};

const FavoritesScreens = () => {
  return (
    <Stack.Navigator initialRouteName="Favorites">
      <Stack.Screen
        name="Favorites"
        component={Favorites}
        options={{title: 'Favorites'}}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{title: 'Profile'}}
      />
    </Stack.Navigator>
  );
};

const UserScreens = () => {
  return (
    <Stack.Navigator initialRouteName="User">
      <Stack.Screen
        name="User"
        component={User}
        options={({navigation}) => ({
          headerTitle: 'Me',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#3498db',
          },
          headerRight: () => (
            <MaterialIcons
              name="settings"
              size={24}
              style={{color: 'white', marginRight: 10}}
              onPress={() => navigation.navigate('Options')}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Options"
        component={Options}
        options={{title: 'Options'}}
      />
    </Stack.Navigator>
  );
};

const Tab = createMaterialBottomTabNavigator();
const ContactAppBottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="ContactsScreens"
      barStyle={{backgroundColor: '#3498db'}}
      labeled={false}
      activeTintColor="#D8D8D8"
      inactiveColor="#BBBBBB">
      <Tab.Screen
        name="ContactsScreens"
        component={ContactsScreens}
        options={{
          tabBarIcon: getTabBarIcon('list'),
          tabBarLabel: 'Contacts',
        }}
      />
      <Tab.Screen
        name="FavoritesScreens"
        component={FavoritesScreens}
        options={{
          tabBarIcon: getTabBarIcon('star'),
          tabBarLabel: 'Favorites',
        }}
      />
      <Tab.Screen
        name="UserScreens"
        component={UserScreens}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: getTabBarIcon('person'),
        }}
      />
    </Tab.Navigator>
  );
};

export default ContactAppBottomTab;