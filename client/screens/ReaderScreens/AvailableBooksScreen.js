import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView, Image } from "react-native";
import axios from "axios";
import { StackActions, useFocusEffect, useIsFocused, NavigationActions } from "@react-navigation/native";
import { _retrieveData, normalize } from "../../defined_function";
import BookGroupItem2 from "../../components/BookGroupItem2";
import SearchBox from "../../components/SearchBox";
import BookPositionItem from "../../components/BookPositionItem";

function AvailableBooksScreen({ route, navigation }) {
  const { book_detail_id, book_name, cover_photo } = route.params;

  const [books, setBooks] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      _retrieveData("ACCESS_TOKEN")
        .then((access_token) => {
          const config = {
            headers: { Authorization: `Bearer ${access_token}` },
            params: { book_detail_id },
          };
          axios
            .get(`http://10.0.2.2:5000/books/available-books/${book_detail_id}`, config)
            .then((result) => {
              setBooks([...result.data]);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isFocused]);

  return (
    <View style={styles.wrapper}>
      <ScrollView
        style={{
          flex: 1,
          width: "100%",
        }}
      >
        <View style={styles.bookList}>
          {books.map((book, index) => {
            return (
              <BookPositionItem
                key={book.book_id}
                _styles={[styles.bookItem]}
                cover_photo={book.cover_photo}
                position={book.position}
                book_name={book.book_name}
                onPress={() =>
                  navigation.navigate("Book Detail", {
                    book_detail_id: book.book_detail_id,
                  })
                }
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },

  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: normalize(10),
    paddingHorizontal: normalize(20),
  },

  headerTitle: {
    fontFamily: "nunito-bold",
    fontSize: normalize(16),
    color: "#3c3c3c",
    marginHorizontal: normalize(10),
  },

  searchBox: {
    width: "86%",
    marginBottom: normalize(10),
  },

  active: {
    color: "#fff",
    backgroundColor: "#5b4cfd",
  },
  bookList: {
    width: "100%",
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(10),
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  bookItem: {
    width: "100%",
    marginBottom: normalize(10),
  },
});

export default AvailableBooksScreen;
