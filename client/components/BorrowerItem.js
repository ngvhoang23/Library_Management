import { useEffect } from "react";
import { StyleSheet, View, Text, Button, Image, TouchableOpacity } from "react-native";
import { normalize } from "../defined_function";

function BorrowerItem({ _style, data, onPress, status, borrowing_books, fine }) {
  const { full_name, user_avatar, phone_num } = data;

  useEffect(() => {}, []);

  return (
    <TouchableOpacity style={[styles.wrapper, _style]} activeOpacity={0.6} onPress={onPress}>
      <View style={[styles.container]}>
        <Image style={styles.userAvatar} source={{ uri: `http://10.0.2.2:5000${user_avatar}` }} />
        <View style={styles.borrowerInfo}>
          <Text style={styles.borrowerName} numberOfLines={2}>
            {full_name}
          </Text>
          {status && (
            <Text style={[styles.status, { color: status ? "#6ec531" : "#f02849" }]}>
              {status ? "available" : "unavailable"}
            </Text>
          )}
          <Text style={styles.phoneNum} numberOfLines={1}>
            {phone_num}
          </Text>

          {borrowing_books != null && borrowing_books != undefined && (
            <Text
              style={[styles.borrowingBooks, { color: borrowing_books > 0 ? "#6ec531" : "#f02849" }]}
            >{`Borrowing books: ${borrowing_books}`}</Text>
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
    fontFamily: "nunito-medium",
    color: "#676768",

    fontSize: normalize(12),
  },
  phoneNum: {
    fontFamily: "nunito-medium",
    color: "#676768",
    marginTop: normalize(6),
    fontSize: normalize(10),
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
});

export default BorrowerItem;
