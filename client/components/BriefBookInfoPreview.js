import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { normalize } from "../defined_function";

function BriefBookInfoPreview({ _styles, book_name, author_name, position, cover_photo, overdue, onPress }) {
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
        {author_name && <Text style={styles.authorName}>{author_name}</Text>}
        {position && <Text style={styles.position}>Position: {renderPosition(position)}</Text>}
        {overdue && <Text style={styles.overdue}>Overdue</Text>}
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

  overdue: {
    fontFamily: "nunito-medium",
    fontSize: normalize(10),
    position: "absolute",
    bottom: normalize(0),
    right: normalize(0),
    borderWidth: 1,
    borderColor: "#f02849",
    borderStyle: "solid",
    borderRadius: normalize(6),
    paddingHorizontal: normalize(6),
    paddingVertical: normalize(4),
    backgroundColor: "rgba(240, 40, 73, 0.1)",
    color: "#f02849",
  },

  avatarPreview: { width: normalize(70), height: normalize(70) },
});

export default BriefBookInfoPreview;
