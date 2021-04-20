import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import RoundedButton from '../../components/RoundedButton';
import { colors } from '../../utils/colors';
import { fontSize, spacing } from '../../utils/sizes';

const HistoryItem = ({ item, index }) => {
  return (
    <Text key={index} style={styles.historyItem(item.status)}>
      {item.subject}
    </Text>
  );
};

const FocusHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => {
    onClear();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {!!focusHistory.length && (
        <>
          <Text style={styles.title}>Things we've focused on</Text>
          <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={{ flex: 1, alignItems: 'center' }}
            data={focusHistory}
            renderItem={HistoryItem}
          />
          <View style={{ alignItems: 'center', paddingBottom: spacing.md }}>
            <RoundedButton title='Clear' onPress={clearHistory} />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default FocusHistory;

const styles = StyleSheet.create({
  historyItem: status => ({
    color: status ? 'green' : 'red',
    fontSize: fontSize.lg,
    paddingVertical: spacing.md,
  }),
  title: {
    color: colors.white,
    fontSize: fontSize.xl,
    textAlign: 'center',
  },
});
