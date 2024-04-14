import React from "react";
import { StyleSheet, Button, TextInput, View, Text, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/global.js";
import { normalize } from "../defined_function/index.js";

function InputItem({
  _styles,
  lableTitle,
  placeholder,
  onChange,
  value,
  errorText,
  onPress,
  read_only,
  textStyles,
  multiline,
  numberOnly,
}) {
  return (
    <View style={[_styles, styles.wrapper]}>
      <Text style={styles.lableTitle}>{lableTitle}</Text>
      <TouchableOpacity activeOpacity={1.0} onPress={onPress}>
        <TextInput
          style={[globalStyles.input, styles.input, textStyles]}
          placeholder={placeholder}
          onChangeText={onChange}
          value={value}
          placeholderTextColor={"#ced0d4"}
          editable={!read_only}
          multiline={multiline}
          keyboardType={numberOnly ? "numeric" : "numbers-and-punctuation"}
        />
      </TouchableOpacity>
      {errorText && <Text style={[styles.errorText]}>{errorText}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
  },
  lableTitle: {
    position: "absolute",
    zIndex: 10,
    left: normalize(6),
    top: normalize(2),
    fontSize: normalize(11),
    letterSpacing: 1,
    color: "#3c3c3c",
    fontFamily: "nunito-bold",
  },
  submitBtn: {
    marginTop: normalize(16),
  },
  input: {
    marginTop: normalize(14),
    fontSize: normalize(12),
    fontFamily: "nunito-regular",
    borderColor: "transparent",
    letterSpacing: 1,
    marginLeft: normalize(6),
  },
  errorText: {
    marginBottom: normalize(4),
    marginLeft: normalize(6),
    fontSize: normalize(10),
    color: "#f02849",
  },
});

export default InputItem;
