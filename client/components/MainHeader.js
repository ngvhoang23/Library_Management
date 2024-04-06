import React from "react";
import { StyleSheet, Text, View, Image, ImageBackground, Dimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { SimpleLineIcons, AntDesign } from "@expo/vector-icons";
import { normalize } from "../defined_function";

function MainHeader({ title, navigation, is_stack, back_key }) {
  const openMenu = () => {
    navigation.openDrawer();
  };

  return (
    <View source={require("../assets/images/header_bg.png")} style={styles.header}>
      {is_stack ? (
        <AntDesign
          name="left"
          size={normalize(16)}
          color="black"
          style={styles.icon}
          onPress={() => navigation.goBack()}
        />
      ) : (
        <SimpleLineIcons name="menu" size={normalize(14)} onPress={openMenu} style={styles.icon} />
      )}
      <View style={styles.headerTitle}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: Dimensions.get("window").width,
    height: normalize(52),
    paddingTop: normalize(14),
    paddingBottom: normalize(6),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e74fd",
    justifyContent: "center",
  },
  headerText: {
    fontFamily: "nunito-bold",
    fontSize: normalize(13),
    color: "#333",
    letterSpacing: 1,
    color: "#fff",
  },
  icon: {
    paddingTop: normalize(14),
    paddingBottom: normalize(6),
    position: "absolute",
    left: normalize(16),
    color: "#fff",
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
