/* eslint-disable prettier/prettier */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

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
      component={HomeTabs}
    />
    <Stack.Screen
      name="Product"
      options={{headerShown: false}}
      component={ProductScreen}
    />
  </Stack.Navigator>
</NavigationContainer>

  );
};

export default TabNavigation;
