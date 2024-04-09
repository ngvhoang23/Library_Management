import { useEffect } from "react";
import { StyleSheet, View, Text, Button, Image, TouchableOpacity } from "react-native";
import { normalize } from "../defined_function";

function BookItem({ _style, data, onPress, have_position, status, remaining, overdue, in_progess }) {
  const { position, book_name, cover_photo, author_name } = data;

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
      <View style={[styles.container]}>
        <Image style={styles.coverPhoto} source={{ uri: `http://10.0.2.2:5000${cover_photo}` }} />
        <View style={styles.bookInfo}>
          <Text style={styles.bookName} numberOfLines={2}>
            {book_name}
          </Text>
          {status && (
            <Text style={[styles.status, { color: status ? "#6ec531" : "#f02849" }]}>
              {status ? "available" : "unavailable"}
            </Text>
          )}
          {!have_position ? (
            <Text style={styles.authorName} numberOfLines={1}>
              {author_name}
            </Text>
          ) : (
            <Text style={styles.position} numberOfLines={1}>
              Position: {renderPosition()}
            </Text>
          )}

          {remaining != null && remaining != undefined && (
            <Text
              style={[styles.remaining, { color: remaining > 0 ? "#6ec531" : "#f02849" }]}
            >{`Remaining: ${remaining}`}</Text>
          )}

          {overdue && <Text style={[styles.overdue, { color: "#f02849" }]}>{`Overdue`}</Text>}
          {in_progess && <Text style={[styles.inProgess, { color: "#6ec531" }]}>{`in progess`}</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    width: "100%",
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
    fontSize: normalize(12),
  },
  authorName: {
    fontFamily: "nunito-medium",
    color: "#676768",
    marginTop: normalize(6),
    fontSize: normalize(9),
  },

  position: {
    fontFamily: "nunito-medium",
    color: "#676768",
    marginTop: normalize(6),
    fontSize: normalize(10),
  },

  remaining: {
    fontFamily: "nunito-medium",
    marginTop: normalize(6),
    fontSize: normalize(10),
  },

  overdue: {
    fontFamily: "nunito-medium",
    fontSize: normalize(10),
    position: "absolute",
    bottom: normalize(-10),
    right: normalize(10),
    borderWidth: 1,
    borderColor: "#f02849",
    borderStyle: "solid",
    borderRadius: normalize(6),
    paddingHorizontal: normalize(6),
    paddingVertical: normalize(4),
    backgroundColor: "rgba(240, 40, 73, 0.1)",
  },

  inProgess: {
    fontFamily: "nunito-medium",
    fontSize: normalize(10),
    position: "absolute",
    bottom: normalize(-20),
    right: normalize(10),
    borderWidth: 1,
    borderColor: "#6ec531",
    borderStyle: "solid",
    borderRadius: normalize(6),
    paddingHorizontal: normalize(8),
    paddingVertical: normalize(6),
    backgroundColor: "rgba(110, 197, 49, 0.1)",
  },

  status: {
    fontFamily: "nunito-medium",
    color: "#676768",
    fontSize: normalize(9),
    position: "absolute",
    bottom: 0,
    right: 0,
  },
});

export default BookItem;
