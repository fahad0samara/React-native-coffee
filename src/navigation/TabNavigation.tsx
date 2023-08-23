import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5'; // Import from FontAwesome5
import Home from './../screen/Home';
import Cart from './../screen/Cart';
import Favorite from '../screen/Favorite';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'coffee' : 'coffee'; // Coffee cup icon for Home
          } else if (route.name === 'Favorite') {
            iconName = focused ? 'heart' : 'heart'; // Heart icon for Favorite
          } else if (route.name === 'Cart') {
            iconName = focused ? 'shopping-cart' : 'shopping-cart'; // Shopping cart icon for Cart
          }

          // Return the styled icon
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#6B4226', // Active tab icon color
        inactiveTintColor: 'gray', // Inactive tab icon color
        showLabel: false, // Hide tab labels
        style: {
          display: 'flex', // Flex display for the tab bar
        },
      }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Favorite" component={Favorite} />
      <Tab.Screen name="Cart" component={Cart} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
