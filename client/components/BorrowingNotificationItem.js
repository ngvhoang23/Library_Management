import { Image, StyleSheet, Text, View } from "react-native";
import { useUserInfoContext } from "../context/userInfoContext";
import { normalize } from "../defined_function";
import { TouchableOpacity } from "react-native-gesture-handler";
import moment from "moment/moment";

function BorrowingNotificationItem({
  user_id,
  full_name,
  user_avatar,
  book_id,
  book_name,
  cover_photo,
  created_at,
  borrow_date,
  onPress,
}) {
  return (
    <TouchableOpacity style={styles.wrapper} onPress={onPress}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: `http://10.0.2.2:5000/${user_avatar}` }} style={styles.userAvatar} />
        <Image source={{ uri: `http://10.0.2.2:5000/${cover_photo}` }} style={styles.coverPhoto} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {full_name} <Text style={{ fontFamily: "nunito-medium" }}>has just borrowed</Text> {book_name}
        </Text>
        <Text style={styles.subTitle}>Borrow Date: {new Date(borrow_date).toLocaleDateString("en-GB")}</Text>
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
    position: "relative",
    width: normalize(42),
    height: normalize(42),
    marginRight: normalize(20),
  },
  userAvatar: {
    width: normalize(33),
    height: normalize(33),
    borderRadius: normalize(1000),
    position: "absolute",
    bottom: normalize(0),
    left: normalize(0),
    borderWidth: 4,
    borderColor: "#fff",
    zIndex: 10,
  },
  coverPhoto: {
    width: normalize(30),
    height: normalize(30),
    borderRadius: normalize(1000),
    position: "absolute",
    top: normalize(0),
    right: normalize(0),
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

export default BorrowingNotificationItem;
