import { useEffect } from "react";
import { StyleSheet, View, Text, Button, Image, TouchableOpacity } from "react-native";
import { normalize } from "../defined_function";

function OverdueBookItem({ _style, book_name, cover_photo, position, total_fine, onPress }) {
  useEffect(() => {}, []);

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
    <TouchableOpacity style={[styles.wrapper, _style]} activeOpacity={0.6} onPress={onPress}>
      <Image style={styles.coverPhoto} source={{ uri: `http://10.0.2.2:5000${cover_photo}` }} />
      <View style={styles.bookInfo}>
        <Text style={styles.bookName} numberOfLines={2}>
          {book_name}
        </Text>

        <Text style={styles.position} numberOfLines={1}>
          Position: {renderPosition()}
        </Text>

        <Text style={[styles.fine, { color: "#f02849" }]}>{`Fine: ${total_fine}`}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: normalize(6),
    borderBottomWidth: 0,
    borderColor: "#ced0d4",
  },

  bookInfo: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flex: 1,
    position: "relative",
    marginLeft: normalize(10),
  },
  coverPhoto: {
    width: normalize(48),
    height: normalize(48),
    borderRadius: 8,
  },
  bookName: {
    width: "90%",
    fontFamily: "nunito-medium",
    color: "#676768",
    fontSize: normalize(11),
  },

  fine: {
    fontFamily: "nunito-medium",
    marginTop: normalize(6),
    fontSize: normalize(10),
  },

  position: {
    fontFamily: "nunito-medium",
    color: "#676768",
    marginTop: normalize(6),
    fontSize: normalize(10),
  },
});

export default OverdueBookItem;
