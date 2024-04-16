import { Image, StyleSheet, Text, View } from "react-native";
import { useUserInfoContext } from "../context/userInfoContext";
import { normalize } from "../defined_function";
import { TouchableOpacity } from "react-native-gesture-handler";
import moment from "moment/moment";

function FineNotificationItem({ user_id, full_name, user_avatar, amount_collected, created_at, onPress }) {
  return (
    <TouchableOpacity style={styles.wrapper} onPress={onPress}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: `http://10.0.2.2:5000/${user_avatar}` }} style={styles.userAvatar} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {full_name}
          <Text style={{ fontFamily: "nunito-medium" }}> has just paid </Text>
          <Text style={{ fontFamily: "nunito-bold", color: "#6ec531" }}>{amount_collected}</Text>
        </Text>
        <Text style={styles.subTitle}>Payment Date: {new Date(created_at).toLocaleDateString("en-GB")}</Text>
      </View>

      <View style={styles.timeContainer}>
        <Text style={styles.timeStamp}>{moment(new Date(created_at)).fromNow()}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: normalize(20),
    paddingVertical: normalize(10),
    marginBottom: normalize(10),
  },
  avatarContainer: {
    width: normalize(42),
    height: normalize(42),
    marginRight: normalize(20),
  },
  userAvatar: {
    width: normalize(33),
    height: normalize(33),
    borderRadius: normalize(1000),
  },

  content: {
    flex: 1,
  },
  title: {
    fontFamily: "nunito-bold",
    fontSize: normalize(11),
    color: "#3c3c3c",
    width: "80%",
  },
  subTitle: {
    fontFamily: "nunito-bold",
    color: "#8c8c8d",
    fontSize: normalize(9),
  },
  timeContainer: {},
  timeStamp: {
    fontFamily: "nunito-bold",
    color: "#8c8c8d",
    fontSize: normalize(9),
  },
});

export default FineNotificationItem;
