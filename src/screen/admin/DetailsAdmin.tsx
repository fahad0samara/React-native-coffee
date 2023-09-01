import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDarkMode } from '../../hooks/useDarkMode';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import axios from 'axios';

const CoffeeDetailScreen = ({ route, navigation }) => {
  const { item } = route.params;
  console.log('====================================');
  console.log(item);
  console.log('====================================');
  const isDarkMode = useDarkMode();
 

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? 'black' : 'white',
    },
    image: {
      width: '100%',
      height: heightPercentageToDP(40),
      borderBottomLeftRadius: widthPercentageToDP(50),
    },
    backButtonContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      padding: 16,
      zIndex: 1,
    },
    backButton: {
      fontSize: 24,
      color: 'white',
      backgroundColor: '#955629',
      padding: 4,
      borderRadius: 4,
      shadowColor: '#fff',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
    },
    detailsContainer: {
      padding: 16,
    },
    contentItem: {
      fontSize: 16,
      marginBottom: 12,
      flexDirection: 'row',
      alignItems: 'center',
    },
    contentIcon: {
      marginRight: 8,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 16,
    },
    button: {
      flex: 1,
      padding: 10,
      borderRadius: 8,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    deleteButton: {
      backgroundColor: 'red',
      marginRight: 4,
    },
    updateButton: {
      backgroundColor: '#3498db',
      marginLeft: 4,
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      marginLeft: 8,
    },
    descriptionContainer: {
      marginBottom: 16,
      maxHeight: heightPercentageToDP(20),
    },
    descriptionText: {
      fontSize: 16,
    },
    deletionMessage: {
      color: 'red',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 10,
    },
  });

  const handleUpdate = () => {
    // Add navigation logic to navigate to the update screen
    navigation.navigate('Edit', { item });
  };

  const handleDelete = () => {
    // Show an alert to confirm deletion
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this coffee item?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            // Send a DELETE request to your server to delete the coffee item
            axios
              .delete(`http://192.168.88.164:3000/api/delete-coffee/${item.id}`)
              .then(response => {
                // Handle the success response here, e.g., show a confirmation message
            
             
                  setDeletionMessage('');
                  navigation.navigate('HomeAdmin');
               
              })
              .catch(error => {
                // Handle errors, e.g., show an error message
                console.error('Error deleting coffee item:', error);
              });
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: item.imageUri }} style={styles.image} />
      <TouchableOpacity
        style={styles.backButtonContainer}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" size={30} style={styles.backButton} />
      </TouchableOpacity>
      <View style={styles.detailsContainer}>
        <View style={styles.contentItem}>
          <Icon name="coffee" size={20} color="#955629" style={styles.contentIcon} />
          <Text>{item.name}</Text>
        </View>
        <View style={styles.contentItem}>
          <Icon name="folder" size={20} color="#955629" style={styles.contentIcon} />
          <Text>Category: {item.categoryId}</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <ScrollView>
            <Text style={styles.descriptionText}>{item.description}</Text>
          </ScrollView>
        </View>
        <View style={styles.contentItem}>
          <Icon name="attach-money" size={20} color="#955629" style={styles.contentIcon} />
          <Text>Price: {item.price}</Text>
        </View>
        <View style={styles.contentItem}>
          <Icon name="restaurant" size={20} color="#955629" style={styles.contentIcon} />
          <Text>Ingredients: {item.ingredients}</Text>
        </View>
        <View style={styles.contentItem}>
          <Icon name="room-service" size={20} color="#955629" style={styles.contentIcon} />
          <Text>Serving Size: {item.servingSize}</Text>
        </View>
        <View style={styles.contentItem}>
          <Icon name="local-cafe" size={20} color="#955629" style={styles.contentIcon} />
          <Text>Caffeine Content: {item.caffeineContent}</Text>
        </View>
        <View style={styles.contentItem}>
          <Icon name="room" size={20} color="#955629" style={styles.contentIcon} />
          <Text>Origin: {item.origin}</Text>
        </View>
        <View style={styles.contentItem}>
          <Icon name="whatshot" size={20} color="#955629" style={styles.contentIcon} />
          <Text>Roast Level: {item.roastLevel}</Text>
        </View>
        {/* Deletion message */}
      
        <View style={styles.buttonContainer}>
          {/* Delete button */}
          <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={handleDelete}
          
          >
            <Icon name="delete" size={20} color="white" style={styles.contentIcon} />
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
          {/* Update button */}
          <TouchableOpacity
            style={[styles.button, styles.updateButton]}
            onPress={handleUpdate}
          >
            <Icon name="update" size={20} color="white" style={styles.contentIcon} />
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default CoffeeDetailScreen;
