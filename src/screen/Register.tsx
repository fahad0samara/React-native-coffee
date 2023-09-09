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
import { useDarkMode } from '../hooks/useDarkMode';
import axios from 'axios';

const db = SQLite.openDatabase('users.db');

const Register = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [profileImage, setprofileImage] = useState(null);
  const [role, setRole] = useState('user'); // Default role is 'user'

    const isDarkMode = useDarkMode();
const handleRegister = async () => {
  if (!name) {
    Alert.alert('Error', 'Please enter your name');
    return;
  }
  if (!email) {
    Alert.alert('Error', 'Please enter your email');
    return;
  }

  try {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('role', role);

    if (profileImage) {
      formData.append('profile_image', {
        uri: profileImage,
        name: 'profile_image',
        type: 'image/jpg',
      });
    }

    const response = await fetch('http://192.168.88.84:3000/auth/register', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const data = await response.json();
    console.log('Server response:', data);

    if (data.message === 'User registered successfully') {
      Alert.alert('Success', 'User registered successfully');
      navigation.navigate('Login');
    } else {
      console.log('Server error:', data.error);
      Alert.alert('Error', data.error || 'An error occurred while registering user');
    }
  } catch (error) {
    console.log('Error registering user:', error);
    Alert.alert('Error', 'An error occurred while registering user');
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
        setprofileImage(selectedImage.uri);
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
          the exciting features of our app!
        </Text>
      </View>
            <TouchableOpacity onPress={handleImageSelection} style={styles.uploadImage}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.image} />
        ) : (
          <Ionicons name="person-circle-outline" size={wp(30)} color="#955629" />
         
        )}
        <Text style={styles.uploadText}>
          {profileImage ? 'Change Image' : 'Upload Your Image Here'}
        </Text>
      </TouchableOpacity>
      {profileImage ? (
        <TouchableOpacity  onPress={() => setprofileImage(null)}style={styles.deleteImage}>
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
        onPress={handleRegister}
      >
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginLink}>Already have an account? Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};


export default Register;
