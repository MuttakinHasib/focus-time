import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Focus from './src/features/focus/Focus';
import Timer from './src/features/timer/Timer';
import { colors } from './src/utils/colors';
import { spacing } from './src/utils/sizes';

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  console.log(focusSubject);
  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer {...{ focusSubject }} />
      ) : (
        <Focus addSubject={setFocusSubject} />
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
