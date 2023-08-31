import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

const HomeAdmin = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [coffeeItems, setCoffeeItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCoffeeItems = async () => {
    try {
      const response = await fetch('http://192.168.88.164:3000/api/coffee-items');
      const data = await response.json();
      setCoffeeItems(data);

      const uniqueCategories = [...new Set(data.map(item => item.categoryId))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.log('Error fetching coffee data:', error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchCoffeeItems();
    }
  }, [isFocused]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.coffeeItemContainer}
      onPress={() => navigateToDetails(item)}>
      <Image source={{ uri: item.imageUri }} style={styles.coffeeItemImage} />
      <View style={styles.coffeeItemInfo}>
        <Text style={styles.coffeeItemName}>{item.name}</Text>
        <Text style={styles.coffeeItemDescription}>{item.description}</Text>
        <Text style={styles.coffeeItemPrice}>Price: {item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderCategoryItem = ({ item }) => (
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

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryList}
      />
      <FlatList
        data={filteredCoffeeItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  categoryList: {
    marginBottom: 16,
  },
  listContainer: {
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  coffeeItemContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  coffeeItemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  coffeeItemInfo: {
    marginLeft: 12,
    flex: 1,
  },
  coffeeItemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  coffeeItemDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  coffeeItemPrice: {
    fontSize: 16,
    color: '#e74c3c',
  },
  categoryItem: {
    backgroundColor: '#3498db',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
    height: 40,
    justifyContent: 'center',
  },
  selectedCategoryItem: {
    backgroundColor: '#e74c3c',
  },
  categoryName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});

export default HomeAdmin;
