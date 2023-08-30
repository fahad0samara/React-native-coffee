import React, {useState} from 'react';
import {View, TextInput, Button, Alert, StyleSheet,

  SafeAreaView,Text,TouchableOpacity,
  ScrollView


} from 'react-native';
import {useDispatch} from 'react-redux';

import SQLite from 'react-native-sqlite-2';
import {login} from '../redux/authSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDarkMode } from '../hooks/useDarkMode';

const db = SQLite.openDatabase('users.db');

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    const isDarkMode = useDarkMode();

  const handleLogin = () => {
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
        'SELECT * FROM users WHERE email = ? AND password = ?',
        [email, password],
        (_, {rows}) => {
          if (rows.length > 0) {
            const user = rows.item(0);
             dispatch(login({ user, role: user.role })); 
        
            if (user.role === 'admin') {
              navigation.replace('AdminHome');
            }
            else{
              navigation.replace('TabNavigation');
            }
            
        
         
          } else {
            Alert.alert('Error', 'Invalid email or password');
          }
        },
      );
    });
  };

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const styles = StyleSheet.create({
  container: {
      
    flexGrow: 1, // Allow content to grow and scroll
    justifyContent: 'center',
     backgroundColor: isDarkMode ? 'black' : 'white',
    padding: 20,

   

  
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#955629',
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 16,
    maxWidth: '60%',
    textAlign: 'center',
     color: isDarkMode ? 'white' : 'black',
     
  },
  inputContainer: {
    marginVertical: 20,
  },
  input: {
   
       borderWidth: 3,
 borderColor: '#955629',
    padding: hp(1.5),
    borderRadius: 14,
    marginBottom: hp(1),
    marginTop:hp(1)
  },
  forgotPassword: {
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    fontSize: 14,
    color: 'gray',
  },
  signInButton: {
    padding: 15,
    backgroundColor: '#955629',
    marginVertical: 20,
    borderRadius: 14,
    shadowColor: '#955629',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  signInButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  createAccountButton: {
    padding: 10,
  },
  createAccountButtonText: {
        color: isDarkMode ? 'white' : 'black',
    textAlign: 'center',
    fontSize: 14,

  },
  orContinueWith: {
    marginVertical: 20,
  },


})


  return (
      <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Login here</Text>
          <Text style={styles.subtitle}>Welcome back, you've been missed!</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
        </View>

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signInButton}
          onPress={handleLogin}
        >
          <Text style={styles.signInButtonText}>Sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          style={styles.createAccountButton}
        >
          <Text style={styles.createAccountButtonText}>Create a new account</Text>
        </TouchableOpacity>

     
      </ScrollView>
    </SafeAreaView>
  );
};


export default LoginScreen;
