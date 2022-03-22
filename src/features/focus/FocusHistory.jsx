import React from "react";
import { View, StyleSheet, Text, FlatList, SafeAreaView } from "react-native";
import { RoundedButton } from "../../components/RoundedButton";
import { fontSizes, marginSizes } from "../../utils/size";

const HistoryItem = ({ item, index }) => {
  return (
    <View>
      <Text style={styles.historyStyles(item.status)}>{item.focusSubject}</Text>
    </View>
  );
};
export const FocusHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => {
    onClear();
  };
  return (
    <>
      <SafeAreaView style={{ flex: 0.5, alignItems: "center" }}>
        {!!focusHistory.length && (
          <>
            <Text style={styles.title}>Things that we focused on: </Text>
            <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={{ flex: 1, alignItems: "center" }}
              data={focusHistory}
              renderItem={HistoryItem}
              keyExtractor={(item, index) => index.toString()}
            />

            <View style={styles.clearContainer}>
              <RoundedButton title="Clear" onPress={clearHistory} />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  historyStyles: (status) => ({
    color: status === 1 ? "white" : "red",
    fontSize: fontSizes.md,
  }),
  title: {
    color: "white",
    fontSize: fontSizes.lg,
  },

  clearContainer: {
    alignItems: "center",
    margin: marginSizes.md,
  },
});
