import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import Product from '../screen/Product';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigation from './TabNavigation';

import Register from './../screen/Register';
import Login from './../screen/Login';
import Home from './../screen/Home';
import {useSelector} from 'react-redux';
import Welcome from '../screen/Welcome';
import Search from '../screen/Search';
import {useDarkMode} from '../hooks/useDarkMode';
import {View} from 'react-native';

import AdminTabNavigation from './AdminTabNavigation';
import AdminAddItems from '../screen/admin/AdminAddItems';
import DetailsAdmin from '../screen/admin/DetailsAdmin';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  const user = useSelector(state => state.auth.user);
  const role = useSelector(state => state.auth.role);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          // Use dark mode value to set background color
          headerShown: false,
        }}>
        {user ? ( // User is already registered
          role === 'admin' ? (
            <>
              <Stack.Screen
                name="AdminTabNavigation"
                component={AdminTabNavigation}
              />
              <Stack.Screen
                name="AdminAddItems"
                component={AdminAddItems}
                options={{animationTypeForReplace: 'pop'}} // Skip animation when navigating from Welcome to Register
              />
              <Stack.Screen name="DetailsAdmin" component={DetailsAdmin} />
            </>
          ) : (
            <>
              <Stack.Screen name="TabNavigation" component={TabNavigation} />
            </>
          )
        ) : (
          // User is not registered
          <>
            <Stack.Screen
              name="Welcome"
              component={Welcome}
              options={{animationTypeForReplace: 'pop'}} // Skip animation when navigating from Welcome to Register
            />

            <Stack.Screen
              name="Register"
              component={Register}
              options={{animationTypeForReplace: 'pop'}} // Skip animation when navigating from Register to Login
            />
            <Stack.Screen
              name="Login"
              component={Login}
              initialParams={{role}}
              options={{animationTypeForReplace: 'pop'}} // Skip animation when navigating from Register to Login
            />
          </>
        )}
        {/* Other screens... */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
