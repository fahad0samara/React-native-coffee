/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, TextInput, Button, Alert} from 'react-native';
import SQLite from 'react-native-sqlite-2';

const db = SQLite.openDatabase('users.db');

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users WHERE email = ? AND password = ?',
        [email, password],
        (_, {rows}) => {
          if (rows.length > 0) {
            const user = rows.item(0);
            if (user.role === 'admin') {
              navigation.navigate('AdminHome');
            } else {
              navigation.navigate('TabNavigation',{user}
);
             
            }
          } else {
            Alert.alert('Error', 'Invalid email or password');
          }
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
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
