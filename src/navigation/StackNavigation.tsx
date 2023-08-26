/* eslint-disable prettier/prettier */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import Product from '../screen/Product';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigation from './TabNavigation';
import Welcome from './../screen/Welcome';
import Search from '../screen/Search';
import Register from './../screen/Register';
import Login from './../screen/Login';
import Home from './../screen/Home';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          contentStyle: {backgroundColor: 'white'},
        }}>
          <Stack.Screen
  name="Register
"
  options={{headerShown: false}}
  component={Register
}
/>

        <Stack.Screen
          name="Login"
          options={{headerShown: false}}
          component={Login

}
        />
        <Stack.Screen
  name="Home"
  options={{headerShown: false}}
  component={Home}
/>


        <Stack.Screen
          name="TabNavigation"
          options={{headerShown: false}}
          component={TabNavigation}
        />
        <Stack.Screen
          name="Search"
          options={{headerShown: false}}
          component={Search}
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

export default StackNavigation;
