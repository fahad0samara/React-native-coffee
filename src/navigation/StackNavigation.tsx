/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {View, Platform} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Feather} from '@expo/vector-icons'; // Import icons from a suitable library
const Tab = createBottomTabNavigator();
const menuIcons = (route, focused) => {
  let icon;

  if (route.name === 'home') {
    icon = <Feather name="home" size={30} color={focused ? 'blue' : 'white'} />;
  } else if (route.name === 'favourite') {
    icon = <Feather name="heart" size={30} color={focused ? 'red' : 'white'} />;
  } else if (route.name === 'cart') {
    icon = (
      <Feather
        name="shopping-cart"
        size={30}
        color={focused ? 'green' : 'white'}
      />
    );
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: focused ? 'blue' : 'transparent',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}>
      {icon}
    </View>
  );
};

const StackNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({focused}) => menuIcons(route, focused),
        tabBarStyle: {
          marginBottom: 20,
          height: 75,
          alignItems: 'center',
          borderRadius: 100,
          marginHorizontal: 20,
          backgroundColor: 'white',
        },
        tabBarItemStyle: {
          marginTop: Platform.OS === 'ios' ? 30 : 0,
        },
      })}>
      <Tab.Screen name="home" component={HomeScreen} />
      <Tab.Screen name="favorite" component={HomeScreen} />
      <Tab.Screen name="cart" component={HomeScreen} />
    </Tab.Navigator>
  );
};

export default StackNavigation;
