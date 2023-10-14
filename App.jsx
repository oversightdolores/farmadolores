import {NavigationContainer} from '@react-navigation/native';
import {PermissionsAndroid, Alert} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import Nav from './src/components/Nav';
import {AuthProvider} from './src/components/context/AutContext';
import {ThemeProvider} from './src/components/context/ThemeContext';
import store from './src/redux/store';
import messaging from '@react-native-firebase/messaging';
import {useEffect} from 'react';
import {Notifications} from 'react-native-notifications';



const colorBtns = {
  active: '#27bdbb',
  primary: '#2E86C1',
  secondary: '#F1948A',
  tertiary: '#F1C40F',
  success: '#28B463',
  danger: '#CB4335',
  warning: '#F39C12',
  info: '#3498DB',
  light: '#F7F9F9',
  dark: '#34495E',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#bdbfc0',
  transparent: 'transparent',
};



export default function App() {

  useEffect(() => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    

  
  }, []);

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <Provider store={store}>
            <NavigationContainer>
              
                <Nav />
              
            </NavigationContainer>
          </Provider>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
