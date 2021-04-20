import { useKeepAwake } from 'expo-keep-awake';
import React, { useState } from 'react';
import { Platform, StyleSheet, Text, Vibration, View } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import Countdown from '../../components/Countdown';
import RoundedButton from '../../components/RoundedButton';
import { colors } from '../../utils/colors';
import { fontSize, spacing } from '../../utils/sizes';
import Timing from './Timing';

const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
  useKeepAwake();
  const [minutes, setMinutes] = useState(0.1);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const onProgress = progress => {
    setProgress(progress);
  };

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval, 1000));
    } else {
      Vibration.vibrate(1000);
    }
  };

  const onEnd = () => {
    vibrate();
    setMinutes(1);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  };

  const onChangeTime = minute => {
    setMinutes(minute);
    setProgress(1);
    setIsStarted(false);
  };

  return (
    <View style={styles.container}>
      <Countdown isPaused={!isStarted} {...{ onProgress, minutes, onEnd }} />
      <View style={{ paddingTop: spacing['3xl'] }}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View style={{ paddingTop: spacing.md }}>
        <ProgressBar color='#5e84e2' style={{ height: 10 }} {...{ progress }} />
      </View>
      <Timing {...{ onChangeTime }} />
      <View style={styles.buttonWrapper}>
        <RoundedButton
          title={isStarted ? 'Pause' : 'Start'}
          // size={60}
          onPress={() => setIsStarted(prev => !prev)}
        />
      </View>
      <View style={{ padding: spacing.lg }}>
        <RoundedButton title='-' size={60} onPress={() => clearSubject()} />
      </View>
    </View>
  );
};

export default Timer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: colors.white,
    textAlign: 'center',
    fontSize: fontSize.xl,
  },
  task: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: fontSize.lg,
  },
  buttonWrapper: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xl,
    padding: spacing.md,
  },
});
