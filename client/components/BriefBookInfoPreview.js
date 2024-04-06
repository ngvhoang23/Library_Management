import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { normalize } from "../defined_function";

function BriefBookInfoPreview({ _styles, book_name, author_name, position, cover_photo, onPress }) {
  const renderPosition = (oosition) => {
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
    <TouchableOpacity style={[styles.wrapper, _styles]} onPress={onPress}>
      <Image source={{ uri: cover_photo }} style={styles.avatarPreview} />
      <View style={styles.bookInfo}>
        <Text style={styles.bookName} numberOfLines={3}>
          {book_name}
        </Text>
        <Text style={styles.authorName}>{author_name}</Text>
        <Text style={styles.position}>Position: {renderPosition(position)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "90%",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#ced0d4",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: normalize(14),
  },

  bookInfo: {
    width: "70%",
    marginLeft: normalize(10),
  },

  bookName: {
    width: "100%",
    fontFamily: "nunito-medium",
    fontSize: normalize(12),
    letterSpacing: normalize(2),
    color: "#676768",
    marginBottom: normalize(6),
  },

  authorName: {
    width: "100%",
    fontFamily: "nunito-medium",
    fontSize: normalize(9),
    letterSpacing: normalize(2),
    marginBottom: normalize(4),
    color: "#aaabaf",
  },

  position: {
    width: "100%",
    fontFamily: "nunito-medium",
    fontSize: normalize(9),
    letterSpacing: normalize(2),
    color: "#aaabaf",
  },

  avatarPreview: { width: normalize(70), height: normalize(70) },
});

export default BriefBookInfoPreview;
