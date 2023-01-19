
import {initializeApp} from 'firebase/app';

import auth from '@react-native-firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyAHSg91B1FuAR9cJEAaq_oSO3E3il8BId0",
    authDomain: "farma-61e96.firebaseapp.com",
    databaseURL: "https://farma-61e96-default-rtdb.firebaseio.com",
    projectId: "farma-61e96",
    storageBucket: "farma-61e96.appspot.com",
    messagingSenderId: "320257863836",
    appId: "1:320257863836:web:3ffef0d02c2ede87073d59",
    measurementId: "G-NT8TP2DZCB"
  };

const app = initializeApp(firebaseConfig);


export {

  app,
  auth

};
