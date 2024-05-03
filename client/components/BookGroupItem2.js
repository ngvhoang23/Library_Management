import { Image, StyleSheet, Text, View } from "react-native";
import { normalize } from "../defined_function";
import { TouchableOpacity } from "react-native-gesture-handler";

function BookGroupItem2({ _styles, cover_photo, author_name, book_name, description, book_detail_id, onPress }) {
  return (
    <TouchableOpacity style={[styles.wrapper, _styles]} onPress={onPress}>
      <Image source={{ uri: `http://10.0.2.2:5000${cover_photo}` }} style={styles.coverPhoto} />
      <View style={styles.content}>
        <Text style={styles.authorName}>{author_name}</Text>
        <Text style={styles.bookName} numberOfLines={1}>
          {book_name}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderWidth: 1,
    borderColor: "#ced0d4",
    padding: normalize(10),
    borderRadius: normalize(10),
  },
  coverPhoto: {
    height: normalize(70),
    width: normalize(60),
    borderRadius: normalize(10),
  },
  content: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginLeft: normalize(10),
  },
  authorName: {
    fontFamily: "nunito-bold",
    color: "#8c8c8d",
    fontSize: normalize(10),
    marginBottom: normalize(8),
    width: "90%",
  },
  bookName: {
    fontFamily: "nunito-bold",
    color: "#292929",
    fontSize: normalize(13),
    marginBottom: normalize(2),
    width: "90%",
  },
  description: {
    fontFamily: "nunito-medium",
    color: "#8c8c8d",
    fontSize: normalize(9),
    width: "90%",
  },
});

export default BookGroupItem2;
