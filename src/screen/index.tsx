import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';
import styles from './styles';
import CalendarCustom from '../components/CalendarCustom';
import CalendarNavigator from '../components/CalendarNavigator';
import {getListDateHoliday} from '../service/serviceDateHoliday';

import {addMonths, getMonth, getYear, setYear} from 'date-fns';

const today = new Date();
interface HolidayDate {
  holiday_date: string;
  holiday_name: string;
  is_national_holiday: Boolean;
}

const CalendarScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedMonth, setSelectedMonth] = useState(today);
  const [selectedYear, setSelectedYear] = useState(getYear(today));
  const [arrHolidayDates, setArrHolidayDates] = useState<Array<HolidayDate>>(
    [],
  );

  useEffect(() => {
    setSelectedMonth(today);
    setSelectedDate(null);
    setSelectedYear(getYear(today));
    getListOfHolidayDate();
  }, []);

  useEffect(() => {
    setSelectedMonth(setYear(selectedMonth, selectedYear));
    getListOfHolidayDate();
  }, [selectedYear]);

  useEffect(() => {
    setSelectedYear(getYear(selectedMonth));
    getListOfHolidayDate();
  }, [selectedMonth]);

  // api call
  const getListOfHolidayDate = async () => {
    try {
      const prevMonth = addMonths(selectedMonth, -1);
      const nextMonth = addMonths(selectedMonth, 1);

      const numberMonthPrev = getMonth(prevMonth);
      const numberMonthCurr = getMonth(selectedMonth);
      const numberMonthNext = getMonth(nextMonth);

      const numberYearPrev = getYear(prevMonth);
      const numberYearCurr = getYear(selectedMonth);
      const numberYearNext = getYear(nextMonth);
      const {data: dataPrev, error: errorPrev} = await getListDateHoliday(
        numberMonthPrev + 1,
        numberYearPrev,
      );
      const {data: dataCurr, error: errorCurr} = await getListDateHoliday(
        numberMonthCurr + 1,
        numberYearCurr,
      );
      const {data: dataNext, error: errorNext} = await getListDateHoliday(
        numberMonthNext + 1,
        numberYearNext,
      );
      if (errorPrev || errorCurr || errorNext) throw new Error('TIMEOUT');
      setArrHolidayDates([...dataPrev, ...dataCurr, ...dataNext]);
      setIsLoading(false);
    } catch (error) {
      console.log('error', error);
      setIsLoading(false);
    }
  };

  // UI render
  return (
    <SafeAreaView
      style={isDarkMode ? styles.containerMainDark : styles.containerMainLight}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={{padding: 16}}>
          {!isLoading && (
            <CalendarNavigator
              selectedDate={selectedDate}
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
              updateMonth={val => setSelectedMonth(val)}
              updateYear={val => setSelectedYear(val)}
            />
          )}
          {!isLoading && (
            <CalendarCustom
              arrHolidayDates={arrHolidayDates}
              selectedDate={selectedDate}
              selectedMonth={selectedMonth}
              today={today}
              updateSelectedDate={val => setSelectedDate(val)}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CalendarScreen;
