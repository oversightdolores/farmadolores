/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import Splash from './src/components/Splash';
import {name as appName} from './app.json';
/* import '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

// set the host and the port property to connect to the emulator
// set these before any read/write operations occur to ensure it doesn't affect your Cloud Firestore data!
if (__DEV__) {
  firestore().useEmulator('localhost', 8081);
}

const db = firestore(); */

AppRegistry.registerComponent(appName, () => App);
