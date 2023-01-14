import store from './src/redux/store';
import { useState, useEffect, useContext } from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import Nav from './src/components/Nav';
import {NavigationContainer} from '@react-navigation/native';
import ThemeContext from './src/components/context/ThemeContext';
import Splash from './src/components/Splash';
import AuthContext, { AuthProvider } from './src/components/context/AutContext'


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
  transparent: 'transparent',
};


export default function App() {
  const { user, isLoggedIn, login, register, logout } = useContext(AuthContext);
  const [theme, setTheme] = useState('light');
  const [isLoad, setIsLoad] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoad(false);
    }, 2000);
  }, []);
  console.log('este es el App', isLoggedIn)

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  return (
    <SafeAreaProvider>
      <AuthProvider>
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Provider store={store}>
        <NavigationContainer>
        {isLoad ? 

          <Splash />
         : 
          <Nav />
         }
        </NavigationContainer>
      </Provider>
     </ThemeContext.Provider>
     </AuthProvider>
    </SafeAreaProvider>
  );
}
