import { StyleSheet, View, Text, Button, Image, TouchableOpacity } from "react-native";
import { normalize } from "../defined_function";

function EmployeeItem({ _style, data, onPress }) {
  const { full_name, role, user_avatar } = data;

  return (
    <TouchableOpacity style={[styles.wrapper, _style]} activeOpacity={0.6} onPress={onPress}>
      <Image style={styles.empAvatar} source={{ uri: `http://10.0.2.2:5000${user_avatar}` }} />
      <Text style={styles.empName}>{full_name}</Text>
      <Text style={styles.role}>{role === "emp" ? "Staff" : role === "reader" ? "Reader" : "Admin"}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ced0d4",
    borderRadius: 8,
  },
  empAvatar: {
    width: normalize(50),
    height: normalize(50),
    borderRadius: 500000,
  },
  empName: {
    fontFamily: "nunito-medium",
    marginTop: normalize(8),
    fontSize: normalize(10),
  },
  role: {
    fontFamily: "nunito-medium",
    color: "#ccc",
    fontSize: normalize(8),
  },
});

export default EmployeeItem;
