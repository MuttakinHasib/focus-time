import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../utils/colors';
import { fontSize, spacing } from '../utils/sizes';

const minuteToMs = minute => minute * 60 * 1000;
const formatTime = time => (time < 10 ? `0${time}` : time);

const Countdown = ({ minutes = 0.1, isPaused, onProgress, onEnd }) => {
  const interval = useRef(null);
  const [ms, setMs] = useState(null);
  const minute = Math.floor(ms / 1000 / 60) % 60;
  const second = Math.floor(ms / 1000) % 60;

  const countDown = () => {
    setMs(time => {
      if (time === 0) {
        clearInterval(interval.current);
        onEnd();
        return time;
      }
      const timeLeft = time - 1000;
      onProgress(timeLeft / minuteToMs(minutes));
      return timeLeft;
    });
  };

  useEffect(() => setMs(minuteToMs(minutes)), [minutes]);

  useEffect(() => {
    if (isPaused) {
      return;
    }

    interval.current = setInterval(countDown, 1000);
    return () => clearInterval(interval.current);
  }, [isPaused]);

  return (
    <View>
      <Text style={styles.text}>
        {formatTime(minute)} : {formatTime(second)}
      </Text>
    </View>
  );
};

export default Countdown;

const styles = StyleSheet.create({
  text: {
    fontSize: fontSize['3xl'],
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.white,
    padding: spacing.lg,
    backgroundColor: 'rgba(94,132,226,0.3)',
  },
});
