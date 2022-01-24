import {StyleSheet} from 'react-native';

import {colorInterface} from '../../helpers/Colors';

export const dynamicStyleChevronNextPrev = (colorTheme: colorInterface) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: colorTheme.darkRed,
      borderRadius: 100,
      height: 32,
      justifyContent: 'center',
      width: 32,
    },
    text: {
      color: colorTheme.white,
      fontSize: 16,
      fontWeight: '700',
      textAlign: 'center',
    },
  });
