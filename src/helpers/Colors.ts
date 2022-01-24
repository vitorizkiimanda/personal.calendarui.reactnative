const GRAY_DATE = '#b6b7b6';

export interface colorInterface {
  primaryDate: string;
  primarySelectedDate: string;
  todayMarker: string;
  selectedDateMarker: string;
  grayDate: string;
  blueDate: string;
}

export const lightColor = {
  primaryDate: '#1a1a1a',
  primarySelectedDate: '#ffffff',
  primaryBackground: '#ffffff',
  todayMarker: '#31e3a2',
  selectedDateMarker: '#fe394a',
  grayDate: GRAY_DATE,
  blueDate: '#144bad',
};

export const darkColor = {
  primaryDate: '#ffffff',
  primarySelectedDate: '#ffffff',
  primaryBackground: '#1a1a1a',
  todayMarker: '#229f71',
  selectedDateMarker: '#b02441',
  grayDate: GRAY_DATE,
  blueDate: '#84a0d4',
};
