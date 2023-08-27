/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, TextInput, Button, Alert} from 'react-native';
import SQLite from 'react-native-sqlite-2';

const db = SQLite.openDatabase('users.db');

const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT)',
        [],
      );

      tx.executeSql(
        'INSERT INTO users (email, password) VALUES (?, ?)',
        [email, password],
        (_, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert('Success', 'Account created successfully');
            navigation.navigate('Login');
          } else {
            Alert.alert('Error', 'Failed to create account');
          }
        },
        (_, error) => {
          Alert.alert('Error', 'Email already exists');
        },
      );
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
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

export default SignUpScreen;
 