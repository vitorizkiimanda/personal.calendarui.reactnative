import React, {useContext} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import ModalDropdown from '../ModalDropdown';
import {ThemeContext} from '../../../App';
import {dynamicStyleChevronNextPrev} from './styles';

import * as dateFns from 'date-fns';

const LABEL_MONTH = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const currentYear = dateFns.getYear(new Date());
let iterateYear = 1970;

let LABEL_YEAR: number[] | undefined = [];
while (iterateYear < currentYear + 100) {
  LABEL_YEAR.push(iterateYear);
  iterateYear += 1;
}

interface updateMonthInterface {
  (date: Date): void;
}
interface updateYearInterface {
  (val: number): void;
}
interface CalendarNavigatorInterface {
  updateMonth: updateMonthInterface;
  updateYear: updateYearInterface;
  selectedDate: Date | null;
  selectedMonth: Date;
  selectedYear: number;
}

const CalendarNavigator = (props: CalendarNavigatorInterface) => {
  const {colorTheme} = useContext(ThemeContext);
  const {updateMonth, updateYear, selectedMonth, selectedYear} = props;

  // UI function
  const onPressNextMonth = () => {
    updateMonth(dateFns.addMonths(selectedMonth, 1));
  };
  const onPressPrevMonth = () => {
    updateMonth(dateFns.addMonths(selectedMonth, -1));
  };
  const onUpdateYear = (val: string | number) => {
    updateYear(Number(val));
  };
  const onUpdateMonth = (val: string | number) => {
    updateMonth(dateFns.setMonth(selectedMonth, LABEL_MONTH.indexOf(`${val}`)));
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
          <ModalDropdown
            list={LABEL_MONTH}
            selected={dateFns.format(selectedMonth, 'MMMM')}
            updateSelected={onUpdateMonth}
          />
        </View>
        <View style={{alignItems: 'flex-start', maxWidth: '40%'}}>
          <ModalDropdown
            list={LABEL_YEAR}
            selected={selectedYear}
            updateSelected={onUpdateYear}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
        <TouchableOpacity
          style={{
            marginRight: 16,
            ...dynamicStyleChevronNextPrev(colorTheme).container,
          }}
          onPress={onPressPrevMonth}>
          <Text
            style={dynamicStyleChevronNextPrev(colorTheme).text}>{`<`}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={dynamicStyleChevronNextPrev(colorTheme).container}
          onPress={onPressNextMonth}>
          <Text
            style={dynamicStyleChevronNextPrev(colorTheme).text}>{`>`}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

CalendarNavigator.defaultProps = {
  updateMonth: () => {},
  updateYear: () => {},
  selectedMonth: new Date(),
  selectedDate: new Date(),
};

export default CalendarNavigator;
