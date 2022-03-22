import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { fontSizes, paddingSizes } from "../utils/size";

const minutesToMilliseconds = (mins) => mins * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);
export const Countdown = ({ minutes, isPaused, onProgress, onEnd }) => {
  const interval = useRef(null);
  const [timeLeft, setTimeLeft] = useState(null);

  const countdown = () => {
    setTimeLeft((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        onEnd();
        return time;
      }

      const newTime = time - 1000;

      // report the progress

      return newTime;
    });
  };

  useEffect(() => {
    onProgress(timeLeft / minutesToMilliseconds(minutes));

    if (timeLeft === 0) {
      onEnd();
    }
  }, [timeLeft]);

  useEffect(() => {
    setTimeLeft(minutesToMilliseconds(minutes));
  }, [minutes]);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(countdown, 1000);
    return () => clearInterval(interval.current);
  }, [isPaused]);

  const minute = Math.floor((timeLeft / (1000 * 60)) % 60);
  const second = Math.floor(timeLeft / 1000) % 60;
  return (
    <View>
      <Text style={styles.text}>
        {formatTime(minute)} : {formatTime(second)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    marginTop: paddingSizes.lg,
    fontSize: fontSizes.xxxl,
    fontWeight: "bold",
    color: "white",
    padding: paddingSizes.lg,
    backgroundColor: "rgba(94, 132, 226, 0.6)",
  },
});
