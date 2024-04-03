import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { normalize } from "../defined_function";

export default function FlatButton({ text, _styles, onPress, fontSize, children }) {
  return (
    <TouchableOpacity style={[styles.wrapper, _styles]} onPress={onPress}>
      {children}
      <View style={[styles.button]}>
        <Text style={[styles.buttonText, { fontSize: fontSize || styles.buttonText.fontSize }]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 10,
  },
  button: {
    borderRadius: 8,
  },
  buttonText: {
    fontFamily: "nunito-bold",
    color: "#fff",
    textTransform: "uppercase",
    fontSize: normalize(9),
    textAlign: "center",
  },
});
