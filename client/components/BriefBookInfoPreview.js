import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

function BriefBookInfoPreview({ book_name, author_name, cover_photo, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.wrapper}>
        <Image source={{ uri: cover_photo }} style={styles.avatarPreview} />
        <View style={styles.bookInfo}>
          <Text style={styles.bookName}>{book_name}</Text>
          <Text style={styles.authorName}>{author_name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 30,
    with: "100%",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#ced0d4",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 22,
  },

  bookInfo: {
    width: "50%",
    marginLeft: 20,
  },

  bookName: {
    width: "100%",
    fontFamily: "nunito-medium",
    fontSize: 16,
    letterSpacing: 4,
    color: "#676768",
    marginBottom: 20,
  },

  authorName: {
    width: "100%",
    fontFamily: "nunito-medium",
    fontSize: 12,
    letterSpacing: 4,
    color: "#aaabaf",
  },

  avatarPreview: { width: 200, height: 200 },
});

export default BriefBookInfoPreview;
