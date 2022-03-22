import React, { useState, useRef } from "react";
import { View, StyleSheet, Text, Vibration, Platform } from "react-native";
import { marginSizes } from "../../utils/size";
import { Countdown } from "../../components/Countdown";
import { RoundedButton } from "../../components/RoundedButton";
import { ProgressBar } from "react-native-paper";
import { Timing } from "../../features/timer/Timing";
import { useKeepAwake } from "expo-keep-awake";

const DEFAULT_TIME = 0.1;
export const Timer = ({ focusObject, onTimersEnd, clearSubject }) => {
  useKeepAwake();

  const interval = useRef(null);
  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const onProgress = (progress) => {
    setProgress(progress);
  };

  const vibrate = () => {
    if (Platform.OS === "ios") {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 10000);
    } else {
      Vibration.vibrate(10000);
    }
  };

  const onChangeTime = (mins) => {
    setMinutes(mins);
    // console.log(mins, "minutes added");
    setProgress(1);
    setIsStarted(false);
  };

  const onEnd = () => {
    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
    onTimersEnd();
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={onProgress}
          onEnd={onEnd}
        />
      </View>

      <View style={styles.subContainer}>
        <Text style={styles.title}>We are focusing on:</Text>
        <Text style={styles.task}>{focusObject}</Text>
      </View>

      <View style={{ paddingTop: marginSizes.s }}>
        <ProgressBar progress={progress} style={{ height: 20 }} />
      </View>

      <View style={styles.buttonContainer}>
        <Timing onChangeTime={onChangeTime} />
      </View>

      <View style={styles.buttonContainer}>
        {isStarted ? (
          <RoundedButton title="pause" onPress={() => setIsStarted(false)} />
        ) : (
          <RoundedButton title="start" onPress={() => setIsStarted(true)} />
        )}

        <View style={styles.buttonStopContainer}>
          <RoundedButton title="cancel" onPress={() => clearSubject()} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  subContainer: {
    paddingTop: marginSizes.xxl,
  },

  title: {
    color: "#fff",
    textAlign: "center",
  },

  task: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  countdown: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flex: 0.5,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonStopContainer: {
    paddingLeft: 15,
    marginBottom: 12,
  }
});
