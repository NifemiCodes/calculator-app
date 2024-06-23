import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "./../constants/Colors";

const CalculatorButton = ({ btnValue, pressFunction, isFunction }) => {
  return (
    <>
      <Pressable
        onPress={pressFunction}
        style={({ pressed }) => [
          { backgroundColor: pressed ? "rgba(0, 0, 0, 0.2)" : "transparent" },
          styles.btn,
          isFunction && { backgroundColor: pressed ? Colors.lightGrey : Colors.darkGrey },
          btnValue === "=" && { backgroundColor: pressed ? Colors.lightGrey : Colors.blue },
        ]}>
        <Text style={[styles.btnText, isFunction && styles.functionBtnText]}>{btnValue}</Text>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  btnText: {
    color: Colors.black,
    fontSize: 30,
  },

  functionBtnText: {
    color: Colors.white,
  },
});

export default CalculatorButton;
