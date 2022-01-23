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

const CalendarScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [isLoading, setIsLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    setSelectedMonth(new Date());
    setSelectedDate(new Date());
    setIsLoading(false);
  }, []);

  // UI render
  return (
    <SafeAreaView
      style={isDarkMode ? styles.containerMainDark : styles.containerMainLight}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={{padding: 16}}>
          {!isLoading && (
            <CalendarNavigator
              updateMonth={val => setSelectedMonth(val)}
              selectedMonth={selectedMonth}
              selectedDate={selectedDate}
            />
          )}
          {!isLoading && (
            <CalendarCustom
              selectedMonth={selectedMonth}
              selectedDate={selectedDate}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CalendarScreen;
