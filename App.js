import store from './src/redux/store';
import { useColorScheme } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import Nav from './src/components/Nav';
import {NavigationContainer,  DefaultTheme, DarkTheme,} from '@react-navigation/native';
import Splash from './src/components/Splash';
import { AuthProvider } from './src/components/context/AutContext'
import ThemeContext, {ThemeProvider}  from './src/components/context/ThemeContext'



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
  const {theme} = useContext(ThemeContext)
  const [isLoad, setIsLoad] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoad(false);
    }, 2000);
  }, []);

  
  return (
    <SafeAreaProvider>
      <ThemeProvider>
      <AuthProvider>
      <Provider store={store}>
        <NavigationContainer>
        {isLoad ? 

          <Splash />
         : 
          <Nav />
         }
        </NavigationContainer>
      </Provider>
     </AuthProvider>
     </ThemeProvider>
    </SafeAreaProvider>
  );
}
