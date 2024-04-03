import React from "react";
import { StyleSheet, Button, TextInput, View, Text, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/global.js";
import { normalize } from "../defined_function/index.js";

function MyDateTimePicker({ _styles, lableTitle, value, errorText, onPress }) {
  return (
    <View style={[_styles, styles.wrapper]}>
      <Text style={styles.lableTitle}>{lableTitle}</Text>
      <TouchableOpacity activeOpacity={1.0} onPress={onPress}>
        <Text style={[globalStyles.input, styles.input]}>{value}</Text>
      </TouchableOpacity>
      {errorText && <Text style={[styles.errorText]}>{errorText}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    borderBottomWidth: 0.5,
    borderColor: "#ced0d4",
    borderRadius: 4,
  },
  lableTitle: {
    position: "absolute",
    zIndex: 10,
    left: normalize(6),
    top: normalize(2),
    fontSize: normalize(10),
    letterSpacing: 1,
    color: "#1e74fd",
    backgroundColor: "#fff",
    textTransform: "uppercase",
    fontFamily: "nunito-regular",
  },
  input: {
    marginTop: normalize(14),
    fontSize: normalize(12),
    fontFamily: "nunito-regular",
    borderColor: "transparent",
    letterSpacing: 1,
    color: "#676768",
  },
  errorText: {
    marginBottom: normalize(4),
    fontSize: normalize(9),
    marginLeft: normalize(6),
    color: "#f02849",
  },
});

export default MyDateTimePicker;
