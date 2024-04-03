import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
    width: "80%",
    height: 140,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#ced0d4",
    borderRadius: 20,
  },
  title: {
    fontFamily: "nunito-medium",
    fontSize: 20,
    letterSpacing: 4,
    color: "#aaabaf",
  },
});

export default PickerBtn;
