import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the MaterialIcons icon
import { useDarkMode } from '../../hooks/useDarkMode';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';

const CoffeeDetailScreen = ({ route,navigate }) => {
  const { item } = route.params;
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
      zIndex: 1, // To make sure it appears above the image
    },
    backButton: {
      fontSize: 24,
      color: 'white',
 backgroundColor: '#955629',
      padding: 4,
      borderRadius: 4,
      shadowColor:'#fff',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.25,


    },
    detailsContainer: {
      padding: 16,
    },
    contentItem: {
      fontSize: 16,
      marginBottom: 12,
      flexDirection: 'row',
      alignItems: 'center', // To align the icon and text vertically
    },
    contentIcon: {
      marginRight: 8,
    },
    deleteButton: {
      backgroundColor: 'red',
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 16,
      flexDirection: 'row', // Added flexDirection
    },
    deleteButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      marginLeft: 8, // Added margin to separate icon from text
    },
     updateButton: {
      backgroundColor: '#3498db', // You can change the color
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 16,
      flexDirection: 'row',
    },
    updateButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      marginLeft: 8,
    },
  });

   const handleUpdate = () => {
    // Add navigation logic to navigate to the update screen
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
          <Icon name="coffee" size={20} color='#955629'style={styles.contentIcon} />
          <Text>{item.name}</Text>
        </View>
        <View style={styles.contentItem}>
          <Icon name="folder" size={20} color='#955629'style={styles.contentIcon} />
          <Text>Category: {item.categoryId}</Text>
        </View>
        <View style={styles.contentItem}>
          <Icon name="description" size={20} color='#955629'style={styles.contentIcon} />
        
          <Text>{item.description}</Text>
        </View>
        <View style={styles.contentItem}>
          <Icon name="attach-money" size={20} color='#955629'style={styles.contentIcon} />
          <Text>Price: {item.price}</Text>
        </View>
        <View style={styles.contentItem}>
          <Icon name="restaurant" size={20} color='#955629'style={styles.contentIcon} />
          <Text>Ingredients: {item.ingredients}</Text>
        </View>
        <View style={styles.contentItem}>
          <Icon name="room-service" size={20} color='#955629'style={styles.contentIcon} />
          <Text>Serving Size: {item.servingSize}</Text>
        </View>
        <View style={styles.contentItem}>
          <Icon name="local-cafe" size={20} color='#955629'style={styles.contentIcon} />
          <Text>Caffeine Content: {item.caffeineContent}</Text>
        </View>
        <View style={styles.contentItem}>
          <Icon name="room" size={20} color='#955629'style={styles.contentIcon} />
          <Text>Origin: {item.origin}</Text>
        </View>
        <View style={styles.contentItem}>
          <Icon name="whatshot" size={20} color='#955629'style={styles.contentIcon} />
          <Text>Roast Level: {item.roastLevel}</Text>
        </View>
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
          <Icon name="delete" size={20} color="white" style={styles.contentIcon} />
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
         <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
        <Icon name="update" size={20} color="white" style={styles.contentIcon} />
        <Text style={styles.updateButtonText}>Update</Text>
      </TouchableOpacity>
        
      </View>
    </ScrollView>
  );
};

export default CoffeeDetailScreen;
