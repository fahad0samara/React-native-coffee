import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, Alert ,StyleSheet} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import SQLite from 'react-native-sqlite-2';

const db = SQLite.openDatabase('users.db');

const Register = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [imageUri, setImageUri] = useState(null);

  const handleRegistration = () => {
  if (!validateEmail(email)) {
    Alert.alert('Error', 'Please enter a valid email address');
    return;
  }

  if (password.length < 6) {
    Alert.alert('Error', 'Password should be at least 6 characters');
    return;
  }

  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT, name TEXT, imageUri TEXT, role TEXT)',
      [],
      () => {
        tx.executeSql(
          'SELECT * FROM users WHERE email = ?',
          [email],
          (_, { rows }) => {
            if (rows.length > 0) {
              Alert.alert('Error', 'User already exists');
            } else {
              const values = [email, password, name, imageUri || '', 'user'];
              tx.executeSql(
                'INSERT INTO users (email, password, name, imageUri, role) VALUES (?, ?, ?, ?, ?)',
                values,
                (_, { rowsAffected }) => {
                  if (rowsAffected > 0) {
                    console.log('User registered successfully');
                    navigation.navigate('Login');
                  } else {
                    console.log('Registration failed');
                  }
                },
              );
            }
          },
        );
      },
    );
  });
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

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
<View style={styles.container}>
  <TextInput
    style={styles.input}
    placeholder="Email"
    value={email}
    onChangeText={setEmail}
  />
  <TextInput
    style={styles.input}
    placeholder="Password"
    value={password}
    onChangeText={setPassword}
    secureTextEntry
  />
  <TextInput
    style={styles.input}
    placeholder="Name"
    value={name}
    onChangeText={setName}
  />
  <TouchableOpacity onPress={handleImageSelection}>
    <Text style={styles.selectImage}>Select Image</Text>
  </TouchableOpacity>
  {imageUri ? (
    <View style={styles.imageContainer}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <View style={styles.imageButtonsContainer}>
        <TouchableOpacity
          style={styles.imageButton}
          onPress={handleImageSelection}
        >
          <Text style={styles.imageButtonText}>Change Image</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.imageButton}
          onPress={() => setImageUri(null)}
        >
          <Text style={styles.imageButtonText}>Delete Image</Text>
        </TouchableOpacity>
      </View>
    </View>
  ) : null}
  <Button
    title="Register"
    onPress={handleRegistration}
    style={styles.registerButton}
  />
</View>

  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    color:"black"
  },
  selectImage: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginBottom: 10,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  imageButtonsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  imageButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'lightgray',
    marginHorizontal: 5,
    borderRadius: 5,
  },
  imageButtonText: {
    color: 'black',
  },
  registerButton: {
    marginTop: 10,
  },
});

export default Register;
