import React, { useState } from 'react';
import {   View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  ScrollView,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
 } from 'react-native';

import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import { useDarkMode } from '../../../hooks/useDarkMode';
import {launchImageLibrary} from 'react-native-image-picker';
const Edit = ({ route, navigation }) => {
  const { item } = route.params;
  
  const [editedItem, setEditedItem] = useState(item);
  const isDarkMode = useDarkMode();
  const [imageUri, setImageUri] = useState(item.imageUri);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
        backgroundColor: isDarkMode ? 'black' : 'white',
    },
    input: {
      borderWidth: 1,
      borderColor: 'gray',
      marginBottom: 16,
      padding: 8,
    },
    imageContainer: {
      alignItems: 'center',
      marginBottom: 16,
    },
    image: {
      width: 150,
      height: 150,
      borderRadius: 75,
    },
    selectImageButton: {
      backgroundColor: '#3498db',
      padding: 8,
      borderRadius: 4,
      marginTop: 8,
    },
    selectImageButtonText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });

  const handleImageSelection = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0];
        console.log('Selected image:', selectedImage.uri);
        setImageUri(selectedImage.uri);
      }
    });
  };
const handleSave = () => {
  // Check if editedItem is defined and has the necessary properties
  if (editedItem && editedItem.imageUri) {
    // Include the updated image URI in the edited item
    const updatedCoffeeItem = { ...editedItem, imageUri };

    // Send a PUT or PATCH request to update the coffee item on the server
    axios
      .put(`http://192.168.88.171:3000/api/update-coffee/${editedItem.id}`, updatedCoffeeItem)
      .then(response => {
        // Handle the success response here, e.g., show a confirmation message
        Alert.alert(
          'Success',
          'Coffee item updated successfully!',
          [
            {
              text: 'OK',
              onPress: () => {
                // Navigate back to the coffee detail screen and pass the updated item as a parameter
                navigation.navigate('DetailsAdmin', { item: updatedCoffeeItem });
              },
            },
          ],
          { cancelable: false }
        );
      })
      .catch(error => {
        // Handle errors, e.g., show an error message
        console.error('Error updating coffee item:', error);
        Alert.alert(
          'Error',
          'An error occurred while updating the coffee item.',
          [{ text: 'OK', onPress: () => {} }],
          { cancelable: false }
        );
      });
  } else {
    // Handle the case where editedItem is undefined or lacks the required properties
    console.error('Invalid editedItem:', editedItem);
    Alert.alert(
      'Error',
      'Invalid editedItem. Please check the data and try again.',
      [{ text: 'OK', onPress: () => {} }],
      { cancelable: false }
    );
  }
};




  return (
       <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="#955629"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerText}>
            update the coffee
        </Text>
      </View>
   
         <ScrollView style={styles.scrollView}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUri }} style={styles.image} />
        <TouchableOpacity
          style={styles.selectImageButton}
          onPress={handleImageSelection}
        >
          <Text style={styles.selectImageButtonText}>Select Image</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={editedItem.name}
        onChangeText={text => setEditedItem({ ...editedItem, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={editedItem.categoryId}
        onChangeText={text => setEditedItem({ ...editedItem, categoryId: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={editedItem.description}
        onChangeText={text => setEditedItem({ ...editedItem, description: text })}
      />
      {/* Add similar TextInput components for other fields */}
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={editedItem.price}
        onChangeText={text => setEditedItem({ ...editedItem, price: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Ingredients"
        value={editedItem.ingredients}
        onChangeText={text => setEditedItem({ ...editedItem, ingredients: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Serving Size"
        value={editedItem.servingSize}
        onChangeText={text => setEditedItem({ ...editedItem, servingSize: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Caffeine Content"
        value={editedItem.caffeineContent}
        onChangeText={text => setEditedItem({ ...editedItem, caffeineContent: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Origin"
        value={editedItem.origin}
        onChangeText={text => setEditedItem({ ...editedItem, origin: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Roast Level"
        value={editedItem.roastLevel}
        onChangeText={text => setEditedItem({ ...editedItem, roastLevel: text })}
      />
      <Button title="Save" onPress={handleSave} />

     </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Edit;
