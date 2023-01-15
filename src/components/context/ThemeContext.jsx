import { createContext, useState,  useRef } from 'react';
import { useColorScheme } from 'react-native';
import {
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';

const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {}
});





export const ThemeProvider = ({ children }) => {

  const [theme, setTheme] = useState('light');

  console.log(theme)

const toggleTheme = () => {
  setTheme(theme === 'light' ? 'dark' : 'light');
};



return (
  <ThemeContext.Provider
  value={{
    theme,
    toggleTheme
  }}
  >
  {children}
  </ThemeContext.Provider>
  );
}

export default ThemeContext;
