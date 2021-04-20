import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, TextInput } from 'react-native-paper';
import RoundedButton from '../../components/RoundedButton';
import { colors } from '../../utils/colors';
import { fontSize, spacing } from '../../utils/sizes';

const Focus = ({ addSubject }) => {
  const [item, setItem] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>What would you like to focus on?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            autoCapitalize='none'
            onSubmitEditing={({ nativeEvent }) => setItem(nativeEvent.text)}
          />
          <RoundedButton size={55} title='+' onPress={() => addSubject(item)} />
        </View>
      </View>
    </View>
  );
};

export default Focus;

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
  },
  titleContainer: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'center',
  },
  title: {
    fontWeight: '600',
    fontSize: fontSize.lg,
    color: colors.white,
  },
  inputContainer: {
    paddingTop: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginRight: spacing.md,
  },
});
