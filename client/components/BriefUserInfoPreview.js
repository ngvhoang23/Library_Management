import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { normalize } from "../defined_function";
import MarqueeView from "react-native-marquee-view";

function BriefUserInfoPreview({ _styles, full_name, phone_num, avatar, onPress, small }) {
  return (
    <TouchableOpacity style={[styles.wrapper, _styles]} onPress={onPress}>
      <View style={styles.container}>
        <Image
          source={{ uri: avatar }}
          style={[
            styles.avatarPreview,
            { width: styles.avatarPreview.width / 1.2, height: styles.avatarPreview.height / 1.2 },
          ]}
        />
        <View style={[styles.userInfo, styles.elevation, { padding: styles.userInfo.padding / 1.2 }]}>
          <MarqueeView
            style={[styles.marqueeView, { height: styles.marqueeView.height / 1.2 }]}
            autoPlay={full_name?.length > 20}
          >
            <Text style={[styles.userName, { fontSize: styles.userName.fontSize / 1.2 }]}>{full_name}</Text>
          </MarqueeView>
          {phone_num && (
            <Text style={[styles.phoneNum, { fontSize: styles.phoneNum.fontSize / 1.2 }]}>{phone_num}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {},

  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    height: normalize(120),
    position: "relative",
  },

  elevation: {
    elevation: 20,
    shadowColor: "#52006A",
  },

  avatarPreview: {
    width: normalize(80),
    height: normalize(100),
    position: "absolute",
    left: normalize(10),
    bottom: normalize(20),
    borderRadius: normalize(10),
    zIndex: 10,
  },

  userInfo: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#dbe3ef",
    padding: normalize(14),
    borderRadius: normalize(10),
    backgroundColor: "#fff",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
    textAlign: "right",
  },

  userName: {
    fontFamily: "nunito-medium",
    fontSize: normalize(14),
    letterSpacing: normalize(2),
    color: "#676768",
    marginBottom: normalize(6),
  },

  marqueeView: {
    height: normalize(30),
  },

  phoneNum: {
    fontFamily: "nunito-medium",
    fontSize: normalize(10),
    letterSpacing: normalize(2),
    marginBottom: normalize(4),
    color: "#aaabaf",
  },
});

export default BriefUserInfoPreview;
