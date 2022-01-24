import React, {createContext, useReducer} from 'react';
import {useColorScheme} from 'react-native';
import CalendarScreen from './src/screen/CalendarScreen';
import {darkColor, lightColor} from './src/helpers/Colors';

import colorModeReducer from './src/reducers/colorModeReducer';

const DEFAULT_IS_FORCE_DARK = false;

export const ThemeContext = createContext({
  colorTheme: lightColor,
  isDarkMode: false,
  reducerProvider: {
    state: {
      isForceDarkMode: DEFAULT_IS_FORCE_DARK,
    },
    dispatch: ({}) => {},
  },
});

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [state, dispatch] = useReducer(colorModeReducer, {
    isForceDarkMode: isDarkMode,
  });

  const reducerProvider = {
    state,
    dispatch,
  };

  return (
    <ThemeContext.Provider
      value={{
        colorTheme: state.isForceDarkMode ? darkColor : lightColor,
        isDarkMode: state.isForceDarkMode,
        reducerProvider: reducerProvider,
      }}>
      <CalendarScreen />
    </ThemeContext.Provider>
  );
};

export default App;
