import React, { useState } from "react";
import { View, StyleSheet, Text, Platform } from "react-native";
import { TextInput } from "react-native-paper";
import { RoundedButton } from "../../components/RoundedButton";
import { fontSizes, paddingSizes } from "../../utils/size";

export const Focus = ({ addSubject }) => {
  const [subject, setSubject] = useState(null);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>What would you like to focus on?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ flex: 1, marginRight: 20 }}
            // onSubmitEditing={({ nativeEvent }) => {
            //   setTempInput(nativeEvent.text);
            // }}
            onChangeText={(text) => {
              setSubject(text);
            }}
            keyboardType="default"
          />
          <RoundedButton
            size={50}
            title="+"
            onPress={() => {
              addSubject(subject);
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
  }, 

  titleContainer: {
    flex: 1,
    padding: Platform.OS === "ios" ? paddingSizes.xxl / 2 : 0,
    justifyContent: "center",
  },

  title: {
    color: "white",
    fontWeight: "bold",
    fontSize:
      Platform.OS === "ios" ? fontSizes.xxl / 2 + 10 : fontSizes.xxl / 2,
  },

  inputContainer: {
    paddingTop: paddingSizes.xxl / 2,
    flexDirection: "row",
    alignItems: "center",
  },
});
