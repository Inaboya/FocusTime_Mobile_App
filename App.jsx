import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Platform } from "react-native";

import AsyncStorage  from "@react-native-async-storage/async-storage";
import { Focus } from "./src/features/focus/Focus";
import { Timer } from "./src/features/timer/Timer";
import { marginSizes } from "./src/utils/size";
import { FocusHistory } from "./src/features/focus/FocusHistory";

const STATUSES = {
  completed: 1,
  canceled: 0,
};
const App = () => {
  const [focusObject, setFocusObject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const addFocusHistoryWithState = (focusSubject, status) => {
    setFocusHistory([...focusHistory, { focusSubject, status }]);
  };

  const onClear = () => {
    setFocusHistory([]);
  };

  const saveHistory = async () => {
    try {
      await AsyncStorage.setItem("focusHistory", JSON.stringify(focusHistory));
    } catch (error) {
      console.log(error);
    }
  };

  const loadFocusHistory = async () => {
    try {
      const value = await AsyncStorage.getItem("focusHistory");

      if (value && JSON.parse(value).length) {
        setFocusHistory(JSON.parse(value));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadFocusHistory();
  }, []);

  useEffect(() => {
    saveHistory();
  }, [focusHistory]);

  return (
    <View style={styles.container}>
      {focusObject ? (
        <Timer
          focusObject={focusObject}
          onTimersEnd={() => {
            addFocusHistoryWithState(focusObject, STATUSES.completed);
            setFocusObject(null);
          }}
          clearSubject={() => {
            addFocusHistoryWithState(focusObject, STATUSES.canceled);
            setFocusObject(null);
          }}
        />
      ) : (
        <View style={{flex: 1}}>
          <Focus addSubject={setFocusObject} />
          <FocusHistory focusHistory={focusHistory} onClear={onClear} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#255255",
    paddingTop: Platform.OS === "ios" ? 30 : marginSizes.lg,
  },
});

export default App;
