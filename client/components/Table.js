import { ScrollView, StyleSheet, View } from "react-native";
import RowItem from "./RowItem";
import { normalize } from "../defined_function";

function Table({ _styles, data, scrollHeight }) {
  const renderRows = () => {
    const rows = data.shift();

    return data.map((item, index) => {
      return <RowItem key={index} data={item} _styles={styles.row} />;
    });
  };

  const renderHeader = () => {
    return <RowItem data={data[0]} _styles={styles.row} />;
  };

  return (
    <View style={[styles.wrapper, _styles]}>
      {renderHeader()}
      <ScrollView vertical style={{ maxHeight: scrollHeight }} showsVerticalScrollIndicator nestedScrollEnabled={true}>
        {renderRows()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    borderWidth: 1,
    borderColor: "#ced0d4",
    borderBottomWidth: 0,
    borderRightWidth: 0,
  },

  row: {
    borderBottomWidth: 1,
    borderColor: "#ced0d4",
  },
});

export default Table;
