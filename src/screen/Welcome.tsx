/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const WelcomeScreen = ({navigation}) => {
  return (
    <ImageBackground
            source={require('../image/wlcome.jpg')}
      style={styles.backgroundImage}>
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <View style={styles.textBackground}>
            <Text style={styles.title}>Welcome to CoffeeApp!</Text>
            <Text style={styles.subtitle}>
              Your Coffee Experience Starts Here
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => navigation.navigate('MainTab')}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 40,
  },
  textContainer: {
    marginBottom: 30,
    alignItems: 'center', // Center text within the container
  },
  textBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10, // Add some space between title and subtitle
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: '#6b4226',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
