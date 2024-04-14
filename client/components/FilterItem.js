import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button, Image, TouchableOpacity, Pressable } from "react-native";
import { normalize } from "../defined_function";
import { AntDesign, Feather } from "@expo/vector-icons";
import MarqueeView from "react-native-marquee-view";
import MarqueeText from "./MarqueeText";

function FilterItem({ _styles, title, subTitle, onPress, icon, active, right_icon }) {
  return (
    <TouchableOpacity
      style={[styles.wrapper, _styles, { backgroundColor: active ? "#6c60ff" : "transparent" }]}
      activeOpacity={0.6}
      onPress={onPress}
    >
      <View style={styles.iconWrapper}>{icon}</View>
      <View style={styles.titleWrapper}>
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

        {subTitle && (
          <Text
            style={[
              styles.subTitle,
              {
                color: active ? "#fff" : "#3c3c3c",
              },
            ]}
            numberOfLines={1}
          >
            {subTitle}
          </Text>
        )}
      </View>
      <View style={styles.rightIcon}>{right_icon}</View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "#ced0d4",
    borderRadius: 8,
    paddingVertical: normalize(8),
    paddingHorizontal: normalize(14),
    borderWidth: 1,
    borderColor: "#ced0d4",
  },

  iconWrapper: {
    borderRadius: 1000,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontFamily: "nunito-bold",
    fontSize: normalize(11),
  },

  subTitle: {
    fontFamily: "nunito-bold",
    fontSize: normalize(8),
  },

  titleWrapper: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "76%",
  },

  rightIcon: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default FilterItem;
