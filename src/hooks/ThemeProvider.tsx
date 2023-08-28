import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { View } from 'react-native';

import StackNavigation from '../navigation/StackNavigation';
import { useDarkMode } from './useDarkMode';

const ThemedApp = () => {
  const isDarkMode = useDarkMode();

  return (
         <View style={{ flex: 1, backgroundColor: isDarkMode ? 'black' : 'white' }}>
        <NavigationContainer>
 
        <StackNavigation />
        </NavigationContainer>
   
    </View>
  );
};

export default ThemedApp;
