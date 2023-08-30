import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';

import AdminProfile from '../screen/admin/AdminProfile';
import HomeAdmin from '../screen/admin/HomeAdmin';

import List from '../screen/admin/List';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Align items in the middle
    backgroundColor: '#955629', // Background color for the tab bar
    height: 60,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 60,
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
  tabLabel: {
    color: '#fff', // Tab label color
    fontSize: 12,
  },
  addItemsTab: {
    position: 'absolute',
    top: -35,
    zIndex: 10,
    left: 10,
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 70,
    borderRadius: 30,
    backgroundColor: '#955629',
    borderWidth: 3,
    borderColor: '#fff',
  },
  addItemsIcon: {
    fontSize: 30,
    color: '#fff',
  },
  addItemsText: {
    color: '#fff',
    fontSize: 12,
  },
});

const AdminTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // Hide the header
      }}
      tabBar={props => (
        <View style={styles.tabContainer}>
          <AdminAddItemsButton />
          <TabBar {...props} />
        </View>
      )}>
      <Tab.Screen
        name="HomeAdmin"
        component={HomeAdmin}
        options={{tabBarLabel: 'Home'}}
      />
      <Tab.Screen
        name="List"
        component={List}
        options={{tabBarLabel: 'List'}}
      />
      <Tab.Screen
        name="AdminProfile"
        component={AdminProfile}
        options={{tabBarLabel: 'Profile'}}
      />
    </Tab.Navigator>
  );
};

const AdminAddItemsButton = () => {
      const navigation = useNavigation();
      const onPress = () => {
    // Navigate to the AdminAddItems screen
    navigation.navigate('AdminAddItems');
  
    };


  return (
    <TouchableOpacity style={styles.addItemsTab}  onPress={onPress}>
      <Icon name="plus-circle" style={styles.addItemsIcon} />
    </TouchableOpacity>
  );
};

const TabBar = ({state, descriptors, navigation}) => {
  return (
    <>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined ? options.tabBarLabel : route.name;

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
            <Text style={styles.tabLabel}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </>
  );
};

const getIconName = routeName => {
  switch (routeName) {
    case 'HomeAdmin':
      return 'home';
    case 'List':
      return 'list'; // Change to the desired FontAwesome icon
    case 'AdminProfile':
      return 'user';
    default:
      return 'coffee';
  }
};

export default AdminTabNavigation;
