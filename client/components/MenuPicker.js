import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Button, TextInput, View, Text, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/global.js";
import { Entypo } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { normalize } from "../defined_function/index.js";

function MenuPickers({ _styles, lableTitle, errorText, options, onChange, initIndex }) {
  const initRerender = useRef(false);
  const genderPickerRef = useRef();
  const [val, setVal] = useState();

  function openGenderPicker() {
    genderPickerRef.current.focus();
  }

  function closeGenderPicker() {
    genderPickerRef.current.blur();
  }

  useEffect(() => {
    if (options?.length > 0 && initIndex >= 0) {
      if (initRerender.current) {
        return;
      }
      initRerender.current = true;
      setVal(options[initIndex]);
    }
  }, [options, initIndex]);

  return (
    <View style={[_styles, styles.wrapper]}>
      <Text style={styles.lableTitle}>{lableTitle}</Text>
      <TouchableOpacity
        activeOpacity={1.0}
        onPress={() => {
          openGenderPicker();
        }}
        style={styles.container}
      >
        <Text style={[globalStyles.input, styles.input]}>{val?.title}</Text>
        <Entypo style={styles.icon} name="chevron-small-down" size={28} color="#949498" />
      </TouchableOpacity>
      {errorText && <Text style={[styles.errorText]}>{errorText}</Text>}

      {options?.length > 0 && (
        <View style={styles.genderPicker}>
          <Picker
            ref={genderPickerRef}
            selectedValue={val?.value}
            onValueChange={(selectedValue, selectedIndex) => {
              onChange(selectedValue, selectedIndex);
              setVal(options[selectedIndex]);
            }}
            pickerStyleType={{ display: "none" }}
          >
            {options?.map((option, index) => {
              return <Picker.Item key={option.value} label={option.title} value={option.value} />;
            })}
          </Picker>
        </View>
      )}
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

  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  icon: { marginRight: normalize(8) },
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
    marginLeft: normalize(6),
    fontSize: normalize(9),
    color: "#f02849",
  },
  genderPicker: {
    display: "none",
  },
});

export default MenuPickers;
