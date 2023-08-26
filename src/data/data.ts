/* eslint-disable prettier/prettier */

export const coffeeCategories = [
  {id: 'espresso', name: 'Espresso'},
  {id: 'cappuccino', name: 'Cappuccino'},
  {id: 'latte', name: 'Latte'},
  {id: 'mocha', name: 'Mocha'},
  {id: 'americano', name: 'Americano'},
  {id: 'flat_white', name: 'Flat White'},
];

// ... (previous imports and code)

export const coffeeData = [
  // Espresso
  {
    id: 1,
    categoryId: 'espresso',
    name: 'Classic Espresso',
    description:
      'Strong and concentrated coffee made by forcing hot water through finely-ground coffee beans.',
    imageUrl: 'URL_TO_CLASSIC_ESPRESSO_IMAGE',
    price: '$2.99',
    ingredients: 'Coffee beans, water',
    servingSize: '1 shot',
    caffeineContent: 'High caffeine',
    origin: 'Blend of Arabica and Robusta beans',
    roastLevel: 'Dark roast',
  },
  {
    id: 2,
    categoryId: 'espresso',
    name: 'Double Espresso',
    description: 'A double shot of espresso for an extra kick.',
    imageUrl: 'URL_TO_DOUBLE_ESPRESSO_IMAGE',
    price: '$3.49',
    ingredients: 'Coffee beans, water',
    servingSize: '2 shots',
    caffeineContent: 'Very high caffeine',
    origin: 'Single-origin Ethiopian beans',
    roastLevel: 'Medium-dark roast',
  },

  // Cappuccino
  {
    id: 3,
    categoryId: 'cappuccino',
    name: 'Caramel Cappuccino',
    description:
      'Espresso with steamed milk, caramel flavor, and a layer of froth.',
    imageUrl: 'URL_TO_CARAMEL_CAPPUCINO_IMAGE',
    price: '$4.29',
    ingredients: 'Espresso, steamed milk, caramel syrup, froth',
    servingSize: 'Medium',
    caffeineContent: 'Moderate caffeine',
    origin: 'Blend of Central and South American beans',
    roastLevel: 'Medium roast',
  },
  {
    id: 4,
    categoryId: 'cappuccino',
    name: 'Hazelnut Cappuccino',
    description: 'Espresso with steamed milk and hazelnut flavor.',
    imageUrl: 'URL_TO_HAZELNUT_CAPPUCINO_IMAGE',
    price: '$4.49',
    ingredients: 'Espresso, steamed milk, hazelnut syrup, froth',
    servingSize: 'Medium',
    caffeineContent: 'Moderate caffeine',
    origin: 'Blend of South American and Indonesian beans',
    roastLevel: 'Medium-dark roast',
  },

  // Latte
  {
    id: 5,
    categoryId: 'latte',
    name: 'Vanilla Latte',
    description: 'Espresso with steamed milk and vanilla flavor.',
    imageUrl: 'URL_TO_VANILLA_LATTE_IMAGE',
    price: '$4.99',
    ingredients: 'Espresso, steamed milk, vanilla syrup',
    servingSize: 'Medium',
    caffeineContent: 'Moderate caffeine',
    origin: 'Blend of Central American and African beans',
    roastLevel: 'Medium roast',
  },
  {
    id: 6,
    categoryId: 'latte',
    name: 'Coconut Latte',
    description: 'Espresso with steamed coconut milk for a tropical twist.',
    imageUrl: 'URL_TO_COCONUT_LATTE_IMAGE',
    price: '$5.29',
    ingredients: 'Espresso, steamed coconut milk, coconut syrup',
    servingSize: 'Medium',
    caffeineContent: 'Moderate caffeine',
    origin: 'Blend of South American and Asian beans',
    roastLevel: 'Light roast',
  },

  // Mocha
  {
    id: 7,
    categoryId: 'mocha',
    name: 'Chocolate Mocha',
    description:
      'Espresso with chocolate syrup, steamed milk, and whipped cream.',
    imageUrl: 'URL_TO_CHOCOLATE_MOCHA_IMAGE',
    price: '$5.49',
    ingredients: 'Espresso, chocolate syrup, steamed milk, whipped cream',
    servingSize: 'Medium',
    caffeineContent: 'Moderate caffeine',
    origin: 'Blend of Central American and African beans',
    roastLevel: 'Medium-dark roast',
  },
  {
    id: 8,
    categoryId: 'mocha',
    name: 'White Chocolate Mocha',
    description: 'Espresso with white chocolate syrup and creamy steamed milk.',
    imageUrl: 'URL_TO_WHITE_CHOCOLATE_MOCHA_IMAGE',
    price: '$5.99',
    ingredients: 'Espresso, white chocolate syrup, steamed milk, whipped cream',
    servingSize: 'Medium',
    caffeineContent: 'Moderate caffeine',
    origin: 'Blend of South American and African beans',
    roastLevel: 'Medium roast',
  },

  // Americano
  {
    id: 9,
    categoryId: 'americano',
    name: 'Iced Americano',
    description: 'Chilled espresso diluted with water and served over ice.',
    imageUrl: 'URL_TO_ICED_AMERICANO_IMAGE',
    price: '$3.99',
    ingredients: 'Espresso, water, ice',
    servingSize: 'Medium',
    caffeineContent: 'Moderate caffeine',
    origin: 'Blend of Central and South American beans',
    roastLevel: 'Medium-dark roast',
  },
  {
    id: 10,
    categoryId: 'americano',
    name: 'Black Americano',
    description: 'A classic Americano made with hot water and espresso.',
    imageUrl: 'URL_TO_BLACK_AMERICANO_IMAGE',
    price: '$3.49',
    ingredients: 'Espresso, water',
    servingSize: 'Medium',
    caffeineContent: 'Moderate caffeine',
    origin: 'Blend of Central and South American beans',
    roastLevel: 'Medium-dark roast',
  },

  // Flat White
  {
    id: 11,
    categoryId: 'flat_white',
    name: 'Classic Flat White',
    description:
      'Espresso with velvety steamed milk and a thin layer of microfoam.',
    imageUrl: 'URL_TO_CLASSIC_FLAT_WHITE_IMAGE',
    price: '$4.99',
    ingredients: 'Espresso, steamed milk, microfoam',
    servingSize: 'Medium',
    caffeineContent: 'Moderate caffeine',
    origin: 'Blend of Australian and African beans',
    roastLevel: 'Medium roast',
  },
  {
    id: 12,
    categoryId: 'flat_white',
    name: 'Caramel Flat White',
    description:
      'Espresso with steamed milk, caramel flavor, and a smooth finish.',
    imageUrl: 'URL_TO_CARAMEL_FLAT_WHITE_IMAGE',
    price: '$5.29',
    ingredients: 'Espresso, steamed milk, caramel syrup, microfoam',
    servingSize: 'Medium',
    caffeineContent: 'Moderate caffeine',
    origin: 'Blend of Central American and African beans',
    roastLevel: 'Medium-dark roast',
  },
];

// ... (rest of the code)
