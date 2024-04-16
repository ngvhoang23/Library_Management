import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { normalize } from "../defined_function";
import MarqueeView from "react-native-marquee-view";

function RoundUserInfoPreview({ _styles, reader_name, phone_num, user_avatar, large, borderColor }) {
  return (
    <View style={[styles.userContainer, _styles]}>
      <View style={[styles.readerAvatarContainer, { borderColor: borderColor }]}>
        <Image source={{ uri: user_avatar }} style={[styles.readerAvatar]} />
      </View>
      <View style={[styles.userInfo, styles.elevation]}>
        <MarqueeView style={[styles.marqueeView]} autoPlay={reader_name?.length > 20}>
          <Text style={[styles.readerName]}>{reader_name}</Text>
        </MarqueeView>
        {phone_num && <Text style={[styles.phoneNum]}>{phone_num}</Text>}
      </View>
      <View style={styles.loanIconWrapper}>
        <Image source={require("../assets/images/loan.png")} style={[styles.loanIcon]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: normalize(-30),
    borderWidth: 2,
    borderColor: "red",
    padding: normalize(20),
    borderRadius: normalize(10),
    position: "relative",
  },

  readerAvatarContainer: {
    padding: normalize(4),
    borderBottomWidth: normalize(4),
    borderTopWidth: normalize(4),
    borderLeftWidth: normalize(4),
    borderColor: "#6ec531",
    borderRadius: normalize(100),
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    alignSelf: "flex-start",
    elevation: 10,
    shadowColor: "#52006A",
  },
  readerAvatar: {
    width: normalize(60),
    height: normalize(60),
    borderRadius: normalize(1000),
  },
  userInfo: {
    flex: 1,
    marginLeft: normalize(10),
  },
  readerName: {
    width: "100%",
    fontFamily: "nunito-bold",
    fontSize: normalize(14),
    letterSpacing: normalize(2),
    color: "#676768",
    marginBottom: normalize(4),
  },
  phoneNum: {
    width: "100%",
    fontFamily: "nunito-bold",
    fontSize: normalize(10),
    letterSpacing: normalize(2),
    color: "#aaabaf",
  },

  loanIconWrapper: {
    position: "absolute",
    bottom: normalize(-10),
    right: normalize(10),
    backgroundColor: "#fff",
    paddingHorizontal: normalize(10),
  },

  loanIcon: {
    width: normalize(34),
    height: normalize(34),
  },
});

export default RoundUserInfoPreview;
