import { StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "./../constants/Colors";
import CalculatorButton from "../components/CalculatorButton";

const index = () => {
  const [inputValue, setInputValue] = useState(null);
  const [inputExp, setInputExp] = useState(null);
  const opRegEx = /[+||\-||%||*||/||.]/;
  const numRegEx = /\d/;

  // button press function
  const handleButtonPress = (val) => {
    // if the value of the input is empty or the result of a calculation, and the button pressed
    // is a number(not an operation), change the input value completely to the value of the button pressed.
    if ((!inputValue || inputValue.includes("=")) && numRegEx.test(val)) {
      setInputValue(val);
    }
    // else if the value of the input is the result of a calculation, and the button pressed is an operation
    // (not a number), then remove the "=" symbol, and concatenate the operator to the input value.
    else if (inputValue.includes("=") && opRegEx.test(val)) {
      setInputValue((prev) => prev.replace("=", "").concat(val));
    }
    // finally, if none of the above, then the button pressed is a number, and the value of the input
    // is not null or the result of a calculation. Concatenate the value of the button pressed to the
    // input value.
    else {
      setInputValue((prev) => prev.concat(val));
    }
  };

  // backspace/delete function
  const del = () => {
    if (inputValue) {
      inputValue.length > 1 ? setInputValue((prev) => prev.slice(0, -1)) : setInputValue(null);
    }
  };

  // clear function
  const clearBtnPress = () => {
    setInputValue(null);
  };

  // All Clear function
  const acBtnPress = () => {
    setInputExp(null);
    setInputValue(null);
  };

  // evaluate function
  const evaluate = () => {
    const lastChar = inputValue.at(-1);
    let result;
    if (numRegEx.test(lastChar)) {
      result = Function("return " + inputValue)();
      const roundedResult = Math.round(result * 100000) / 100000;
      setInputExp(inputValue);
      setInputValue(`=${roundedResult}`);
    }
  };

  const deleteIcon = <Ionicons name="backspace-outline" size={30} color={Colors.white} />;
  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.inputContainer}>
        <View style={styles.prevContainer}>
          <Text style={styles.prevText}>{inputExp}</Text>
        </View>
        <TextInput style={styles.input} editable={false} defaultValue="0" value={inputValue} />
      </View>
      <View style={styles.btnsContainer}>
        <View style={styles.row}>
          <CalculatorButton btnValue={"AC"} pressFunction={() => acBtnPress()} isFunction={true} />
          <CalculatorButton btnValue={"C"} pressFunction={() => clearBtnPress()} isFunction={true} />
          <CalculatorButton btnValue={deleteIcon} pressFunction={() => del()} isFunction={true} />
          <CalculatorButton btnValue={"÷"} pressFunction={() => handleButtonPress("/")} isFunction={true} />
        </View>
        <View style={styles.row}>
          <CalculatorButton btnValue={"7"} pressFunction={() => handleButtonPress("7")} />
          <CalculatorButton btnValue={"8"} pressFunction={() => handleButtonPress("8")} />
          <CalculatorButton btnValue={"9"} pressFunction={() => handleButtonPress("9")} />
          <CalculatorButton btnValue={"×"} pressFunction={() => handleButtonPress("*")} isFunction={true} />
        </View>
        <View style={styles.row}>
          <CalculatorButton btnValue={"4"} pressFunction={() => handleButtonPress("4")} />
          <CalculatorButton btnValue={"5"} pressFunction={() => handleButtonPress("5")} />
          <CalculatorButton btnValue={"6"} pressFunction={() => handleButtonPress("6")} />
          <CalculatorButton btnValue={"+"} pressFunction={() => handleButtonPress("+")} isFunction={true} />
        </View>
        <View style={styles.row}>
          <CalculatorButton btnValue={"1"} pressFunction={() => handleButtonPress("1")} />
          <CalculatorButton btnValue={"2"} pressFunction={() => handleButtonPress("2")} />
          <CalculatorButton btnValue={"3"} pressFunction={() => handleButtonPress("3")} />
          <CalculatorButton btnValue={"-"} pressFunction={() => handleButtonPress("-")} isFunction={true} />
        </View>
        <View style={styles.row}>
          <CalculatorButton btnValue={"%"} pressFunction={() => handleButtonPress("%")} />
          <CalculatorButton btnValue={"0"} pressFunction={() => handleButtonPress("0")} />
          <CalculatorButton btnValue={"."} pressFunction={() => handleButtonPress(".")} />
          <CalculatorButton btnValue={"="} pressFunction={() => evaluate()} isFunction={true} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: Colors.white,
    height: "100%",
  },

  inputContainer: {
    flex: 1,
  },

  input: {
    flex: 0.3,
    color: Colors.black,
    textAlign: "right",
    paddingRight: 15,
    fontSize: 50,
  },

  prevContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingRight: 15,
  },

  prevText: {
    fontSize: 30,
    color: "grey",
    textAlign: "right",
  },

  btnsContainer: {
    flex: 1.48,
    justifyContent: "space-evenly",
  },

  row: {
    flex: 1,
    flexDirection: "row",
  },
});
export default index;
