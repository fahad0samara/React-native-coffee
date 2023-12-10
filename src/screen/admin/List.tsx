import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image,
  Alert,
  ActivityIndicator,
 } from 'react-native';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDarkMode } from '../../hooks/useDarkMode';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const UserListScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const role = useSelector((state) => state.auth.role);
  const isDarkMode = useDarkMode();

  const fetchUsers = () => {
    setIsLoading(true); // Set loading to true when fetching data
    axios
      .get('https://coffe-api.azurewebsites.net/auth/users')
      .then((response) => {
        const userList = response.data;
        setUsers(userList);
      })
      .catch((error) => {
        Alert.alert(
          'Error',
          'Something went wrong',
          [{ text: 'OK', style: 'cancel' }],
          { cancelable: true }
        );
      })
      .finally(() => {
        setIsLoading(false); // Set loading to false when done
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

 const deleteUser = (id, userRole) => {
  if (userRole === 'admin' && role === 'admin') {
    // If the user is an admin and is trying to delete their own account
    Alert.alert(
      'Error',
      'You cannot delete your own account',
      [{ text: 'OK', style: 'cancel' }],
      { cancelable: true }
    );
   
    return;
  }

  // Show a confirmation alert before deleting
  Alert.alert(
    'Confirm Deletion',
    'Are you sure you want to delete this user?',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => {
          // User confirmed, proceed with deletion
          axios
            .delete(`https://coffe-api.azurewebsites.net/auth/delete/${id}`)
            .then(() => {
              fetchUsers();
            })
            .catch((error) => {
              console.error('Error deleting user:', error);
            });
        },
        style: 'destructive',
      },
    ],
    { cancelable: true }
  );
};

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#000' : 'white',
      padding: wp(4),
    },
    title: {
      fontSize: wp(6),
      fontWeight: 'bold',
      marginBottom: wp(4),
      textAlign: 'center',
      color: isDarkMode ? 'white' : 'black',
    },
    userContainer: {
      backgroundColor: isDarkMode ? '#363636' : '#f0f0f0',
      borderRadius: wp(2),
      padding: wp(4),
      marginBottom: wp(4),
      flexDirection: 'row',
      alignItems: 'center',
    },
    profileImage: {
      width: wp(20),
      height: wp(20),
      borderRadius: wp(10),
      marginRight: wp(4),
    },
    userInfo: {
      flex: 1,
    },
    userName: {
      fontSize: wp(4.5),
      fontWeight: 'bold',
      color: isDarkMode ? 'white' : 'black',
    },
    userEmail: {
      fontSize: wp(4),
      color: isDarkMode ? 'lightgray' : 'gray',
    },
    userRole: {
      fontSize: wp(4),
      color: isDarkMode ? 'lightblue' : 'blue',
    },
    deleteButton: {
      padding: wp(2),
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User List</Text>
            {isLoading ? ( 
              <View>
        <ActivityIndicator size="large" color={isDarkMode ? 'white' : 'black'} />
        <Text style={{ textAlign: 'center', color: isDarkMode ? 'white' : 'black' }}>
          Loading...
          </Text>
        </View>
      ) : (
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userContainer}>
            <Image
              source={
                item.profile_image
                  ? { uri: item.profile_image }
                  : require('../../image/profile1.png')
              }
              style={styles.profileImage}
            />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>Name: {item.name}</Text>
              <Text style={styles.userEmail}>Email: {item.email}</Text>
              <Text style={styles.userRole}>Role: {item.role}</Text>
            </View>
            {role === 'admin' && item.role !== 'admin' && (
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteUser(item.id, item.role)}
              >
                <Ionicons name="trash-outline" size={wp(6)} color="red" />
              </TouchableOpacity>
            )}
          </View>
        
        )}
      />
      
      )
      }

    </View>
  );
};

export default UserListScreen;
