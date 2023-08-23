/* eslint-disable prettier/prettier */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Home from './../screen/Home';
import Product from './../screen/Product';

const Stack = createNativeStackNavigator();

const TabNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          contentStyle: {backgroundColor: 'white'},
        }}>
        <Stack.Screen
          name="Home"
          options={{headerShown: false}}
          component={Home}
        />
        <Stack.Screen
          name="Product"
          options={{headerShown: false}}
          component={Product}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigation;
