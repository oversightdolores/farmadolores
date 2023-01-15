import {useContext, useEffect, useState} from 'react';
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
import authContext from '../components/context/AutContext';
import EditarPerfil from '../pages/EditarPerfil';


//const user = auth.currentUser;
const Stack = createNativeStackNavigator();

export default function Nav() {
 const {isLoggedIn, user} = useContext(authContext)



  return (
    <>
    
      {user ? (
        
          <>
            <Stack.Navigator>
              <Stack.Screen
                name="Bar"
                component={Bar}
                options={{headerShown: false}}
              />
              <Stack.Screen name="Details" component={Details} />
              <Stack.Screen name="DetailEmer" component={DetailEmer} />
              <Stack.Screen name="Reportar" component={Reportar} />
              <Stack.Screen name='EditarPerfil' component={EditarPerfil} />
              {/* <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Farmacias" component={Farmacias} />
              <Stack.Screen name="Emergencias" component={Emergencias} />
              <Stack.Screen name="Perfil" component={Perfil} /> */}
            </Stack.Navigator>
          </>
        
      ) : (
        <>
          <Stack.Navigator screenOptions={{header: () => null}}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen
              name="Register"
              component={Register}
              screenOptions={{
                header: () => null,
              }}
            />
          </Stack.Navigator>
        </>
      )}
      
    </>
  );
}
