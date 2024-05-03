import { Image, StyleSheet, Text, View } from "react-native";
import MarqueeView from "react-native-marquee-view";
import { normalize } from "../defined_function";
import { TouchableOpacity } from "react-native-gesture-handler";

function BookGroupVertical({ _styles, cover_photo, author_name, book_name, book_detail_id, onPress }) {
  return (
    <TouchableOpacity style={[styles.wrapper, _styles]} onPress={onPress}>
      <View style={styles.coverPhotoContainer}>
        <Image source={{ uri: `http://10.0.2.2:5000${cover_photo}` }} style={styles.coverPhoto} />
      </View>
      <View style={styles.content}>
        <Text style={[styles.bookName]} numberOfLines={2}>
          {book_name}
        </Text>
        <Text style={[styles.authorName]}>{author_name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  coverPhotoContainer: {
    elevation: 10,
    shadowColor: "#000",
    width: normalize(80),
    height: normalize(100),
    borderRadius: normalize(10),
    marginBottom: normalize(6),
  },

  coverPhoto: {
    width: normalize(80),
    height: normalize(100),
    borderRadius: normalize(10),
    marginBottom: normalize(8),
  },

  content: {
    alignItems: "center",
    justifyContent: "center",
  },
  bookName: {
    fontFamily: "nunito-bold",
    fontSize: normalize(11),
    color: "#3c3c3c",
    width: normalize(80),
    textAlign: "left",
    marginBottom: normalize(4),
    paddingHorizontal: normalize(4),
  },
  authorName: {
    fontFamily: "nunito-medium",
    fontSize: normalize(9),
    color: "#8c8c8d",
  },
});

export default BookGroupVertical;
