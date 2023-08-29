/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App.tsx';
import {name as appName} from './app.json';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import a different icon set
// Import the icon library

// Load the icon font
Icon.loadFont();

AppRegistry.registerComponent(appName, () => App);
