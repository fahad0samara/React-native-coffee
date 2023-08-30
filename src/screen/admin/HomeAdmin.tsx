import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, Image} from 'react-native';
import SQLite from 'react-native-sqlite-2';

const db = SQLite.openDatabase('users.db');

const HomeAdmin = () => {
  const [coffeeItems, setCoffeeItems] = useState([]);

  useEffect(() => {
    fetchCoffeeItems();
  }, []);

  const fetchCoffeeItems = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM coffeeData',
        [],
        (_, {rows}) => {
          const data = [];

          for (let i = 0; i < rows.length; i++) {
            data.push(rows.item(i));
       
          }
          setCoffeeItems(data);
          console.log('====================================');
          console.log(data);
          console.log('====================================');
        },
        (_, error) => {
          console.log('Error fetching coffee data:', error);
        },
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text>HomeAdmin</Text>
      <FlatList
        data={coffeeItems}
        renderItem={({item}) => (
          <View style={styles.coffeeItem}>
            <Image source={{uri: item.imageUri}} style={styles.itemImage} />
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
            <Text style={styles.itemPrice}>${item.price}</Text>
            <Text style={styles.itemOrigin}>{item.origin}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  coffeeItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  itemImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 8,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  itemDescription: {
    marginTop: 4,
    color: '#555',
  },
  itemPrice: {
    color: '#955629',
  },
  itemOrigin: {
    marginTop: 4,
    color: '#555',
  },
});

export default HomeAdmin;
