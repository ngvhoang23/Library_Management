import { StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { normalize } from "../defined_function";
import { TouchableOpacity } from "react-native-gesture-handler";

function OptionProfileItem({ _styles, icon, title, description, onPress }) {
  return (
    <TouchableOpacity activeOpacity={0} style={[styles.wrapper, _styles]} onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.iconWrapper}>{icon}</View>

        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>

      <View style={styles.rightIconWrapper}>
        <Entypo name="chevron-thin-right" size={normalize(14)} color="#6c60ff" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: normalize(10),
    padding: normalize(16),
    paddingHorizontal: normalize(26),
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconWrapper: {
    marginRight: normalize(20),
  },
  content: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  title: {
    fontFamily: "nunito-bold",
    color: "#3c3c3c",
    fontSize: normalize(12),
    textAlign: "center",
  },
  description: {
    fontFamily: "nunito-medium",
    color: "#8c8c8d",
    fontSize: normalize(10),
    textAlign: "center",
  },
  rightIconWrapper: {},
});

export default OptionProfileItem;
