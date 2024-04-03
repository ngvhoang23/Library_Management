import { StyleSheet, View } from "react-native";
import InputItem from "./InputItem";
import { TouchableOpacity } from "react-native-gesture-handler";

function PreviewInfoItem({ lableTitle, textStyles, _styles, value, icon, onPress }) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={[styles.wrapper, _styles]}>
        <InputItem _styles={[styles.input]} textStyles={textStyles} lableTitle={lableTitle} value={value} read_only />
        {icon}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  input: {
    width: "90%",
  },
});

export default PreviewInfoItem;
