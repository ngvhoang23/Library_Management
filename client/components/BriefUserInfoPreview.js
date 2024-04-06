import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { normalize } from "../defined_function";

function BriefUserInfoPreview({ _styles, full_name, phone_num, avatar, onPress }) {
  return (
    <TouchableOpacity style={[styles.wrapper, _styles]} onPress={onPress}>
      <Image source={{ uri: avatar }} style={styles.avatarPreview} />
      <View style={styles.userInfo}>
        <Text style={styles.userName} numberOfLines={3}>
          {full_name}
        </Text>
        <Text style={styles.phoneNum}>{phone_num}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: normalize(30),
    width: "90%",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#ced0d4",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: normalize(14),
  },

  userInfo: {
    width: "70%",
    marginLeft: normalize(10),
  },

  userName: {
    width: "100%",
    fontFamily: "nunito-medium",
    fontSize: normalize(13),
    letterSpacing: normalize(2),
    color: "#676768",
    marginBottom: normalize(6),
  },

  phoneNum: {
    width: "100%",
    fontFamily: "nunito-medium",
    fontSize: normalize(9),
    letterSpacing: normalize(2),
    color: "#aaabaf",
  },

  avatarPreview: { width: normalize(70), height: normalize(70) },
});

export default BriefUserInfoPreview;
