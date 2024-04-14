import React from "react";
import { StyleSheet, Text, View, Image, ImageBackground, Dimensions, StatusBar, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { SimpleLineIcons, AntDesign } from "@expo/vector-icons";
import { normalize } from "../defined_function";

function MainHeader({ title, navigation, is_stack, back_key }) {
  const openMenu = () => {
    navigation.openDrawer();
  };

  return (
    <ImageBackground source={require("../assets/images/page_bg2.jpg")} style={styles.header}>
      {is_stack ? (
        <Pressable onPress={() => navigation.goBack()} style={styles.icon}>
          <AntDesign name="left" size={normalize(16)} color="#3c3c3c" />
        </Pressable>
      ) : (
        <Pressable onPress={openMenu} style={styles.icon}>
          <SimpleLineIcons name="menu" size={normalize(15)} color="#3c3c3c" />
        </Pressable>
      )}
      <View style={styles.headerTitle}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    width: Dimensions.get("window").width,
    height: normalize(54),
    paddingTop: StatusBar.currentHeight + normalize(2),
    paddingBottom: normalize(6),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
    borderBottomWidth: 0.5,
    borderColor: "#ced0d4",
  },
  headerText: {
    fontFamily: "nunito-bold",
    fontSize: normalize(13),
    color: "#333",
    letterSpacing: 1,
    color: "#3c3c3c",
  },
  icon: {
    paddingTop: StatusBar.currentHeight + normalize(2),
    paddingBottom: normalize(6),
    position: "absolute",
    left: normalize(8),
    color: "#3c3c3c",
    paddingHorizontal: normalize(14),
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    flexDirection: "row",
  },
  headerImage: {
    width: normalize(26),
    height: normalize(26),
    marginHorizontal: normalize(10),
  },
});

export default MainHeader;
