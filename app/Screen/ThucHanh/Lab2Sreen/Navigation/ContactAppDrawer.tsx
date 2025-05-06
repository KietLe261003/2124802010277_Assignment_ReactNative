import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import ContactApp from '../Screen/App';
import Profile from '../Screen/Profile';
import Favorites from '../Screen/Favorite';
import User from '../Screen/User';
import Options from '../Screen/Option';
const getDrawerItemIcon =
  (icon: any) =>
  ({tintColor}: any) =>
    <MaterialIcons name={icon} size={22} style={{color: tintColor}} />;

const Stack = createNativeStackNavigator();
const ContactsScreens = () => {
  return (
    <Stack.Navigator initialRouteName="Contacts">
      <Stack.Screen
        name="Contacts"
        component={ContactApp}
        options={{
          title: 'Contacts',
          headerShown: false,
        }}
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
            headerShown: false,
            headerStyle: {
              backgroundColor: '#3498db',
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
        options={{title: 'Favorites', headerShown: false}}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{title: 'Profile', headerShown: false}}
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
          headerShown: false,
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
      {/* <Stack.Screen
        name="Options"
        component={Options}
        options={{title: 'Options'}}
      /> */}
    </Stack.Navigator>
  );
};

const OptionScreens = () => {
  return (
    <Stack.Navigator initialRouteName="Options">
      <Stack.Screen
        name="Options"
        component={Options}
        options={{title: 'Options', headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="ContactsScreens">
      <Drawer.Screen
        name="ContactsScreens"
        component={ContactsScreens}
        options={{
          drawerIcon: getDrawerItemIcon('list'),
          title: 'Contacts',
        }}
      />
      <Drawer.Screen
        name="FavoritesScreens"
        component={FavoritesScreens}
        options={{
          drawerIcon: getDrawerItemIcon('star'),
          title: 'Favorites list',
        }}
      />
      <Drawer.Screen
        name="UserScreens"
        component={UserScreens}
        options={{
          drawerIcon: getDrawerItemIcon('person'),
          title: 'My Profile',
        }}
      />
      <Drawer.Screen
        name="OptionScreens"
        component={OptionScreens}
        options={{
          drawerIcon: getDrawerItemIcon('settings'),
          title: 'Setting',
        }}
      />
    </Drawer.Navigator>
  );
};
export default DrawerNavigator;