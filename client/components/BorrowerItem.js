import { useEffect } from "react";
import { StyleSheet, View, Text, Button, Image, TouchableOpacity } from "react-native";
import { normalize } from "../defined_function";

function BorrowerItem({ _style, data, onPress, borrowing_progress, borrowing_books, fine }) {
  const { full_name, user_avatar, phone_num } = data;

  return (
    <TouchableOpacity style={[styles.wrapper, _style]} activeOpacity={0.6} onPress={onPress}>
      <View style={[styles.container]}>
        <Image style={styles.userAvatar} source={{ uri: `http://10.0.2.2:5000${user_avatar}` }} />
        <View style={styles.borrowerInfo}>
          <Text style={styles.borrowerName} numberOfLines={1}>
            {full_name}
          </Text>
          <Text style={styles.phoneNum} numberOfLines={1}>
            {phone_num}
          </Text>

          {borrowing_progress && (
            <View style={styles.progress}>
              <Text style={styles.borrowedBooks}>Đã mượn {borrowing_books} cuốn</Text>
            </View>
          )}

          {fine != null && fine != undefined && (
            <Text style={[styles.fine, { color: "#f02849" }]}>{`Fine: ${fine}`}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: normalize(6),
    borderBottomWidth: 0,
    borderColor: "#ced0d4",
  },

  borrowerInfo: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flex: 1,
    position: "relative",
    marginLeft: normalize(10),
  },
  userAvatar: {
    width: normalize(52),
    height: normalize(52),
    borderRadius: 8,
  },
  borrowerName: {
    width: "90%",
    fontSize: normalize(12),
    fontFamily: "nunito-bold",
    marginTop: normalize(8),
    color: "#3c3c3c",
  },
  phoneNum: {
    marginTop: normalize(6),
    fontFamily: "nunito-bold",
    color: "#8c8c8d",
    fontSize: normalize(9),
  },

  borrowingBooks: {
    fontFamily: "nunito-medium",
    marginTop: normalize(6),
    fontSize: normalize(10),
  },

  fine: {
    fontFamily: "nunito-medium",
    marginTop: normalize(6),
    fontSize: normalize(10),
  },

  progress: {
    marginTop: normalize(8),
  },

  borrowedBooks: {
    fontFamily: "nunito-bold",
    color: "#1e74fd",
    fontSize: normalize(10),
    bottom: normalize(4),
  },
});

export default BorrowerItem;
