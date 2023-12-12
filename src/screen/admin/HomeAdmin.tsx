import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDarkMode} from '../../hooks/useDarkMode';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import { COFFEE_ITEMS_URL } from '../../apiConfig';

const HomeAdmin = ({navigation}) => {
  const isFocused = useIsFocused();
  const [coffeeItems, setCoffeeItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Espresso");
    const [isLoading, setIsLoading] = useState(true); // Add loading state
  const isDarkMode = useDarkMode();

 const fetchCoffeeItems = async () => {
    try {
      const response = await fetch(COFFEE_ITEMS_URL);
      const data = await response.json();
      setCoffeeItems(data);

      const uniqueCategories = [...new Set(data.map((item) => item.categoryId))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.log('Error fetching coffee data:', error);
    } finally {
      setIsLoading(false); // Set loading to false when done
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchCoffeeItems();
    }
  }, [isFocused]);

  const navigateToDetails = item => {
    // Add navigation logic to navigate to the details screen
    navigation.navigate('DetailsAdmin', {item});
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.coffeeItem}
      onPress={() => navigateToDetails(item)}>
      <Image source={{uri: item.imageUri}} style={styles.itemImage} />
      <View style={styles.itemOverlay}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>{item.price}</Text>
      </View>
      <TouchableOpacity style={styles.itemIconContainer}>
        <Icon name="arrow-right" size={20} color="#fff" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderCategoryItem = ({item}) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item && styles.selectedCategoryItem,
      ]}
      onPress={() => setSelectedCategory(item)}>
      <Text style={styles.categoryName}>{item}</Text>
    </TouchableOpacity>
  );

  const filteredCoffeeItems = selectedCategory
    ? coffeeItems.filter(item => item.categoryId === selectedCategory)
    : coffeeItems;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? 'black' : 'white',
    },
    backgroundImage: {
      width: '100%',
      height: heightPercentageToDP(9),

      borderBottomLeftRadius: widthPercentageToDP(50),
      borderBottomRightRadius: widthPercentageToDP(50),
      backgroundColor: '#955629',

    },

    safeAreaView: {
      paddingHorizontal: widthPercentageToDP(5),
      paddingTop: heightPercentageToDP(5),
    },
    coffeeItem: {
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: 8,
      marginBottom: 16,
      elevation: 3,
      overflow: 'hidden', // Clip child elements within the item
    },
    itemImage: {
      width: '100%',
      height: heightPercentageToDP(18),
      resizeMode: 'cover',
    },
    itemOverlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.4)', // Background overlay color
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 5,
    },
    itemName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
    },
    itemPrice: {
      fontSize: 16,
      color: 'white',
      marginBottom: widthPercentageToDP(-7),
    },
    itemIconContainer: {
      position: 'absolute',
      bottom: 10,
      right: 10,
      backgroundColor: '#955629',

      padding: 8,
      borderRadius: 20,
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
      backgroundColor: '#6b4226',
    },
    categoryName: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
    },
    coffeeList: {
      paddingBottom: widthPercentageToDP(40),
      marginTop:-widthPercentageToDP (1) ,
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.backgroundImage}>
    
     
      </View>
       {isLoading ? ( // Render loading indicator if isLoading is true
          <ActivityIndicator size="large" color={isDarkMode ? 'white' : 'black'} />
        ) : (
      <SafeAreaView style={styles.safeAreaView}>
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={item => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryList}
        />
        <FlatList
          data={filteredCoffeeItems}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.coffeeList}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          // marginbottm

          
       




        />
      </SafeAreaView>
      )}
    </View>
  );
};

export default HomeAdmin;
