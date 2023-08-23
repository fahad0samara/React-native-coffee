/* eslint-disable prettier/prettier */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigation from './TabNavigation';
import Product from '../screen/Product';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          contentStyle: {backgroundColor: 'white'},
        }}>
        <Stack.Screen
          name="TabNavigation"
          options={{headerShown: false}}
          component={TabNavigation}
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
