import { useEffect } from "react";
import { StyleSheet, View, Text, Button, Image, TouchableOpacity } from "react-native";
import { normalize } from "../defined_function";

function DebtorItem({ _style, debtor_name, debtor_avatar, debtor_phone_num, onPress, total_fine }) {
  return (
    <TouchableOpacity style={[styles.wrapper, _style]} activeOpacity={0.6} onPress={onPress}>
      <View style={[styles.container]}>
        <Image style={styles.userAvatar} source={{ uri: `http://10.0.2.2:5000${debtor_avatar}` }} />
        <View style={styles.borrowerInfo}>
          <Text style={styles.borrowerName} numberOfLines={2}>
            {debtor_name}
          </Text>

          <Text style={styles.phoneNum} numberOfLines={1}>
            {debtor_phone_num}
          </Text>

          {total_fine != null && total_fine != undefined && (
            <Text style={[styles.totalFine, { color: "#f02849" }]}>{`Fine: ${total_fine}`}</Text>
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

  totalFine: {
    fontFamily: "nunito-medium",
    marginTop: normalize(6),
    fontSize: normalize(10),
  },
});

export default DebtorItem;
