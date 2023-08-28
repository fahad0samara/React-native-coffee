import React from 'react';
import {View, Text, Image, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../redux/authSlice'; // Import your authSlice logout action
import DarkModeToggle from '../hooks/DarkModeToggle';
import { useDarkMode } from '../hooks/useDarkMode';

const ProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
  };
  const isDarkMode = useDarkMode()
  return (
       <View style={{ flex: 1, backgroundColor: isDarkMode ? 'black' : 'white' }}>

      {user && (
        <>
          <Image
            source={
              user.imageUri
                ? {uri: user.imageUri}
                : require('../image/wlcome.jpg')
            }
            style={{width: 100, height: 100, borderRadius: 50}}
          />
          <Text>Name: {user.name}</Text>
          <Text>Email: {user.email}</Text>
             <DarkModeToggle />
          <Button title="Logout" onPress={handleLogout} />
        </>
      )}
    </View>
  );
};

export default ProfileScreen;
