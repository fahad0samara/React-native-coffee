/* eslint-disable prettier/prettier */
import {View, Text} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const Home = () => {
  return (
      <View>
     <FontAwesome name="rocket" size={30} color="#900" />
      <FontAwesome name="home" size={30} color="#b2b2b2" />
      <FontAwesome name="facebook" size={30} color="#900" />
      <FontAwesome name="google" size={30} color="#000" />
        <Text>ddddd</Text>
      </View>
  );
};

export default Home;
