import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { normalize } from "../defined_function";
import MarqueeView from "react-native-marquee-view";

function BriefBorrowingInfoPreview({ _styles, book_name, position, cover_photo, reader_name, phone_num, user_avatar }) {
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
    <View style={[styles.wrapper, _styles]}>
      <View style={styles.userContainer}>
        <View style={styles.readerAvatarContainer}>
          <Image source={{ uri: user_avatar }} style={[styles.readerAvatar]} />
        </View>
        <View style={[styles.userInfo, styles.elevation]}>
          <MarqueeView style={[styles.marqueeView]} autoPlay={reader_name?.length > 20}>
            <Text style={[styles.readerName]}>{reader_name}</Text>
          </MarqueeView>
          {phone_num && <Text style={[styles.phoneNum]}>{phone_num}</Text>}
        </View>
      </View>
      <View style={styles.bookContainer}>
        <Image source={{ uri: cover_photo }} style={[styles.coverPhoto]} />
        <View style={[styles.bookInfo, styles.elevation]}>
          <MarqueeView style={[styles.marqueeView]} autoPlay={book_name?.length > 20}>
            <Text style={[styles.bookName]}>{book_name}</Text>
          </MarqueeView>
          {position && <Text style={[styles.authorName]}>Position: {renderPosition()}</Text>}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {},

  bookContainer: {
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

  coverPhoto: {
    width: normalize(70),
    height: normalize(90),
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
    padding: normalize(10),
    borderRadius: normalize(10),
    backgroundColor: "#fff",
  },

  bookName: {
    width: "100%",
    fontFamily: "nunito-medium",
    fontSize: normalize(12),
    letterSpacing: normalize(2),
    color: "#676768",
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

  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: normalize(-30),
  },

  readerAvatarContainer: {
    padding: normalize(4),
    borderBottomWidth: 4,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: "#6ec531",
    borderRadius: normalize(100),
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    alignSelf: "flex-start",
    elevation: 10,
    shadowColor: "#52006A",
  },
  readerAvatar: {
    width: normalize(50),
    height: normalize(50),
    borderRadius: normalize(1000),
  },
  userInfo: {
    flex: 1,
    marginLeft: normalize(10),
  },
  readerName: {
    width: "100%",
    fontFamily: "nunito-bold",
    fontSize: normalize(12),
    letterSpacing: normalize(2),
    color: "#676768",
    marginBottom: normalize(0),
  },
  phoneNum: {
    width: "100%",
    fontFamily: "nunito-bold",
    fontSize: normalize(10),
    letterSpacing: normalize(2),
    color: "#aaabaf",
  },
});

export default BriefBorrowingInfoPreview;
