import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button, Image, TouchableOpacity, Pressable } from "react-native";
import { normalize } from "../defined_function";
import { AntDesign, Feather } from "@expo/vector-icons";

function AddUserBtn({ _styles, title, onPress }) {
  return (
    <TouchableOpacity style={[styles.wrapper, _styles]} activeOpacity={0.6} onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.iconWrapper}>
          <Feather name="user-plus" size={normalize(16)} color="#6c60ff" />
        </View>
        <View style={styles.titleWrapper}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        </View>
      </View>

      <Feather name="chevron-right" size={normalize(18)} color="#fff" />
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
    padding: normalize(12),
    backgroundColor: "#6c60ff",
  },

  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  iconWrapper: {
    width: normalize(36),
    height: normalize(36),
    borderRadius: 1000,
    marginRight: normalize(20),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },

  title: {
    fontFamily: "nunito-bold",
    fontSize: normalize(11),
    color: "#fff",
  },

  titleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AddUserBtn;
