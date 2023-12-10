import React, {useEffect, useState} from 'react';
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
import {useSelector} from 'react-redux';
import {useDarkMode} from '../hooks/useDarkMode';

const Home = ({navigation}) => {
  const user = useSelector(state => state.auth.user);
  const isDarkMode = useDarkMode();
  const [coffeeData, setCoffeeData] = useState([]); // State to store coffee data
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    // Fetch coffee data from the server
    fetch('http://192.168.88.84:3000/api/coffee-items')
      .then(response => response.json())
      .then(data => {
        console.log('Data fetched successfully. Data:', data);
        setCoffeeData(data); // Update the coffeeData state with fetched data
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleCategoryPress = categoryId => {
    setSelectedCategory(categoryId);
  };
    const [isFavourite, setIsFavourite] = useState(false);

  const toggleFavourite = () => {
    setIsFavourite(!isFavourite);
    // Handle favorite toggle logic here
  };


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
  <TouchableOpacity
      onPress={() => navigation.navigate('Destination', { ...item })}
      style={styles.DestinationCard}>
      <Image source={{ uri: item.imageUri }} style={styles.avatarr} />

      <TouchableOpacity
        onPress={() => toggleFavourite(!isFavourite)}
        style={styles.heartIcon}>
        <Icon name="heart" size={20} color={isFavourite ? 'red' : '#fff'} />
      </TouchableOpacity>

      <View style={styles.infoContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>${item.price}</Text>
        </View>
        <TouchableOpacity style={styles.cartIconContainer}>
          <Icon name="shopping-cart" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const filteredCoffeeData = selectedCategory
    ? coffeeData.filter(item => item.categoryId === selectedCategory)
    : coffeeData;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? 'black' : 'white',
    },
 DestinationCard: {
    position: 'relative',
    marginBottom: 20,
    width: '48%', // Adjust the width to fit two items per row
    
    
   



    
  },
avatarr: {
  width: '100%',
  height: 200,
  resizeMode: 'cover',
  borderRadius: 8,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
},


  heartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 8,
    borderRadius: 50,
  },
  infoContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  price: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  cartIconContainer: {
    backgroundColor: '#955629',
    padding: 8,
    borderRadius: 50,
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
      color: isDarkMode ? 'white' : 'black',
      marginTop: 4,
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






  });

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.backgroundImage}>
        <Image
          source={require('../image/profile.png')}
          style={styles.leftImage}
          resizeMode="cover"
        />
        <Image
          source={require('../image/profile.png')}
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
            <Text style={styles.greetingText}>Hi, {user.name}</Text>
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
            numColumns={2}


        />
      </SafeAreaView>
    </View>
  );
};

export default Home;
