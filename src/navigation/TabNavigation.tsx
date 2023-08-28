
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

import Home from './../screen/Home';
import Cart from './../screen/Cart';
import Favorite from '../screen/Favorite';
import Profile from '../screen/Profile';

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#955629', // Background color for the tab bar
    borderTopWidth: 1,
    borderTopColor: '#8a8a8a', // Border color for the tab bar
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 5,
  },
  tabIcon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 30,
    color: '#fff', // Icon color
  },
});

const TabNavigation = ({route}) => {
  const {user} = route.params;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // Hide the header
      }}
      tabBar={props => (
        <View style={styles.tabContainer}>
          <TabBar {...props} />
        </View>
      )}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Favorite" component={Favorite} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Profile" component={Profile} initialParams={{user}} />
    </Tab.Navigator>
  );
};

const TabBar = ({state, descriptors, navigation}) => {
  return (
    <>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            onPress={onPress}
            style={styles.tabIcon}
            key={route.key}>
            <Icon
              name={getIconName(route.name)}
              style={[styles.icon, {color: isFocused ? '#ffeead' : '#fff'}]}
            />
          </TouchableOpacity>
        );
      })}
    </>
  );
};

const getIconName = routeName => {
  switch (routeName) {
    case 'Home':
      return 'coffee';
    case 'Favorite':
      return 'heart';
    case 'Cart':
      return 'shopping-cart';
    default:
      return 'coffee';
  }
};

export default TabNavigation;
