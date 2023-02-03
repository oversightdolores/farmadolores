import {useContext, useEffect, useState} from 'react';
import {AppRegistry, Text} from 'react-native'
import {auth} from './firebaseConfig';
import firestore from '@react-native-firebase/firestore';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ActivityIndicator} from 'react-native';
import {useDispatch} from 'react-redux';
import Details from '../pages/Details';
import DetailEmer from '../pages/DetailEmer';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Bar from './Bar';
import Reportar from './Reportar';
import authContext from './context/AutContext';
import EditarPerfil from '../pages/EditarPerfil';
import Loading from './Loading';
import {PrivateRoute, PublicRoute} from './context/AuthRoutes';


//const user = auth.currentUser;
const Stack = createNativeStackNavigator();

export default function Nav() {
 const {isLoading, isLoggedIn} = useContext(authContext)

console.log(isLoading)


return (
  <>
    {
      isLoading ?
        <Loading />
        :
        <>
          {isLoggedIn ? <PrivateRoute /> : <PublicRoute />}
        </>
    }
  </>
);
}
