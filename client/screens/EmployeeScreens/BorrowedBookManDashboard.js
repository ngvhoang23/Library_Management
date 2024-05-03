import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button, Image, FlatList, SafeAreaView, ImageBackground } from "react-native";
import { globalStyles } from "../../styles/global";
import axios from "axios";
import EmployeeItem from "../../components/EmployeeItem";
import FlatButton from "../../shared/FlatButton";
import { useIsFocused } from "@react-navigation/native";
import ReaderItem from "../../components/ReaderItem";
import SearchBar from "../../components/SearchBar";
import { SCREEN_WIDTH, _retrieveData, normalize } from "../../defined_function";
import { ScrollView } from "react-native-gesture-handler";
import BookItem from "../../components/BookItem";
import BookBorrowedHorizontal from "../../components/BookBorrowedHorizontal";

function BorrowedBookManDashBoard({ route, navigation }) {
  const [books, setBooks] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const isFocused = useIsFocused();

  useEffect(() => {
    setSearchValue("");

    if (isFocused) {
      _retrieveData("ACCESS_TOKEN")
        .then((access_token) => {
          const config = {
            headers: { Authorization: `Bearer ${access_token}` },
          };
          axios
            .get(`http://10.0.2.2:5000/borrowed-books/borrowing-books/`, config)
            .then((result) => {
              setBooks(result.data);
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

  const onSearch = () => {
    navigation.navigate("Borrowing Books Search Result", {
      search_value: searchValue,
      placeholder: "Tìm kiếm sách...",
    });
  };

  return (
    <ImageBackground source={require("../../assets/images/page_bg1.jpg")} style={styles.wrapper}>
      <SearchBar
        _styles={styles.searchBar}
        placeholder="Tìm kiếm sách..."
        value={searchValue}
        onChange={(value) => setSearchValue(value)}
        onSearch={onSearch}
      />

      <ScrollView style={styles.listWrapper}>
        <View style={styles.bookList}>
          {books.map((book, index) => {
            const total_day = Math.round(
              (new Date(book.return_date) - new Date(book.borrow_date)) / (1000 * 3600 * 24),
            );
            const remain_day = Math.round((new Date(book.return_date) - new Date()) / (1000 * 3600 * 24));
            return (
              <BookBorrowedHorizontal
                key={book.borrow_id}
                _styles={[styles.bookItem]}
                cover_photo={book.cover_photo}
                book_name={book.book_name}
                position={book.position}
                total_day={total_day}
                remain_day={remain_day}
                book_detail_id={book.book_detail_id}
                onPress={() =>
                  navigation.navigate("Borrowing Book Detail", {
                    borrow_id: book.borrow_id,
                  })
                }
              />
            );
          })}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,
  },

  listWrapper: {
    flex: 1,
  },

  bookList: {
    width: SCREEN_WIDTH,
    flex: 1,
    height: "100%",
    paddingVertical: normalize(14),
    paddingHorizontal: normalize(14),
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },

  bookItem: {
    width: "100%",
    paddingTop: normalize(10),
    marginBottom: normalize(10),
    borderBottomWidth: 0.5,
    borderColor: "#ced0d4",
    borderStyle: "solid",
  },
});

export default BorrowedBookManDashBoard;
