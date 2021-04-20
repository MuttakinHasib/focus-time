import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { AsyncStorage, Platform, StyleSheet, Text, View } from 'react-native';
import Focus from './src/features/focus/Focus';
import FocusHistory from './src/features/focus/FocusHistory';
import Timer from './src/features/timer/Timer';
import { colors } from './src/utils/colors';
import { spacing } from './src/utils/sizes';

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const addFocusSubjectHistoryWithState = (subject, status) => {
    setFocusHistory([...focusHistory, { subject, status }]);
  };

  const onClear = () => {
    setFocusHistory([]);
  };

  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    } catch (err) {
      console.log(err);
    }
  };

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory');

      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadFocusHistory();
  }, []);

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          {...{ focusSubject }}
          onTimerEnd={() => {
            addFocusSubjectHistoryWithState(focusSubject, true);
            setFocusSubject(null);
          }}
          clearSubject={() => {
            addFocusSubjectHistoryWithState(focusSubject, false);
            setFocusSubject(null);
          }}
        />
      ) : (
        <View style={{ flex: 1 }}>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory {...{ focusHistory, onClear }} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? spacing.lg * 2 : spacing.lg * 1.1,
    backgroundColor: colors.darkBlue,
  },
});
