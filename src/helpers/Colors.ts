const GRAY_DATE = '#b6b7b6';
const WHITE = '#ffffff';
const DARK_RED = '#9e203b';
const GRAY = 'gray';

export interface colorInterface {
  primaryText: string;
  primarySelectedDate: string;
  primaryBackground: string;
  primaryShadow: string;
  primaryShadowBorder: string;
  todayMarker: string;
  selectedDateMarker: string;
  grayDate: string;
  blueDate: string;
  white: string;
  darkRed: string;
  gray: string;
}

export const lightColor = {
  primaryText: '#1a1a1a',
  primarySelectedDate: '#ffffff',
  primaryBackground: '#ffffff',
  primaryShadow: '#1a1a1a',
  primaryShadowBorder: 'rgba(26,26,26,0.25)',
  todayMarker: '#31e3a2',
  selectedDateMarker: '#fe394a',
  grayDate: GRAY_DATE,
  blueDate: '#144bad',
  white: WHITE,
  darkRed: DARK_RED,
  gray: GRAY,
};

export const darkColor = {
  primaryText: '#ffffff',
  primarySelectedDate: '#ffffff',
  primaryBackground: '#1a1a1a',
  primaryShadow: '#ffffff',
  primaryShadowBorder: 'rgba(255,255,255,0.25)',
  todayMarker: '#229f71',
  selectedDateMarker: '#b02441',
  grayDate: GRAY_DATE,
  blueDate: '#84a0d4',
  white: WHITE,
  darkRed: DARK_RED,
  gray: GRAY,
};
