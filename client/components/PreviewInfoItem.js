import { StyleSheet, View } from "react-native";
import InputItem from "./InputItem";
import { TouchableOpacity } from "react-native-gesture-handler";
import { normalize } from "../defined_function";

function PreviewInfoItem({ lableTitle, textStyles, _styles, value, icon, onPress, multiline }) {
  return (
    <TouchableOpacity style={[styles.wrapper, _styles]} activeOpacity={0.8} onPress={onPress}>
      <InputItem
        _styles={[styles.input]}
        textStyles={textStyles}
        lableTitle={lableTitle}
        value={value}
        read_only
        multiline={multiline}
      />
      {icon}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: normalize(10),
  },
  input: {
    flex: 1,
  },
});

export default PreviewInfoItem;
