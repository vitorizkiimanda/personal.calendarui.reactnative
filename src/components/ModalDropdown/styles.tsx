import {StyleSheet} from 'react-native';

import {colorInterface} from '../../helpers/Colors';

export const styles = (colorTheme: colorInterface) =>
  StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    containerButton: {
      flexDirection: 'row',
      padding: 4,
    },
    dropdown: {
      position: 'absolute',
      height: 33 + StyleSheet.hairlineWidth,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colorTheme.primaryShadowBorder,
      borderRadius: 8,
      backgroundColor: colorTheme.primaryBackground,
      shadowColor: colorTheme.primaryShadow,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      padding: 4,
    },
    textButton: {
      color: colorTheme.primaryText,
      fontSize: 16,
      fontWeight: '700',
      marginRight: 4,
      textAlign: 'center',
    },
    textButtonChevron: {
      color: colorTheme.primaryText,
      fontSize: 16,
      fontWeight: '700',
      textAlign: 'center',
    },
  });

export const styleItemFlatlist = (
  colorTheme: colorInterface,
  isSelected: Boolean,
) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      height: 33 + StyleSheet.hairlineWidth,
    },
    text: {
      color: isSelected ? colorTheme.primaryText : colorTheme.gray,
      fontWeight: isSelected ? '700' : '400',
      fontSize: 14,
    },
  });
