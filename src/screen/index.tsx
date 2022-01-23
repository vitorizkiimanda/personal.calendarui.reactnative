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

import {getYear, setYear} from 'date-fns';

const today = new Date();

const CalendarScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedMonth, setSelectedMonth] = useState(today);
  const [selectedYear, setSelectedYear] = useState(getYear(today));

  useEffect(() => {
    setSelectedMonth(today);
    setSelectedDate(null);
    setSelectedYear(getYear(today));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setSelectedMonth(setYear(selectedMonth, selectedYear));
  }, [selectedYear]);

  useEffect(() => {
    setSelectedYear(getYear(selectedMonth));
  }, [selectedMonth]);

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
