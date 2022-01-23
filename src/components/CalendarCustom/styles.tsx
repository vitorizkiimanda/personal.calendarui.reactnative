import {StyleSheet} from 'react-native';
import {isSameDay} from 'date-fns';

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

export const dynamicStyleSelectedDate = (
  selectedDate: Date | null,
  clonedDay: Date,
  today: Date,
) =>
  StyleSheet.create({
    container: {
      backgroundColor: backgroundColorDateCell(selectedDate, clonedDay, today),
      borderColor: isSameDay(clonedDay, today) ? 'green' : undefined,
      borderWidth: isSameDay(clonedDay, today) ? 1 : undefined,
      flex: 1,
      padding: 8,
    },
  });
