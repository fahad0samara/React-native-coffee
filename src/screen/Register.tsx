/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import SQLite from 'react-native-sqlite-2';

const db = SQLite.openDatabase('users.db');

const Register
 = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [imageUri, setImageUri] = useState(null);
const handleRegistration = () => {
  console.log('Register button clicked');
if (imageUri === null) {
  console.log('====================================');
  console.log(
    'Error', 'Please select an image'

  );
  console.log('====================================');
    return;
  }




  db.transaction(tx => {
    tx.executeSql('DROP TABLE IF EXISTS users', [], () => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT, name TEXT, imageUri TEXT, role TEXT)',
        [],
        () => {
          tx.executeSql(
            
            'INSERT INTO users (email, password, name, imageUri, role) VALUES (?, ?, ?, ?, ?)',
            [email, password, name, imageUri, 'user'],
            (_, {rowsAffected}) => {
              if (rowsAffected > 0) {
                console.log('====================================');
                console.log('User registered successfully');
                console.log('====================================');
                navigation.navigate('Login');
              } else {
                console.log('====================================');
                console.log('Registration failed');
                console.log('====================================');
              }
            },
          );
        }
      );
    }
    );
  }
  );
}

            
      
    
  



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




  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TouchableOpacity onPress={handleImageSelection}>
        <Text>Select Image</Text>
      </TouchableOpacity>
      {imageUri && (
        <Image
          source={{uri: imageUri}}
          style={{width: 200, height: 200, resizeMode: 'contain'}}
        />
       
      )}
      <Button title="Register" onPress={handleRegistration} />
    </View>
  );
};

export default Register;
;
