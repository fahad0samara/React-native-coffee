/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  Button,
  Alert,
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'MainDB',
    location: 'default',
  },
  () => {},
  error => {
    console.log(error);
  },
);

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    createTable();
  }, []);

  const createTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS ' +
          'Users ' +
          '(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Email TEXT, Password TEXT);',
      );
    });
  };

const handleLogin = () => {
  console.log('Login button clicked');
  if (email.length === 0 || password.length === 0) {
    Alert.alert('Warning!', 'Please enter your email and password.');
    return;
  }

  let queryString = '';
  queryString = 'SELECT * FROM Users WHERE email = ? AND password = ?'; // Use lowercase column names
  db.transaction(tx => {
    tx.executeSql(
      queryString,
      [email, password],
      (tx, results) => {
        console.log('Query completed');
        const len = results.rows.length;
        if (len > 0) {
          navigation.navigate('TabNavigation');
        } else {
          Alert.alert('Warning!', 'Email or password is incorrect.');
        }
      },
      error => {
        console.log(error);
      },
    );
  });
};


  return (
    <View style={styles.body}>
      <Image style={styles.logo} source={require('../image/wlcome.jpg')} />
      <Text style={styles.text}>Welcome</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        onChangeText={value => setEmail(value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry
        onChangeText={value => setPassword(value)}
      />
      <Button title="Login" color="#1eb900" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#0080ff',
  },
  logo: {
    width: 200,
    height: 100,
    margin: 20,
  },
  text: {
    fontSize: 30,
    color: '#ffffff',
    marginBottom: 30,
  },
  input: {
    width: 300,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    textAlign: 'center',
    color:"black",
    fontSize: 20,
    marginBottom: 10,
  },
});
