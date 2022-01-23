import React from 'react';
import {Text, View} from 'react-native';

import * as dateFns from 'date-fns';
const DAY_LABEL = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

interface PropsCalendarCustom {
  selectedMonth: Date;
  selectedDate: Date;
}

const CalendarCustom = (props: PropsCalendarCustom) => {
  const {selectedMonth, selectedDate} = props;

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
        const cloneDay = day;
        days.push(
          <View style={{flex: 1}}>
            <Text
              style={{
                backgroundColor: dateFns.isSameDay(day, selectedDate)
                  ? 'green'
                  : undefined,
                color: dateFns.isSameMonth(day, monthStart) ? 'black' : 'gray',
                textAlign: 'center',
              }}>
              {formattedDate}
            </Text>
          </View>,
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <View style={{flexDirection: 'row', borderWidth: 1, flex: 1}}>
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
};

export default CalendarCustom;
