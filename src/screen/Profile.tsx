import React from 'react';
import {View, Text, Image, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../redux/authSlice'; // Import your authSlice logout action

const ProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    
  };

  return (
    <View
      
    >
      {user && (
        <>
          <Image
            source={{uri: user.imageUri}}
            style={{width: 100, height: 100, borderRadius: 50}}
          />
          <Text>Name: {user.name}</Text>
          <Text>Email: {user.email}</Text>
          <Button title="Logout" onPress={handleLogout} />
        </>
      )}
    </View>
  );
};

export default ProfileScreen;