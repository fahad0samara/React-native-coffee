/* eslint-disable no-trailing-spaces */
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
import {useState} from 'react';
import HomeAdmin from '../screen/admin/HomeAdmin';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is already authenticated
    AsyncStorage.getItem('isLoggedIn')
      .then(value => {
        setIsAuthenticated(value === 'true');
      })
      .catch(error => {
        console.log('Error reading authentication status', error);
      });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          contentStyle: {backgroundColor: 'white'},
    
    

        }}>
        {isAuthenticated ? (
          <>
            {/* User is authenticated, navigate to UserScreen or AdminScreen */}
            <Stack.Screen name="TabNavigation" options={{headerShown: false}}
              component={TabNavigation}
            />

            <Stack.Screen name="HomeAdmin" component={HomeAdmin} />
          </>
        ) : (
          <>
            {/* User is not authenticated, navigate to Login or Registration */}
            <Stack.Screen
          name="Register
"
          options={{headerShown: false}}
          component={Register}
        />

        <Stack.Screen
          name="Login"
          options={{headerShown: false}}
          component={Login}
        />
           <Stack.Screen
          name="Home"
          options={{headerShown: false}}
          component={Home}
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
          </>
        )}

  
     
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
