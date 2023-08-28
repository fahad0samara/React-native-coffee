import React from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';

import {StyleSheet} from 'react-native';
import {coffeeCategories} from './../data/data';
import {coffeeData} from '../data/data';
import {useState} from 'react';
import {useSelector} from 'react-redux';

const Home = ({navigation}) => {
  const [selectedCategory, setSelectedCategory] = useState('espresso');
  const user = useSelector(state => state.auth.user);

  const handleCategoryPress = categoryId => {
    setSelectedCategory(categoryId);
  };

  const filteredCoffeeData = selectedCategory
    ? coffeeData.filter(item => item.categoryId === selectedCategory)
    : coffeeData;

  const renderCategoryItem = ({item}) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item.id && styles.selectedCategoryItem,
      ]}
      onPress={() => handleCategoryPress(item.id)}>
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderCoffeeItem = ({item}) => (
    <View style={styles.coffeeItem}>
      <Text style={styles.coffeeName}>{item.name}</Text>
      <Text style={styles.coffeeDescription}>{item.description}</Text>
    </View>
  );

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
            <Image
              source={
                user.imageUri
                  ? {uri: user.imageUri}
                  : require('../image/wlcome.jpg')
              }
              style={styles.avatar}
            />
          </View>
          <View style={styles.userDetailsContainer}>
            <Text style={styles.greetingText}>
              Hi,
              {user.name}
            </Text>
            <Text style={styles.sloganText}>
              What would you like to drink today?
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('Search')}
          style={styles.searchBarContainer}>
          <View style={styles.searchIconContainer}>
            <Icon name="search" size={20} color="#955629" />
          </View>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for products..."
            placeholderTextColor="#955629"
          />
        </TouchableOpacity>
        <FlatList
          data={coffeeCategories}
          keyExtractor={item => item.id}
          renderItem={renderCategoryItem}
          horizontal
          contentContainerStyle={styles.categoryList}
        />

        {/* Display coffee data */}
        <FlatList
          data={filteredCoffeeData}
          keyExtractor={item => item.id.toString()}
          renderItem={renderCoffeeItem}
          contentContainerStyle={styles.coffeeList}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  backgroundImage: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: heightPercentageToDP(9),
    borderBottomLeftRadius: widthPercentageToDP(15),
    borderBottomRightRadius: widthPercentageToDP(15),
    backgroundColor: '#955629',
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
    borderColor: '#955629',
  },
  searchInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    color: '#955629',
  },
  greetingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#955629',
  },
  sloganText: {
    fontSize: 16,
    color: '#955629',
  },
  categoryList: {
    paddingHorizontal: widthPercentageToDP(4),
    marginVertical: 20,
  },
  categoryItem: {
    backgroundColor: '#955629',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  selectedCategoryItem: {
    backgroundColor: '#6b4226', // Customize the selected category color
  },
  categoryName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  coffeeList: {
    paddingHorizontal: widthPercentageToDP(5),
  },
  coffeeItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingVertical: 10,
  },
  coffeeName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#955629',
  },
  coffeeDescription: {
    color: '#955629',
    marginTop: 5,
  },
});

export default Home;
