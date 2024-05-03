import { StyleSheet, Text, View } from "react-native";
import { normalize } from "../defined_function";

function RowItem({ _styles, data }) {
  const renderCols = () => {
    return data.map((item, index) => {
      return (
        <View key={index} style={[styles.col, { width: `${item.per || 10}%` }, item.styles]}>
          <Text style={[styles.content, item.styles, { padding: styles.padding }]} numberOfLines={2}>
            {item.content}
          </Text>
        </View>
      );
    });
  };

  return <View style={[styles.wrapper, _styles]}>{renderCols()}</View>;
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  col: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    borderColor: "#ced0d4",
    height: "100%",
  },

  content: {
    textAlign: "center",
    fontFamily: "nunito-medium",
    fontSize: normalize(12),
    color: "#3c3c3c",
  },
});

export default RowItem;
