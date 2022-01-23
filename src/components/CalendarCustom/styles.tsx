import {StyleSheet} from 'react-native';
import {format, isSameDay, isSameMonth} from 'date-fns';

const BORDER_RADIUS_SIZE = 48;

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
  selectedDate: Date | null,
  clonedDay: Date,
  today: Date,
) => {
  if (!!selectedDate && isSameDay(clonedDay, today)) {
    return 'green';
  }
  return isSelected(selectedDate, clonedDay, today) ? 'red' : 'white';
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
  if (selectedDate > today && isSameDay(clonedDay, today))
    return BORDER_RADIUS_SIZE;
  if (isSameDay(clonedDay, selectedDate) && clonedDay < today)
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
  if (selectedDate > today && isSameDay(clonedDay, today))
    return BORDER_RADIUS_SIZE;
  if (isSameDay(clonedDay, selectedDate) && clonedDay > today)
    return BORDER_RADIUS_SIZE;
  return undefined;
};

const isHoliday = (clonedDay: Date, arrHolidayDates: Array<HolidayDate>) => {
  const formattedDate = format(clonedDay, 'yyyy-MM-d');
  const found = arrHolidayDates.some(val => val.holiday_date === formattedDate);
  return found;
};

const getTextColor = (
  selectedDate: Date | null,
  clonedDay: Date,
  today: Date,
  monthStart: Date,
  arrHolidayDates: Array<HolidayDate>,
  index: number,
) => {
  if (!!selectedDate) {
    if (isSameDay(clonedDay, selectedDate) || isSameDay(clonedDay, today))
      return 'white';
    if (selectedDate > today && clonedDay <= selectedDate && clonedDay >= today)
      return 'white';
    if (selectedDate < today && clonedDay >= selectedDate && clonedDay <= today)
      return 'white';
  }
  if (isHoliday(clonedDay, arrHolidayDates)) return 'blue';
  if (!isSameMonth(clonedDay, monthStart)) return 'gray';
  if (index === 5 || index === 6) return 'blue';
  return 'black';
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

export const dynamicStyleDateItem = (
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
      backgroundColor: backgroundColorDateCell(selectedDate, clonedDay, today),
      borderColor: isSameDay(clonedDay, today) ? 'green' : undefined,
      borderWidth: isSameDay(clonedDay, today) ? 1 : undefined,
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
      flex: 1,
      justifyContent: 'center',
      padding: 8,
    },
    text: {
      color: getTextColor(
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
  });
