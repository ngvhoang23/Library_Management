import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button, Image, TouchableOpacity } from "react-native";
import { normalize } from "../defined_function";

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
      <Image style={styles.readerAvatar} source={{ uri: `http://10.0.2.2:5000${user_avatar}` }} />
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
      <Text style={[styles.status, { color: status ? "#6ec531" : "#f02849" }]}>{status ? "active" : "expired"}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ced0d4",
    borderRadius: 8,
  },
  readerAvatar: {
    width: normalize(50),
    height: normalize(50),
    borderRadius: 500000,
  },
  readerName: {
    fontFamily: "nunito-medium",
    marginTop: normalize(8),
    fontSize: normalize(10),
  },
  readerType: {
    fontFamily: "nunito-medium",
    color: "#ccc",
    fontSize: normalize(10),
  },
  status: {
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
