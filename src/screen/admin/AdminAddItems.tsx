import React, {useState} from 'react';
import {
  View,
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
import SQLite from 'react-native-sqlite-2';
import {coffeeCategories} from '../../data/data';
import {Picker} from '@react-native-picker/picker'; // Import Picker from the new package
import {launchImageLibrary} from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDarkMode} from '../../hooks/useDarkMode';


const AddCoffeeScreen = ({navigation}) => {
  const isDarkMode = useDarkMode();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [price, setPrice] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [servingSize, setServingSize] = useState('');
  const [caffeineContent, setCaffeineContent] = useState('');
  const [origin, setOrigin] = useState('');
  const [roastLevel, setRoastLevel] = useState('');


  const handleAddCoffee = async () => {
    // Create a FormData object for multipart/form-data
    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      name: 'coffeeImage.jpg',
      type: 'image/jpeg',
    });

    // Add other fields to the formData
    formData.append('id', Math.random().toString(36).substr(2, 9));
    formData.append('categoryId', selectedCategory);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('ingredients', ingredients);
    formData.append('servingSize', servingSize);
    formData.append('caffeineContent', caffeineContent);
    formData.append('origin', origin);
    formData.append('roastLevel', roastLevel);

    try {
      const response = await fetch('http://192.168.88.164:3000/api/add-coffee', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const data = await response.json();
      if (response.status === 200) {
        Alert.alert('Success', 'Coffee item added successfully');
       navigation.navigate('HomeAdmin');
      
      } else {
        Alert.alert('Error', 'Failed to add coffee item');
      }
    } catch (error) {
      console.error('Error adding coffee item:', error);
      Alert.alert('Error', 'An error occurred while adding coffee item');
    }
  };

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

  const styles = StyleSheet.create({
    container: {
      padding: wp(5),
      flex: 1,
      backgroundColor: isDarkMode ? '#000' : '#fff',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: hp(3),
      paddingHorizontal: wp(2),
    },
    scrollView: {
      flex: 1,
      paddingHorizontal: wp(5),
    },
    headerText: {
      fontSize: wp(5),
      marginLeft: wp(2),
      color: '#fff',
    },
    column: {
      flexDirection: 'column',
      marginBottom: hp(3),
    },
    picker: {
      marginBottom: hp(2),
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: wp(4),

      paddingHorizontal: wp(2),
      paddingVertical: hp(1),
      fontSize: wp(4),
      backgroundColor: '#955629',
      color: '#fff',
    },
    input: {
      marginBottom: hp(2),
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: wp(2),
      paddingHorizontal: wp(2),
      paddingVertical: hp(1),
      fontSize: wp(4),
      color: '#000',
      backgroundColor: isDarkMode ? '#555' : '#f0f0f0',
    },
    uploadImage: {
      marginBottom: hp(3),
    },
    imageContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    image: {
      width: wp(25),
      height: wp(25),
      resizeMode: 'cover',
      borderRadius: wp(20),
      marginRight: wp(2),
    },
    uploadText: {
      color: isDarkMode ? 'white' : 'black',
      fontSize: wp(5),
      marginLeft: 5,
    },
    exampleText: {
      color: isDarkMode ? '#fff' : '#000',
      fontSize: wp(4),
      marginBottom: hp(1),
    },
  });
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
        <Text style={styles.headerText}>Add Coffee</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.column}>
          <TouchableOpacity
            onPress={handleImageSelection}
            style={styles.uploadImage}>
            <View style={styles.imageContainer}>
              {imageUri ? (
                <Image source={{uri: imageUri}} style={styles.image} />
              ) : (
                <Ionicons name="images" size={wp(13)} color="#955629" />
              )}
              <Text style={styles.uploadText}>
                {imageUri ? 'Change Image' : 'Upload the image here'}
              </Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.exampleText}> Select a category</Text>
          <Picker
            style={styles.picker}
            selectedValue={selectedCategory}
            onValueChange={itemValue => setSelectedCategory(itemValue)}>
            {coffeeCategories.map(category => (
              <Picker.Item
                key={category.id}
                label={category.name}
                value={category.id}
              />
            ))}
          </Picker>

          {/* Input fields for other coffee properties */}
          <TextInput
            placeholderTextColor={isDarkMode ? '#fff' : '#999'}
            style={styles.input}
            placeholderTextColor={isDarkMode ? '#fff' : '#999'}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            placeholderTextColor={isDarkMode ? '#fff' : '#999'}
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />

          <TextInput
            placeholderTextColor={isDarkMode ? '#fff' : '#999'}
            style={styles.input}
            placeholder="Price"
            value={price}
            onChangeText={setPrice}
          />
          <TextInput
            style={styles.input}
            placeholderTextColor={isDarkMode ? '#fff' : '#999'}
            placeholder="Ingredients"
            value={ingredients}
            onChangeText={setIngredients}
          />
          <TextInput
            placeholderTextColor={isDarkMode ? '#fff' : '#999'}
            style={styles.input}
            placeholder="Serving Size"
            value={servingSize}
            onChangeText={setServingSize}
          />
          <TextInput
            placeholderTextColor={isDarkMode ? '#fff' : '#999'}
            style={styles.input}
            placeholder="Caffeine Content"
            value={caffeineContent}
            onChangeText={setCaffeineContent}
          />
          <TextInput
            placeholderTextColor={isDarkMode ? '#fff' : '#999'}
            style={styles.input}
            placeholder="Origin"
            value={origin}
            onChangeText={setOrigin}
          />
          <TextInput
            placeholderTextColor={isDarkMode ? '#fff' : '#999'}
            style={styles.input}
            placeholder="Roast Level"
            value={roastLevel}
            onChangeText={setRoastLevel}
          />
          <Button
            title="Add Coffee"
            color="#955629"
            onPress={handleAddCoffee}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddCoffeeScreen;
