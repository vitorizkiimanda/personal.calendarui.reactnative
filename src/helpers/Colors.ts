const GRAY_DATE = '#b6b7b6';
const WHITE = '#ffffff';
const DARK_RED = '#9e203b';

export interface colorInterface {
  primaryDate: string;
  primarySelectedDate: string;
  todayMarker: string;
  selectedDateMarker: string;
  grayDate: string;
  blueDate: string;
  white: string;
  darkRed: string;
}

export const lightColor = {
  primaryDate: '#1a1a1a',
  primarySelectedDate: '#ffffff',
  primaryBackground: '#ffffff',
  todayMarker: '#31e3a2',
  selectedDateMarker: '#fe394a',
  grayDate: GRAY_DATE,
  blueDate: '#144bad',
  white: WHITE,
  darkRed: DARK_RED,
};

export const darkColor = {
  primaryDate: '#ffffff',
  primarySelectedDate: '#ffffff',
  primaryBackground: '#1a1a1a',
  todayMarker: '#229f71',
  selectedDateMarker: '#b02441',
  grayDate: GRAY_DATE,
  blueDate: '#84a0d4',
  white: WHITE,
  darkRed: DARK_RED,
};
