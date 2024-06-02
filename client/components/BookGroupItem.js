import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { normalize } from "../defined_function";
import MarqueeView from "react-native-marquee-view";

function BookGroupItem({ _style, cover_photo, borrowed_books, total_books, book_name, author, onPress }) {
  const percent = borrowed_books / total_books;

  return (
    <TouchableOpacity activeOpacity={0.4} style={[styles.wrapper, _style]} onPress={onPress}>
      <View style={styles.container}>
        <Image style={styles.coverPhoto} source={{ uri: `http://10.0.2.2:5000${cover_photo}` }} />
        <View style={styles.progress}>
          <View
            style={[
              styles.completedProgress,
              {
                width: `${(borrowed_books * 100) / total_books}%`,
                backgroundColor: percent == 1 ? "#f03958" : percent < 0.6 ? "#6ec531" : "#FFCC00",
              },
            ]}
          ></View>
          <Text style={styles.borrowedBooks}>{`${borrowed_books} / ${total_books}`}</Text>
        </View>
        <View style={styles.bookInfo}>
          <MarqueeView style={styles.marqueeView} autoPlay={book_name.length > 20}>
            <Text style={styles.bookName}>{book_name}</Text>
          </MarqueeView>
          <View style={styles.author}>
            <Image
              source={require("./../assets/images/author_icon2.png")}
              style={{
                width: normalize(14),
                height: normalize(14),
                backgroundColor: "transparent",
              }}
            />
            <Text style={styles.authorText}>{author}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ced0d4",
    padding: normalize(10),
    position: "relative",
    minHeight: normalize(120),
    borderRadius: normalize(10),
    width: "100%",
  },

  wrapper: {
    height: normalize(160),
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  coverPhoto: {
    width: normalize(100),
    height: normalize(100),
    position: "absolute",
    top: normalize(-44),
    borderRadius: normalize(10),
    borderWidth: 1,
    borderColor: "#ced0d4",
  },

  progress: {
    width: "100%",
    backgroundColor: "#ced0d4",
    borderRadius: normalize(10),
    marginBottom: normalize(6),
    position: "relative",
  },

  borrowedBooks: {
    fontFamily: "nunito-bold",
    color: "#8c8c8d",
    fontSize: normalize(8),
    position: "absolute",
    bottom: normalize(4),
    left: normalize(4),
  },

  completedProgress: {
    backgroundColor: "#6ec531",
    borderRadius: normalize(10),
    paddingLeft: normalize(8),
    height: normalize(4),
  },

  bookInfo: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  marqueeView: {
    width: "100%",
    height: normalize(20),
    justifyContent: "center",
    alignItems: "center",
  },
  bookName: {
    width: "100%",
    fontFamily: "nunito-bold",
    fontSize: normalize(12),
    color: "#3c3c3c",
  },
  author: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  authorText: {
    color: "#8c8c8d",
    fontSize: normalize(9),
    fontFamily: "nunito-bold",
    marginLeft: normalize(6),
  },
});

export default BookGroupItem;
