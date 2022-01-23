import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import * as dateFns from 'date-fns';

interface updateMonthInterface {
  (date: Date): void;
}

interface CalendarNavigatorInterface {
  updateMonth: updateMonthInterface;
  selectedMonth: Date;
  selectedDate: Date;
}

const CalendarNavigator = (props: CalendarNavigatorInterface) => {
  const {updateMonth, selectedMonth, selectedDate} = props;

  // UI function
  const onPressNextMonth = () => {
    updateMonth(dateFns.addMonths(selectedMonth, 1));
  };
  const onPressPrevMonth = () => {
    updateMonth(dateFns.addMonths(selectedMonth, -1));
  };

  // UI render
  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 16,
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginRight: 16,
        }}>
        <View style={{alignItems: 'flex-start', maxWidth: '60%'}}>
          <Text numberOfLines={1} adjustsFontSizeToFit>
            {dateFns.format(selectedMonth, 'MMMM')}
          </Text>
        </View>
        <View style={{alignItems: 'flex-start', maxWidth: '40%'}}>
          <Text numberOfLines={1} adjustsFontSizeToFit>
            {dateFns.format(selectedMonth, 'yyyy')}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
        <TouchableOpacity style={{marginRight: 16}} onPress={onPressPrevMonth}>
          <Text>Prev</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressNextMonth}>
          <Text>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

CalendarNavigator.defaultProps = {
  addMonth: () => {},
  selectedMonth: new Date(),
  selectedDate: new Date(),
};

export default CalendarNavigator;
