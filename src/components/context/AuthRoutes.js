import { useContext } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AuthContext from './AutContext';
import Login from '../../pages/Login';
import Bar from '../Bar'
import Register from '../../pages/Register';
import Details from '../../pages/Details';
import DetailEmer from '../../pages/DetailEmer';
import Reportar from '../Reportar';
import EditarPerfil from '../../pages/EditarPerfil';
import { Registered, RegistrationError, Notifications } from 'react-native-notifications';

const Stack = createNativeStackNavigator();

const PrivateRoute = ({ children, ...rest }) => {
  const { user, isLoading } = useContext(AuthContext);


  


  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    user ? (
      <Stack.Navigator {...rest}>
        <Stack.Screen
          name="Bar"
          component={Bar}
          options={{ headerShown: false }}
        />
       <Stack.Screen name="Details" component={Details} />
              
              <Stack.Screen name="DetailEmer" component={DetailEmer} />
             
              <Stack.Screen name="Reportar" component={Reportar} />
              
              <Stack.Screen name='EditarPerfil' component={EditarPerfil} />
      </Stack.Navigator>
    ) : (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
      </Stack.Navigator>
    )
  );
};

const PublicRoute = ({ children, ...rest }) => {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    !user ? (
      <Stack.Navigator {...rest}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
         <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
      </Stack.Navigator>
    ) : (
      <Stack.Navigator>
        <Stack.Screen
          name="Bar"
          component={Bar}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    )
  );
};

export { PrivateRoute, PublicRoute };
