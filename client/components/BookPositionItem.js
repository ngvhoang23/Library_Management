import { Image, StyleSheet, Text, View } from "react-native";
import { normalize } from "../defined_function";
import { TouchableOpacity } from "react-native-gesture-handler";

function BookPositionItem({ _styles, cover_photo, position, book_name, description, onPress }) {
  return (
    <TouchableOpacity style={[styles.wrapper, _styles]} onPress={onPress}>
      <Image source={{ uri: `http://10.0.2.2:5000${cover_photo}` }} style={styles.coverPhoto} />
      <View style={styles.content}>
        <Text style={styles.bookName} numberOfLines={1}>
          {book_name}
        </Text>
        <Text style={styles.position}>Position: {position}</Text>
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
    display: "flex",
  },

  coverPhoto: {
    height: normalize(50),
    width: normalize(40),
    borderRadius: normalize(10),
  },
  content: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginLeft: normalize(14),
  },
  position: {
    fontFamily: "nunito-medium",
    color: "#6c60ff",
    fontSize: normalize(10),
    width: "100%",
  },
  bookName: {
    fontFamily: "nunito-medium",
    color: "#292929",
    fontSize: normalize(11),
    marginBottom: normalize(4),
    width: "100%",
  },
  description: {
    fontFamily: "nunito-medium",
    color: "#8c8c8d",
    fontSize: normalize(9),
    width: "90%",
  },
});

export default BookPositionItem;
