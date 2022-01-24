import {Dimensions, StyleSheet} from 'react-native';
import {format, isSameDay, isSameMonth} from 'date-fns';

import {colorInterface} from '../../helpers/Colors';

const {width} = Dimensions.get('window');
const CELL_WIDTH = (width - 32) / 7;
const BORDER_RADIUS_SIZE = CELL_WIDTH;

interface HolidayDate {
  holiday_date: string;
  holiday_name: string;
  is_national_holiday: Boolean;
}

const isSelected = (
  selectedDate: Date | null,
  clonedDay: Date,
  today: Date,
) => {
  if (!selectedDate) return false;
  if (selectedDate < today) {
    if (clonedDay >= selectedDate && clonedDay < today) return true;
    return false;
  }
  if (clonedDay <= selectedDate && clonedDay > today) return true;
  return false;
};

const backgroundColorDateCell = (
  colorTheme: colorInterface,
  selectedDate: Date | null,
  clonedDay: Date,
  today: Date,
) => {
  if (
    isSelected(selectedDate, clonedDay, today) ||
    (!!selectedDate && isSameDay(clonedDay, today))
  )
    return colorTheme.selectedDateMarker;
  return undefined;
};

const backgroundColorCircularMarker = (
  colorTheme: colorInterface,
  selectedDate: Date | null,
  clonedDay: Date,
  today: Date,
) => {
  if (!!selectedDate && isSameDay(clonedDay, today)) {
    return colorTheme.todayMarker;
  }
  if (isSelected(selectedDate, clonedDay, today))
    return colorTheme.selectedDateMarker;
  return undefined;
};

const calcBorderRadiusLeft = (
  selectedDate: Date | null,
  clonedDay: Date,
  today: Date,
  monthStart: Date,
  index: number,
) => {
  if (!selectedDate && isSameDay(clonedDay, today)) return BORDER_RADIUS_SIZE;
  if (!selectedDate) return undefined;
  if (index === 0) return BORDER_RADIUS_SIZE;
  if (selectedDate < today) {
    if (isSameDay(clonedDay, today)) return undefined;
    if (isSameDay(clonedDay, selectedDate)) return BORDER_RADIUS_SIZE;
  }
  if (
    (isSameDay(clonedDay, selectedDate) && clonedDay < today) ||
    isSameDay(clonedDay, today)
  )
    return BORDER_RADIUS_SIZE;
  return undefined;
};

const calcBorderRadiusRight = (
  selectedDate: Date | null,
  clonedDay: Date,
  today: Date,
  monthStart: Date,
  index: number,
) => {
  if (!selectedDate && isSameDay(clonedDay, today)) return BORDER_RADIUS_SIZE;
  if (!selectedDate) return undefined;
  if (index === 6) return BORDER_RADIUS_SIZE;
  if (selectedDate > today) {
    if (isSameDay(clonedDay, today)) return undefined;
    if (isSameDay(clonedDay, selectedDate)) return BORDER_RADIUS_SIZE;
  }
  if (
    (isSameDay(clonedDay, selectedDate) && clonedDay > today) ||
    isSameDay(clonedDay, today)
  )
    return BORDER_RADIUS_SIZE;
  return undefined;
};

const isHoliday = (clonedDay: Date, arrHolidayDates: Array<HolidayDate>) => {
  const formattedDate = format(clonedDay, 'yyyy-MM-d');
  const found = arrHolidayDates.some(val => val.holiday_date === formattedDate);
  return found;
};

const getTextColor = (
  colorTheme: colorInterface,
  selectedDate: Date | null,
  clonedDay: Date,
  today: Date,
  monthStart: Date,
  arrHolidayDates: Array<HolidayDate>,
  index: number,
) => {
  if (!!selectedDate) {
    if (isSameDay(clonedDay, selectedDate) || isSameDay(clonedDay, today))
      return colorTheme.primarySelectedDate;
    if (selectedDate > today && clonedDay <= selectedDate && clonedDay >= today)
      return colorTheme.primarySelectedDate;
    if (selectedDate < today && clonedDay >= selectedDate && clonedDay <= today)
      return colorTheme.primarySelectedDate;
  }
  if (isHoliday(clonedDay, arrHolidayDates)) return colorTheme.blueDate;
  if (!isSameMonth(clonedDay, monthStart)) return colorTheme.grayDate;
  if (index > 4) return colorTheme.blueDate; // saturday & sunday
  return colorTheme.primaryDate;
};

const getTextOpacity = (
  selectedDate: Date | null,
  clonedDay: Date,
  today: Date,
  monthStart: Date,
  index: number,
) => {
  if (!!selectedDate) {
    if (isSameDay(clonedDay, selectedDate) || isSameDay(clonedDay, today))
      return 1;
    if (selectedDate > today && clonedDay <= selectedDate && clonedDay >= today)
      return 1;
    if (selectedDate < today && clonedDay >= selectedDate && clonedDay <= today)
      return 1;
  }
  if (!isSameMonth(clonedDay, monthStart)) return 0.65;
  return 1;
};

const getZIndex = (clonedDay: Date, selectedDate: Date | null, today: Date) => {
  if (isSameDay(clonedDay, today)) return 999;
  if (!!selectedDate && isSameDay(clonedDay, selectedDate)) return 998;
  return 1;
};

export const dynamicStyleDateItem = (
  colorTheme: colorInterface,
  selectedDate: Date | null,
  clonedDay: Date,
  today: Date,
  monthStart: Date,
  arrHolidayDates: Array<HolidayDate>,
  index: number,
) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: backgroundColorDateCell(
        colorTheme,
        selectedDate,
        clonedDay,
        today,
      ),
      borderColor: isSameDay(clonedDay, today)
        ? colorTheme.todayMarker
        : undefined,
      borderWidth: isSameDay(clonedDay, today) && !selectedDate ? 1 : 0,
      borderTopLeftRadius: calcBorderRadiusLeft(
        selectedDate,
        clonedDay,
        today,
        monthStart,
        index,
      ),

      borderBottomLeftRadius: calcBorderRadiusLeft(
        selectedDate,
        clonedDay,
        today,
        monthStart,
        index,
      ),
      borderTopRightRadius: calcBorderRadiusRight(
        selectedDate,
        clonedDay,
        today,
        monthStart,
        index,
      ),
      borderBottomRightRadius: calcBorderRadiusRight(
        selectedDate,
        clonedDay,
        today,
        monthStart,
        index,
      ),
      justifyContent: 'center',
      paddingVertical: 8,
      marginVertical: 8,
      width: CELL_WIDTH,
      zIndex: getZIndex(clonedDay, selectedDate, today),
    },
    text: {
      color: getTextColor(
        colorTheme,
        selectedDate,
        clonedDay,
        today,
        monthStart,
        arrHolidayDates,
        index,
      ),
      textAlign: 'center',
      opacity: getTextOpacity(
        selectedDate,
        clonedDay,
        today,
        monthStart,
        index,
      ),
    },
    circularMarker: {
      backgroundColor: backgroundColorCircularMarker(
        colorTheme,
        selectedDate,
        clonedDay,
        today,
      ),
      borderRadius: CELL_WIDTH + 8,
      height: CELL_WIDTH + 8,
      position: 'absolute',
      width: CELL_WIDTH + 8,
      overflow: 'visible',
    },
  });

export const dynamicStyleDayLabel = (
  colorTheme: colorInterface,
  index: number,
) =>
  StyleSheet.create({
    text: {
      color: index > 4 ? colorTheme.blueDate : colorTheme.primaryDate, // saturday & sunday
      flex: 1,
      textAlign: 'center',
    },
  });
