import React from "react";
import { View, StyleSheet, Text, Platform } from "react-native";
import { RoundedButton } from "../../components/RoundedButton";

export const Timing = ({ onChangeTime }) => {
  return (
    <>
      <View style={styles.timingButton}>
        <RoundedButton size={100} title="10" onPress={() => onChangeTime(10)} />
      </View>

      <View style={styles.timingButton}>
        <RoundedButton size={100} title="15" onPress={() => onChangeTime(15)} />
      </View>

      <View style={styles.timingButton}>
        <RoundedButton size={100} title="20" onPress={() => onChangeTime(20)} />
      </View>
      <View style={styles.timingButton}>
        <RoundedButton size={100} title="30" onPress={() => onChangeTime(30)} />
      </View>

      <View style={styles.timingButton}>
        <RoundedButton size={100} title="60" onPress={() => onChangeTime(60)} />
      </View>

      <View style={styles.timingButton}>
        <RoundedButton size={100} title="120" onPress={() => onChangeTime(120)} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  timingButton: {
    marginTop: 4,
    marginBottom: 4,
    marginLeft: 4,
    marginRight: 4,
    justifyContent: "center",
    alignItems: "center",
  },
});
