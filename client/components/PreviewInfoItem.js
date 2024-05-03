import { Pressable, StyleSheet, View } from "react-native";
import InputItem from "./InputItem";
import { TouchableOpacity } from "react-native-gesture-handler";
import { normalize } from "../defined_function";

function PreviewInfoItem({ lableTitle, textStyles, _styles, value, icon, onPress, multiline, border }) {
  return (
    <Pressable style={[styles.wrapper, _styles]} activeOpacity={0.8} onPress={onPress}>
      <InputItem
        _styles={[styles.input]}
        textStyles={textStyles}
        lableTitle={lableTitle}
        value={value}
        read_only
        multiline={multiline}
        border={border}
        icon={icon}
        onPress={onPress}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    flex: 1,
  },
});

export default PreviewInfoItem;
