import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button, Image, TouchableOpacity, Pressable } from "react-native";
import { normalize } from "../defined_function";
import { AntDesign, Feather } from "@expo/vector-icons";

function ReaderItem({ _style, data, borrowed_books, onPress }) {
  const { user_id, full_name, reader_type, user_avatar, expire_date } = data;

  const [status, setStatus] = useState(true);

  useEffect(() => {
    if (new Date(expire_date) <= new Date()) {
      setStatus(0);
    } else {
      setStatus(1);
    }
  }, [data]);

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
          <Image style={styles.readerAvatar} source={{ uri: `http://10.0.2.2:5000${user_avatar}` }} />
        </View>
        <View style={styles.readerInfo}>
          <Text style={styles.readerName} numberOfLines={1}>
            {full_name}
          </Text>
          <Text style={[styles.readerType]}>
            {reader_type === "student" ? "Student" : reader_type === "lecturer" ? "Lecturer" : ""}
          </Text>
          {borrowed_books != null && (
            <Text style={[styles.borrowedBookQuantity, { color: borrowed_books >= 4 ? "#f02849" : "#1e74fd" }]}>
              borrowed books: {borrowed_books}
            </Text>
          )}
        </View>
      </View>
      <Text style={[styles.status, { color: status ? "#6ec531" : "#f02849" }]}>{status ? "active" : "expired"}</Text>

      <Feather name="chevron-right" size={normalize(18)} color="#8c8c8d" />
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

  readerAvatar: {
    width: normalize(40),
    height: normalize(40),
    borderRadius: 500000,
    marginRight: normalize(10),
  },

  readerName: {
    fontFamily: "nunito-bold",
    fontSize: normalize(11),
    color: "#3c3c3c",
    width: "80%",
  },

  readerInfo: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    flex: 1,
  },

  readerType: {
    fontFamily: "nunito-bold",
    color: "#8c8c8d",
    fontSize: normalize(9),
  },

  status: {
    display: "none",
    fontFamily: "nunito-medium",
    color: "#ccc",
    fontSize: normalize(10),
    position: "absolute",
    top: normalize(4),
    left: normalize(10),
  },
  borrowedBookQuantity: {
    fontFamily: "nunito-medium",
    fontSize: normalize(10),
  },
});

export default ReaderItem;
