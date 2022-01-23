import {StyleSheet} from 'react-native';
import {isSameDay, isSameMonth} from 'date-fns';

const BORDER_RADIUS_SIZE = 48;

const isSelected = (
  selectedDate: Date | null,
  clonedDay: Date,
  today: Date,
) => {
  if (!selectedDate) return false;
  console.log('selectedDate < today', selectedDate < today);
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

const getTextColor = (
  selectedDate: Date | null,
  clonedDay: Date,
  today: Date,
  monthStart: Date,
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
  if (!isSameMonth(clonedDay, monthStart)) return 0.5;
  return 1;
};

export const dynamicStyleDateItem = (
  selectedDate: Date | null,
  clonedDay: Date,
  today: Date,
  monthStart: Date,
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
      color: getTextColor(selectedDate, clonedDay, today, monthStart, index),
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
