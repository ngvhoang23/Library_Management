import { useEffect } from "react";
import { StyleSheet, View, Text, Button, Image, TouchableOpacity } from "react-native";

function BookItem({ _style, data, onPress, have_position, status }) {
  const { position, book_name, cover_photo, author_name } = data;

  useEffect(() => {}, []);

  const renderPosition = () => {
    return position
      ?.split("-")
      .map((pos, index) => {
        if (index == 0) {
          pos = `K${pos}`;
        } else if (index == 1) {
          pos = `H${pos}`;
        } else if (index == 2) {
          pos = `TT${pos}`;
        }
        return pos;
      })
      .join("-");
  };

  return (
    <TouchableOpacity style={[styles.wrapper, _style]} activeOpacity={0.6} onPress={onPress}>
      <View style={[styles.container]}>
        <Image style={styles.coverPhoto} source={{ uri: `http://10.0.2.2:5000${cover_photo}` }} />
        <View style={styles.bookInfo}>
          <Text style={styles.bookName}>{book_name}</Text>
          {status && (
            <Text style={[styles.status, { color: status ? "#6ec531" : "#f02849" }]}>
              {status ? "available" : "unavailable"}
            </Text>
          )}
          {!have_position ? (
            <Text style={styles.authorName}>{author_name}</Text>
          ) : (
            <Text style={styles.authorName}>Position: {renderPosition()}</Text>
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
    padding: 10,
    borderWidth: 0.5,
    borderColor: "red",
    borderRadius: 8,
  },

  bookInfo: {
    position: "relative",
  },
  coverPhoto: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  bookName: {
    fontFamily: "nunito-medium",
    marginTop: 8,
    fontSize: 16,
    marginBottom: 6,
  },
  authorName: {
    fontFamily: "nunito-medium",
    color: "#676768",
    marginTop: 6,
    fontSize: 14,
  },
  status: {
    fontFamily: "nunito-medium",
    color: "#676768",
    fontSize: 14,
    position: "absolute",
    bottom: 0,
    right: 0,
  },
});

export default BookItem;
