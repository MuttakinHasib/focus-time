import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import Countdown from '../../components/Countdown';
import RoundedButton from '../../components/RoundedButton';
import { colors } from '../../utils/colors';
import { fontSize, spacing } from '../../utils/sizes';

const Timer = ({ focusSubject }) => {
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const onProgress = progress => {
    setProgress(progress);
  };

  return (
    <View style={styles.container}>
      <Countdown isPaused={!isStarted} {...{ onProgress }} />
      <View style={{ paddingTop: spacing['3xl'] }}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View style={{ paddingTop: spacing.md }}>
        <ProgressBar color='#5e84e2' style={{ height: 10 }} {...{ progress }} />
      </View>
      <View style={styles.buttonWrapper}>
        <RoundedButton
          title={isStarted ? 'Pause' : 'Start'}
          // size={60}
          onPress={() => setIsStarted(prev => !prev)}
        />
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
