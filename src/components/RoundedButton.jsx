import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { fontSizes, paddingSizes } from "../utils/size";

export const RoundedButton = ({ style, textStyle, size = 125, ...props }) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={[styles(size).radius, style]}>
      <Text style={[styles(size).text, textStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = (size) =>
  StyleSheet.create({
    radius: {
      borderRadius: size / 2,
      width: size,
      height: size,
      borderColor: "#fff",
      borderWidth: 2,
      marginTop: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      color: "#fff",
      fontSize: size / 3,
    },
  });
