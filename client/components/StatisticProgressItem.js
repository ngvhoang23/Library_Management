import { StyleSheet, View } from "react-native";
import { normalize } from "../defined_function";
import { ProgressCircle } from "react-native-svg";
import CircularProgress from "react-native-circular-progress-indicator";

function StatisticProgressItem({ value, maxValue, radius, title, activeColor }) {
  return (
    <CircularProgress
      value={value}
      radius={radius || 60}
      duration={1000}
      progressValueColor={"#676768"}
      maxValue={maxValue}
      title={title}
      titleColor={"#676768"}
      titleStyle={{ fontWeight: "bold", fontFamily: "nunito-bold" }}
      activeStrokeColor={activeColor}
    />
  );
}

const styles = StyleSheet.create({
  //   wrapper: {
  //     borderWidth: normalize(6),
  //     borderColor: "#ced0d4",
  //     borderRadius: normalize(1000),
  //     height: normalize(50),
  //     width: normalize(50),
  //     position: "relative",
  //   },
  //   completed: {
  //     borderWidth: normalize(6),
  //     borderColor: "#5b4cfd",
  //     borderRadius: normalize(1000),
  //     height: normalize(50),
  //     width: normalize(50),
  //     position: "absolute",
  //     top: normalize(0),
  //     left: normalize(0),
  //     bottom: normalize(0),
  //   },
});

export default StatisticProgressItem;
