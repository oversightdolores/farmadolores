/**
 * @format
 */

import App from './App';
import {name as appName} from './app.json';
import React, { useEffect } from 'react';
import { AppRegistry, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging'; // Importa el módulo de Firebase Messaging

// Configura el manejador de mensajes en segundo plano
messaging().setBackgroundMessageHandler(async remoteMessage => {
  // Procesa el mensaje en segundo plano
  console.log('Mensaje en segundo plano recibido:', remoteMessage);


});

AppRegistry.registerComponent(appName, () => App);


