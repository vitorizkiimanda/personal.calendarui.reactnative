import React, {useContext} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {dynamicStyleDateItem, dynamicStyleDayLabel} from './styles';
import {ThemeContext} from '../../../App';

import * as dateFns from 'date-fns';
import {isSameDay} from 'date-fns/esm';
const DAY_LABEL = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

interface updateSelectedDateInterface {
  (date: Date | null): void;
}

interface HolidayDate {
  holiday_date: string;
  holiday_name: string;
  is_national_holiday: Boolean;
}
interface PropsCalendarCustom {
  arrHolidayDates: Array<HolidayDate>;
  selectedMonth: Date;
  selectedDate: Date | null;
  today: Date;
  updateSelectedDate: updateSelectedDateInterface;
}

const CalendarCustom = (props: PropsCalendarCustom) => {
  const {colorTheme} = useContext(ThemeContext);

  const {
    arrHolidayDates,
    selectedMonth,
    selectedDate,
    today,
    updateSelectedDate,
  } = props;

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
        <Text key={val} style={dynamicStyleDayLabel(colorTheme, index).text}>
          {val}
        </Text>
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
            key={formattedDate}
            onPress={() => onPressDate(clonedDay)}
            style={
              dynamicStyleDateItem(
                colorTheme,
                selectedDate,
                clonedDay,
                today,
                monthStart,
                arrHolidayDates,
                i,
              ).container
            }>
            {/* circular marker : today date, selected date */}
            {!!selectedDate &&
              (isSameDay(clonedDay, selectedDate) ||
                isSameDay(clonedDay, today)) && (
                <View
                  style={
                    dynamicStyleDateItem(
                      colorTheme,
                      selectedDate,
                      clonedDay,
                      today,
                      monthStart,
                      arrHolidayDates,
                      i,
                    ).circularMarker
                  }
                />
              )}

            {/* date text */}
            <Text
              style={
                dynamicStyleDateItem(
                  colorTheme,
                  selectedDate,
                  clonedDay,
                  today,
                  monthStart,
                  arrHolidayDates,
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
        <View
          key={rows.length}
          style={{flex: 1, flexDirection: 'row', marginTop: 16}}>
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
  arrHolidayDates: [],
  selectedMonth: new Date(),
  selectedDate: new Date(),
  today: new Date(),
  updateSelectedDate: () => {},
};

export default CalendarCustom;
