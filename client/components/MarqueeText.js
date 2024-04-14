import { StyleSheet, Text } from "react-native";
import MarqueeView from "react-native-marquee-view";
import { normalize } from "../defined_function";

function MarqueeText({ title, is_play, active }) {
  return (
    <MarqueeView style={styles.marqueeView} playing={is_play} autoPlay={false}>
      <Text
        style={[
          styles.title,
          {
            color: active ? "#fff" : "#3c3c3c",
          },
        ]}
      >
        {title}
      </Text>
    </MarqueeView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "nunito-bold",
    fontSize: normalize(11),
    width: "100%",
  },

  marqueeView: {
    alignItems: "center",
    justifyContent: "center",
    height: normalize(20),
    width: "80%",
  },
});

export default MarqueeText;
