import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button, Image, TouchableOpacity, Pressable } from "react-native";
import { normalize } from "../defined_function";
import { AntDesign, Feather } from "@expo/vector-icons";

function EmployeeItem({ _style, data, onPress }) {
  const { full_name, role, user_avatar } = data;

  return (
    <TouchableOpacity style={[styles.wrapper, _style]} activeOpacity={0.6} onPress={onPress}>
      <View style={styles.container}>
        <View
          style={{
            elevation: 10,
            shadowColor: "#52006A",
            borderRadius: normalize(1000),
            marginRight: normalize(10),
          }}
        >
          <Image style={styles.empAvatar} source={{ uri: `http://10.0.2.2:5000${user_avatar}` }} />
        </View>
        <View style={styles.empInfo}>
          <Text style={styles.empName} numberOfLines={1}>
            {full_name}
          </Text>
          <View style={[styles.empType]}>
            <Image
              source={require("./../assets/images/emp_icon.png")}
              style={{ height: normalize(20), width: normalize(20), marginRight: normalize(4) }}
            />
            <Text style={[styles.empTypeTitle]}>Nhân viên</Text>
          </View>
        </View>
      </View>
      <Image
        source={require("./../assets/images/right_icon.png")}
        style={{ height: normalize(14), width: normalize(14), marginRight: normalize(4) }}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "#ced0d4",
    borderRadius: 8,
  },

  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },

  empAvatar: {
    width: normalize(40),
    height: normalize(40),
    borderRadius: 500000,
    marginRight: normalize(10),
  },

  empName: {
    fontFamily: "nunito-bold",
    fontSize: normalize(11),
    color: "#3c3c3c",
    width: "80%",
  },

  empInfo: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    flex: 1,
  },

  empType: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  empTypeTitle: {
    fontFamily: "nunito-bold",
    color: "#8c8c8d",
    fontSize: normalize(9),
  },
});
export default EmployeeItem;
