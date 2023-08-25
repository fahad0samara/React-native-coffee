/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';

import {StyleSheet} from 'react-native';

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.backgroundImage}>
        <Image
          source={require('../image/dd.png')}
          style={styles.leftImage}
          resizeMode="cover"
        />
        <Image
          source={require('../image/dd.png')}
          style={styles.rightImage}
          resizeMode="cover"
        />
      </View>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.userContainer}>
          <View style={styles.userAvatarContainer}>
            <Image source={require('../image/dd.png')} style={styles.avatar} />
          </View>
          <View style={styles.userDetailsContainer}>
            <Text style={styles.greetingText}>Hi, John!</Text>
            <Text style={styles.sloganText}>
              What would you like to drink today?
            </Text>
          </View>
        </View>

        <TouchableOpacity
            onPress={() => navigation.navigate('Search')} style={styles.searchBarContainer}>
          
          <View style={styles.searchIconContainer}>
            <Icon name="search" size={20} color="#6b4226" />
          </View>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for products..."
            placeholderTextColor="#6b4226"
          />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backgroundImage: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: heightPercentageToDP(9),
    borderBottomLeftRadius: widthPercentageToDP(15),
    borderBottomRightRadius: widthPercentageToDP(15),
    backgroundColor: '#6b4226',
  },
  leftImage: {
    height: widthPercentageToDP(15),
    width: widthPercentageToDP(20),
    marginLeft: widthPercentageToDP(5),
  },
  rightImage: {
    height: widthPercentageToDP(15),
    width: widthPercentageToDP(20),
    marginRight: widthPercentageToDP(5),
  },
  safeAreaView: {
    paddingHorizontal: widthPercentageToDP(5),
    paddingTop: heightPercentageToDP(5),
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  userAvatarContainer: {
    marginRight: 15,
  },
  userDetailsContainer: {},
  avatar: {
    height: widthPercentageToDP(10),
    width: widthPercentageToDP(10),
    borderRadius: widthPercentageToDP(5),
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  searchIconContainer: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderColor:'#6b4226'


  },
  searchInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    color: '#6b4226',

  },
  greetingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6b4226',
  },
  sloganText: {
    fontSize: 16,
    color: '#6b4226',
  },
});

export default HomeScreen;
