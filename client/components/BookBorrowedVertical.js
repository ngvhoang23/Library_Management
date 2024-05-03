import { Image, StyleSheet, Text, View } from "react-native";
import MarqueeView from "react-native-marquee-view";
import { normalize } from "../defined_function";
import { TouchableOpacity } from "react-native-gesture-handler";

function BookBorrowedVertical({ _styles, cover_photo, book_name, return_date, onPress }) {
  const days = Math.round((new Date() - new Date(return_date)) / (1000 * 3600 * 24));

  const renderBorrowTime = () => {
    if (days > 0) {
      return <Text style={[styles.time, { color: "#f03958" }]}>{`${days} days overdue`}</Text>;
    } else if (days < 0) {
      return <Text style={[styles.time, { color: "#6ec531" }]}>{`${-days} days left`}</Text>;
    } else {
      return <Text style={[styles.time, { color: "#f03958" }]}>{`Due today`}</Text>;
    }
  };

  return (
    <TouchableOpacity style={[styles.wrapper, _styles]} onPress={onPress}>
      <View style={styles.coverPhotoContainer}>
        <Image source={{ uri: `http://10.0.2.2:5000${cover_photo}` }} style={styles.coverPhoto} />
      </View>
      <View style={styles.content}>
        <Text style={[styles.bookName]} numberOfLines={2}>
          {book_name}
        </Text>
        {renderBorrowTime()}
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
  },

  coverPhoto: {
    width: normalize(80),
    height: normalize(100),
    borderRadius: normalize(10),
    marginBottom: normalize(2),
  },

  content: {
    flexDirection: "column",
    alignItems: "flex-start",
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
  time: {
    fontFamily: "nunito-bold",
    fontSize: normalize(9),
    color: "#8c8c8d",
    paddingHorizontal: normalize(4),
  },
});

export default BookBorrowedVertical;
