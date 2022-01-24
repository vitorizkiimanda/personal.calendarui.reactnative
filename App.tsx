import React, {createContext} from 'react';
import {useColorScheme} from 'react-native';
import CalendarScreen from './src/screen/CalendarScreen';
import {darkColor, lightColor} from './src/helpers/Colors';

export const ThemeContext = createContext({
  colorTheme: lightColor,
  isDarkMode: false,
});
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <ThemeContext.Provider
      value={{
        colorTheme: isDarkMode ? darkColor : lightColor,
        isDarkMode: isDarkMode,
      }}>
      <CalendarScreen />
    </ThemeContext.Provider>
  );
};

export default App;
