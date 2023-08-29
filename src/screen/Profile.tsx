import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';
import DarkModeToggle from '../hooks/DarkModeToggle';
import { useDarkMode } from '../hooks/useDarkMode';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const isDarkMode = useDarkMode();

  const handleLogout = () => {
    dispatch(logout());
  };

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'transparent',
    },
    background: {
      flex: 1,
      resizeMode: 'cover',
    },
    contentContainer: {
      flex: 1,
      backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)',
      margin: 20,
      padding: 20,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: isDarkMode ? '#fff' : '#000',
      justifyContent: 'center',
      alignItems: 'center',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    darkModeText: {
      fontSize: 16,
      color: isDarkMode ? '#fff' : '#333',
      marginRight: 5,
    },
    darkModeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    profileImage: {
      width: 150,
      height: 150,
      borderRadius: 75,
      marginBottom: 20,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDarkMode ? '#fff' : '#333',
      marginBottom: 5,
    },
    email: {
      fontSize: 16,
      color: isDarkMode ? '#ccc' : '#666',
    },
    infoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
    },
    icon: {
      marginRight: 5,
      color: isDarkMode ? '#fff' : '#333',
    },
    label: {
      fontSize: 16,
      color: isDarkMode ? '#ccc' : '#666',
    },
    logoutButton: {
      marginTop: 30,
      backgroundColor: 'red',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    logoutButtonText: {
      fontSize: 16,
      color: 'white',
    },
  });

  return (
    <View style={dynamicStyles.container}>
      <ImageBackground
        source={
          user.imageUri
            ? { uri: user.imageUri }
            : require('../image/wlcome.jpg')
        }
        style={dynamicStyles.background}
      >
        
        <View style={dynamicStyles.contentContainer}>
          
          <View style={dynamicStyles.header}>
       
            <View style={dynamicStyles.darkModeContainer}>
              <Text style={dynamicStyles.darkModeText}>Dark Mode</Text>
              <DarkModeToggle />
            </View>
          </View>

          <Image
            source={
              user.imageUri
                ? { uri: user.imageUri }
                : require('../image/wlcome.jpg')
            }
            style={dynamicStyles.profileImage}
          />
          <View style={dynamicStyles.infoContainer}>
            <Ionicons name="person" size={20} style={dynamicStyles.icon} />

           
            <Text style={dynamicStyles.name}>{user.name}</Text>
          </View>
          <View style={dynamicStyles.infoContainer}>
            <Ionicons name="mail" size={20} style={dynamicStyles.icon} />
         
            <Text style={dynamicStyles.email}>{user.email}</Text>
          </View>
          <TouchableOpacity
            style={dynamicStyles.logoutButton}
            onPress={handleLogout}
          >
            <Text style={dynamicStyles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ProfileScreen;
