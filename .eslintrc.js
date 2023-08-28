
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jest/recommended',
    'plugin:jest/style',
    'plugin:prettier/recommended',
    'prettier/react',
  ],

  plugins: ['react', 'react-native', 'jest', 'prettier'],

  
  env: {
    browser: true,
    es6: true,
    'jest/globals': true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
    'react/prop-types': 0,
    'no-console': 0,
    'no-unused-vars': 0,
    'react/display-name': 0,
    'react/no-unescaped-entities': 0,
  },

};


