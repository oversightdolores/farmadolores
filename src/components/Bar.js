import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Avatar} from '@rneui/base';
import React,{useContext,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import Emergencias from '../pages/Emergencias';
import Farmacias from '../pages/Farmacias';
import Home from '../pages/Home';
import Perfil from '../pages/Perfil';

import {fetchEmergencias,fetchFarmacias,fetchPublicidad} from '../redux/reducer';

import Icon from 'react-native-vector-icons/Ionicons';
import User from 'react-native-vector-icons/FontAwesome';
import AuthContext from './context/AutContext';


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const [selected, setSelected] = React.useState(0);
  const data = useSelector(state => state.farmacias);
  const dataEmer = useSelector(state => state.emergencias);
  const dataPubli = useSelector(state => state.publicidad);
  const {user} = useContext(AuthContext)

  const dispatch = useDispatch();

  useEffect(() => {
    if (data.length === 0) {
      dispatch(fetchFarmacias());
    }
    if (dataEmer.length === 0) {
      dispatch(fetchEmergencias());
    }
    if (dataPubli.length === 0) {
      dispatch(fetchPublicidad());
    }
  }, []);

  return (
    <>
      <Tab.Navigator
        screenOptions={({route}) => ({
          inactiveTintColor: 'gray',
          activeTintColor: 'green',
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
        
          tabBarIcon: ({focused, color, size}) => {
            color = focused ? '#2bac83ff' : 'gray';
            let iconName;
            

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Farmacias') {
              iconName = focused ? 'medkit' : 'medkit-outline';
            } else if (route.name === 'Emergencias') {
              iconName = focused ? 'call' : 'call-outline';
            } else if (route.name === 'Perfil') {
           return user ?
           <Avatar rounded

           source={{
             uri:
               user?.photoURL
           }} style={{width:30, height:30}} />
           : 
            <User name={'user-circle'} size={22} color={'gray'} />;

            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={22} color={color} />;
          },
        })}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Farmacias" options={{headerShown: false}} component={Farmacias} />
        <Tab.Screen name="Emergencias" options={{headerShown: false}} component={Emergencias} />
        <Tab.Screen name="Perfil" component={Perfil}  />
      </Tab.Navigator>
    </>
  );
};

export default TabNavigator;
