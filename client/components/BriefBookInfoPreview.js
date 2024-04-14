import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { normalize } from "../defined_function";
import MarqueeView from "react-native-marquee-view";

function BriefBookInfoPreview({ _styles, book_name, author_name, position, cover_photo, overdue, onPress, small }) {
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
      <View style={styles.container}>
        <Image
          source={{ uri: cover_photo }}
          style={[
            styles.avatarPreview,
            {
              width: small ? styles.avatarPreview.width / 1.2 : styles.avatarPreview.width,
              height: small ? styles.avatarPreview.height / 1.2 : styles.avatarPreview.height,
            },
          ]}
        />
        <View
          style={[
            styles.bookInfo,
            styles.elevation,
            { padding: small ? styles.bookInfo.padding / 1.2 : styles.bookInfo.padding },
          ]}
        >
          <MarqueeView
            style={[
              styles.marqueeView,
              { height: small ? styles.marqueeView.height / 1.2 : styles.marqueeView.height },
            ]}
            autoPlay={book_name?.length > 20}
          >
            <Text
              style={[styles.bookName, { fontSize: small ? styles.bookName.fontSize / 1.2 : styles.bookName.fontSize }]}
            >
              {book_name}
            </Text>
          </MarqueeView>
          {author_name && (
            <Text
              style={[
                styles.authorName,
                { fontSize: small ? styles.authorName.fontSize / 1.2 : styles.authorName.fontSize },
              ]}
            >
              {author_name}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {},

  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    height: normalize(120),
    position: "relative",
  },

  elevation: {
    elevation: 20,
    shadowColor: "#52006A",
  },

  avatarPreview: {
    width: normalize(80),
    height: normalize(100),
    position: "absolute",
    right: normalize(10),
    bottom: normalize(20),
    borderRadius: normalize(10),
    zIndex: 10,
  },

  bookInfo: {
    width: "100%",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#dbe3ef",
    padding: normalize(14),
    borderRadius: normalize(10),
    backgroundColor: "#fff",
  },

  bookName: {
    width: "100%",
    fontFamily: "nunito-medium",
    fontSize: normalize(14),
    letterSpacing: normalize(2),
    color: "#676768",
    marginBottom: normalize(6),
  },

  marqueeView: {
    height: normalize(30),
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "60%",
  },

  authorName: {
    width: "100%",
    fontFamily: "nunito-medium",
    fontSize: normalize(10),
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
});

export default BriefBookInfoPreview;
