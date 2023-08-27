/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, Image, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({route, navigation}) => {
  const user = route.params?.user; // Use optional chaining to safely access user

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('isLoggedIn');
      navigation.replace('Login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <View
        style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            backgroundColor:"black"
        }}
    >
      {user ? (
        <>
          <Text>Name: {user.name}</Text>
          <Text>Email: {user.email}</Text>
          {user.imageUri && (
            <Image
              source={{uri: user.imageUri}}
              style={{width: 200, height: 200, resizeMode: 'contain'}}
            />
          )}
        </>
      ) : (
        <Text>User information not available</Text>
      )}
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};


export default ProfileScreen;
