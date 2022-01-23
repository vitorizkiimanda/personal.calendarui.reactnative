import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {dynamicStyleDateItem} from './styles';

import * as dateFns from 'date-fns';
const DAY_LABEL = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

interface updateSelectedDateInterface {
  (date: Date | null): void;
}
interface PropsCalendarCustom {
  selectedMonth: Date;
  selectedDate: Date | null;
  today: Date;
  updateSelectedDate: updateSelectedDateInterface;
}

const CalendarCustom = (props: PropsCalendarCustom) => {
  const {selectedMonth, selectedDate, today, updateSelectedDate} = props;

  // UI logic
  const onPressDate = (val: Date) => {
    updateSelectedDate(
      !selectedDate || !dateFns.isSameDay(selectedDate, val) ? val : null,
    );
  };

  // UI render
  const renderDayLabel = () => (
    <View style={{flexDirection: 'row', marginBottom: 16}}>
      {DAY_LABEL.map((val, index) => (
        <Text style={{flex: 1, textAlign: 'center'}}>{val}</Text>
      ))}
    </View>
  );

  const renderDates = () => {
    const monthStart = dateFns.startOfMonth(selectedMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart, {weekStartsOn: 1}); // start from monday
    const endDate = dateFns.endOfWeek(monthEnd, {weekStartsOn: 1});

    const dateFormat = 'd';
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const clonedDay = day;
        days.push(
          <TouchableOpacity
            onPress={() => onPressDate(clonedDay)}
            style={
              dynamicStyleDateItem(
                selectedDate,
                clonedDay,
                today,
                monthStart,
                i,
              ).container
            }>
            <Text
              style={
                dynamicStyleDateItem(
                  selectedDate,
                  clonedDay,
                  today,
                  monthStart,
                  i,
                ).text
              }>
              {formattedDate}
            </Text>
          </TouchableOpacity>,
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <View style={{flex: 1, flexDirection: 'row', marginTop: 16}}>
          {days}
        </View>,
      );
      days = [];
    }
    return <View>{rows}</View>;
  };

  return (
    <View>
      {renderDayLabel()}
      {renderDates()}
    </View>
  );
};

CalendarCustom.defaultProps = {
  selectedMonth: new Date(),
  selectedDate: new Date(),
  today: new Date(),
  updateSelectedDate: () => {},
};

export default CalendarCustom;
