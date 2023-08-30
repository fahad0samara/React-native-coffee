import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import SQLite from 'react-native-sqlite-2';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDarkMode } from '../../hooks/useDarkMode';


const db = SQLite.openDatabase('users.db');

const RegisterADMIN = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [imageUri, setImageUri] = useState(null);
    const [role, setRole] = useState('user');
    const isDarkMode = useDarkMode();


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
                const values = [email, password, name, imageUri || '', 'admin'];
                tx.executeSql(
                  'INSERT INTO users (email, password, name, imageUri, role) VALUES (?, ?, ?, ?, ?)',
                  values,

                  (_, { rowsAffected }) => {

                    if (rowsAffected > 0) {
                      Alert.alert(
                        'Success',
                        'You have registered successfully',
                        [
                          {
                            text: 'Ok',
                            onPress: () => navigation.navigate('Login'),
                          },
                        ],
                      );
                            
                    

                        

              
                    
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

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1, // Allow content to grow and scroll
    justifyContent: 'center',
    
    backgroundColor: isDarkMode ? 'black' : 'white',
 
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: hp(2),
         color: isDarkMode ? 'white' : 'black',
  },
  title: {
    fontSize: wp(7),
    color: 'black',
    fontFamily: 'Helvetica-Bold',
    marginBottom: hp('1%'),
    color:'#955629',
  },
  subtitle: {
    fontSize: wp(5),
       color: isDarkMode ? 'white' : 'black',

 
    textAlign: 'center',
  },
  uploadImage: {
    alignItems: 'center',
    marginTop: hp('3%'),
  },
  deleteImage: {
    alignItems: 'center',
    marginTop: hp('1%'),
  },
  deleteText: {
    color: 'red',
  },
  input: {
    borderWidth: 3,
 borderColor: '#955629',
    padding: hp(1.5),
    borderRadius: 14,
    marginBottom: hp(1),
    marginTop:hp(1),
    color: isDarkMode ? 'white' : 'black',

    

  },
  image: {
    width: wp(25),
    height: wp(25),
    resizeMode: 'cover',
    borderRadius: wp(20),
  },
  uploadText: {
     color: isDarkMode ? 'white' : 'black',
    marginTop: hp('3%'),
  },
  registerButton: {
    backgroundColor: '#955629',
    padding: hp('2%'),
    borderRadius: 8,
    alignItems: 'center',
    marginTop: hp('3%'),
  },
  registerButtonText: {
    color: 'white',
    fontSize: wp('4%'),
  },
  loginLink: {
    marginTop: hp('2%'),
    textAlign: 'center',
color: isDarkMode ? 'white' : 'black',
    textDecorationLine: 'underline',
  },
});

  return (
    <ScrollView contentContainerStyle={styles.container}>
    
        <View style={styles.textContainer}>
        <Text style={styles.title}>Create account</Text>
        <Text style={styles.subtitle}>
          Create an account so you can explore all 
          the exciting features of our app
        </Text>
      </View>
            <TouchableOpacity onPress={handleImageSelection} style={styles.uploadImage}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <Ionicons name="person-circle-outline" size={wp(30)} color="#955629" />
         
        )}
        <Text style={styles.uploadText}>
          {imageUri ? 'Change Image' : 'Upload Your Image Here'}
        </Text>
      </TouchableOpacity>
      {imageUri ? (
        <TouchableOpacity  onPress={() => setImageUri(null)}style={styles.deleteImage}>
          <Text style={styles.deleteText}>Delete Image</Text>
        </TouchableOpacity>
      ) : null}
         <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
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
   
    
  
      <TouchableOpacity
        style={styles.registerButton}
        onPress={handleRegistration}
      >
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginLink}>Already have an account? Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};


export default RegisterADMIN;
