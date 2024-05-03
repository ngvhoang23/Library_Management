import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { normalize } from "../defined_function";
import MarqueeView from "react-native-marquee-view";
import {
  FontAwesome,
  MaterialIcons,
  Feather,
  Fontisto,
  FontAwesome5,
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome6,
  EvilIcons,
  SimpleLineIcons,
  Entypo,
  Ionicons,
} from "@expo/vector-icons";
import FlatButton from "../shared/FlatButton";

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
    <ImageBackground source={require("../assets/images/page_bg2.jpg")} style={[styles.headerContainer, _styles]}>
      <View style={styles.coverPhotoContainer}>
        <Image source={{ uri: cover_photo }} style={styles.coverPhoto} />
      </View>
      <View style={styles.container}>
        <View style={[styles.bookInfo]}>
          <Text style={styles.bookName} numberOfLines={2}>
            {book_name}
          </Text>
          <Text style={styles.authorName}>{"Tran Thi Kim Phung"}</Text>
        </View>
        <View style={[styles.readerInfo]}>
          <Image source={{ uri: user_avatar }} style={styles.readerAvatar} />
          <View>
            <Text style={styles.readerName}>{reader_name}</Text>
            <Text style={styles.phoneNum}>{phone_num}</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  wrapper: {},

  headerWrapper: {},

  headerContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  coverPhotoContainer: {},

  coverPhoto: {
    width: normalize(100),
    height: normalize(150),
  },

  container: {
    flex: 1,
    height: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: normalize(10),
  },

  readerInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: normalize(12),
    width: "100%",
    padding: normalize(8),
    borderRadius: normalize(10),
  },

  readerAvatar: {
    width: normalize(40),
    height: normalize(40),
    borderRadius: normalize(1000),
    marginRight: normalize(10),
  },

  readerName: {
    fontFamily: "nunito-bold",
    fontSize: normalize(12),
    color: "#292929",
    marginTop: normalize(6),
  },

  phoneNum: {
    fontFamily: "nunito-medium",
    fontSize: normalize(10),
    color: "#8c8c8d",
    marginTop: normalize(6),
  },

  bookInfo: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: normalize(12),
    width: "100%",
    padding: normalize(8),
    borderRadius: normalize(10),
  },
  bookName: {
    fontFamily: "nunito-bold",
    fontSize: normalize(12),
    color: "#292929",
    marginTop: normalize(6),
    textAlign: "left",
    width: "100%",
  },
  authorName: {
    fontFamily: "nunito-medium",
    fontSize: normalize(10),
    color: "#676768",
    marginTop: normalize(6),
    width: "100%",
    textAlign: "left",
  },
});

export default BriefBorrowingInfoPreview;
