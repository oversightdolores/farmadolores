import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector, useDispatch} from 'react-redux';
import Home from '../pages/Home';
import Farmacias from '../pages/Farmacias';
import Emergencias from '../pages/Emergencias';
import Perfil from '../pages/Perfil';
import {auth, signOut} from '../components/firebaseConfig';
import {logout, selectUser} from '../redux/reducer';
import Details from '../pages/Details';
import {getEmergencias, getFarmacias, getPublicity} from '../redux/action';

import Icon from 'react-native-vector-icons/Ionicons';


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const [selected, setSelected] = React.useState(0);
  const usuario = useSelector(state => state.user);
  const data = useSelector(state => state.farmacias);
  const dataEmer = useSelector(state => state.emergencias);
  const dataPubli = useSelector(state => state.publicidad);

  const dispatch = useDispatch();

  useEffect(() => {
    if (data.length === 0) {
      dispatch(getFarmacias());
    }
    if (dataEmer.length === 0) {
      dispatch(getEmergencias());
    }
    if (dataPubli.length === 0) {
      dispatch(getPublicity());
    }
  }, []);

  const logoutOfApp = () => {
    // dispatch to the store with the logout action
    dispatch(logout());
    // sign out function from firebase

    signOut(auth)
      .then(() => {
        alert('Logged out successfully!');
        // Sign-out successful.
      })
      .catch(error => {
        // An error happened.
        alert(error);
      });
  };
  const Stack = createNativeStackNavigator();

  return (
    <>
      <Tab.Navigator
        screenOptions={({route}) => ({
          inactiveTintColor: 'gray',
          activeTintColor: 'black',

          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Farmacias') {
              iconName = focused ? 'medkit' : 'medkit-outline';
            } else if (route.name === 'Emergencias') {
              iconName = focused ? 'call' : 'call-outline';
            } else if (route.name === 'Perfil') {
              iconName = focused ? 'person' : 'person-outline';
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={20} color={color} />;
          },
        })}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Farmacias" component={Farmacias} />
        <Tab.Screen name="Emergencias" component={Emergencias} />
        <Tab.Screen
          name="Perfil"
          component={Perfil}
          options={{
            headerRight: () => (
              <Icon
                reverse
                name="ios-american-football"
                type="ionicon"
                color="#517fa4"
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default TabNavigator;
