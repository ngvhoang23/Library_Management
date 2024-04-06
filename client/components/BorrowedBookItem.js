import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { normalize } from "../defined_function";

function BorrowedBookItem({ _style, data }) {
  const { reader_avatar, reader_name, reader_phone_num, book_cover_photo, book_name, author_name } = data;

  return (
    <TouchableOpacity style={[styles.wrapper, _style]}>
      <Image source={{ uri: `http://10.0.2.2:5000${reader_avatar}` }} style={styles.readerAvatar} />
      <View style={styles.container}>
        <Text style={styles.readerName} numberOfLines={1}>
          {reader_name}
        </Text>
        <Text style={styles.readerPhoneNum} numberOfLines={1}>
          {reader_phone_num}
        </Text>
        <View style={styles.bookContainer}>
          <Image source={{ uri: `http://10.0.2.2:5000${book_cover_photo}` }} style={styles.bookCoverPhoto} />
          <View style={styles.bookContent}>
            <Text style={styles.bookName} numberOfLines={1}>
              {book_name}
            </Text>
            <Text style={styles.authorName} numberOfLines={1}>
              {author_name}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  readerAvatar: {
    aspectRatio: 1,
    height: normalize(60),
    borderRadius: 10,
    marginRight: normalize(14),
  },
  container: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  readerName: {
    fontFamily: "nunito-medium",
    fontSize: normalize(12),
    letterSpacing: 2,
    width: normalize(150),
    color: "#676768",
  },
  readerPhoneNum: { fontFamily: "nunito-medium", fontSize: normalize(10), letterSpacing: 2, color: "#aaabaf" },
  bookContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: normalize(6),
  },
  bookContent: {
    marginLeft: normalize(4),
  },
  bookCoverPhoto: {
    aspectRatio: 1,
    height: normalize(26),
    borderRadius: 10,
  },
  bookName: {
    width: normalize(180),
    fontFamily: "nunito-medium",
    fontSize: normalize(10),
    letterSpacing: 2,
    color: "#676768",
    marginBottom: normalize(2),
  },
  authorName: {
    width: normalize(180),
    fontFamily: "nunito-medium",
    fontSize: normalize(8),
    letterSpacing: 2,
    color: "#aaabaf",
  },
});

export default BorrowedBookItem;
