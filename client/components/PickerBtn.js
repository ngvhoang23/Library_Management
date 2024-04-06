import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { normalize } from "../defined_function";

function PickerBtn({ _styles, title, onPress }) {
  return (
    <TouchableOpacity style={[styles.wrapper, _styles]} onPress={onPress}>
      <View>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "90%",
    height: normalize(120),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#ced0d4",
    borderRadius: normalize(20),
  },
  title: {
    fontFamily: "nunito-medium",
    fontSize: normalize(14),
    letterSpacing: normalize(4),
    color: "#aaabaf",
  },
});

export default PickerBtn;
