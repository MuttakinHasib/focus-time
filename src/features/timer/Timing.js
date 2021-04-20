import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RoundedButton from '../../components/RoundedButton';
import { spacing } from '../../utils/sizes';

const Timing = ({ onChangeTime }) => {
  return (
    <View style={styles.timeContainer}>
      <RoundedButton size={70} title='10' onPress={() => onChangeTime(10)} />
      <RoundedButton size={70} title='15' onPress={() => onChangeTime(15)} />
      <RoundedButton size={70} title='20' onPress={() => onChangeTime(20)} />
    </View>
  );
};

export default Timing;

const styles = StyleSheet.create({
  timeContainer: {
    // flex: 0.5,
    padding: spacing['3xl'],
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
