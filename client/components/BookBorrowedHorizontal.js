import { Image, StyleSheet, Text, View } from "react-native";
import { normalize } from "../defined_function";
import { TouchableOpacity } from "react-native-gesture-handler";

function BookBorrowedHorizontal({ _styles, cover_photo, position, book_name, total_day, remain_day, onPress }) {
  const renderBorrowTime = () => {
    if (remain_day < 0) {
      return <Text style={[styles.remainDays, { color: "#f03958" }]}>{`quá hạn ${-remain_day} ngày`}</Text>;
    } else if (remain_day > 0) {
      return <Text style={[styles.remainDays, { color: "#6ec531" }]}>{`còn lại ${remain_day} ngày`}</Text>;
    } else {
      return <Text style={[styles.remainDays, { color: "#f03958" }]}>{`Due today`}</Text>;
    }
  };

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
    <TouchableOpacity style={[styles.wrapper, _styles]} onPress={onPress}>
      <Image source={{ uri: `http://10.0.2.2:5000${cover_photo}` }} style={styles.coverPhoto} />
      <View style={styles.content}>
        <Text style={styles.position}>Vị trí: {renderPosition()}</Text>
        <Text style={styles.bookName} numberOfLines={1}>
          {book_name}
        </Text>
        <View style={styles.progress}>
          <View
            style={[
              styles.completedProgress,
              {
                width: `${remain_day > 0 ? ((total_day - remain_day) * 100) / total_day : 100}%`,
                backgroundColor: remain_day > 0 ? "#6ec531" : "#f02849",
              },
            ]}
          ></View>
          {renderBorrowTime()}
        </View>
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
  },
  coverPhoto: {
    height: normalize(70),
    width: normalize(60),
    borderRadius: normalize(10),
  },
  content: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginLeft: normalize(10),
  },

  progress: {
    width: "100%",
    backgroundColor: "#ced0d4",
    borderRadius: normalize(10),
    position: "relative",
    marginTop: normalize(16),
  },

  completedProgress: {
    borderRadius: normalize(10),
    paddingLeft: normalize(8),
    height: normalize(4),
  },

  remainDays: {
    fontFamily: "nunito-bold",
    color: "#8c8c8d",
    fontSize: normalize(9),
    position: "absolute",
    bottom: normalize(6),
    left: normalize(4),
    flex: 1,
    width: "100%",
  },

  position: {
    fontFamily: "nunito-bold",
    color: "#8c8c8d",
    fontSize: normalize(10),
    marginBottom: normalize(8),
    width: "90%",
  },

  bookName: {
    fontFamily: "nunito-bold",
    color: "#292929",
    fontSize: normalize(13),
    marginBottom: normalize(2),
    width: "90%",
  },
});

export default BookBorrowedHorizontal;
