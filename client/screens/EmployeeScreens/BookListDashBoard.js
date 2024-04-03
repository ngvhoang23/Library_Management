import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button, Image, FlatList, SafeAreaView } from "react-native";
import { globalStyles } from "../../styles/global";
import axios from "axios";
import FlatButton from "../../shared/FlatButton";
import { useIsFocused } from "@react-navigation/native";
import ReaderItem from "../../components/ReaderItem";
import SearchBar from "../../components/SearchBar";
import { _retrieveData } from "../../defined_function";
import BookItem from "../../components/BookItem";

function BookListDashBoard({ route, navigation }) {
  const { book_info } = route.params;
  const { book_detail_id } = book_info;

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
            params: { book_detail_id },
          };
          axios
            .get(`http://10.0.2.2:5000/books/${book_detail_id}`, config)
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

  const onSearch = () => {
    navigation.navigate("Book Search Result", {
      search_value: searchValue,
      placeholder: "search books...",
    });
  };

  return (
    <View style={styles.wrapper}>
      <SearchBar
        _styles={styles.searchBar}
        placeholder="search books..."
        value={searchValue}
        onChange={(value) => setSearchValue(value)}
        onSearch={onSearch}
      />
      <View style={styles.booksContainer}>
        <FlatList
          contentContainerStyle={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          numColumns={1}
          style={styles.contentContainerStyle}
          data={books}
          keyExtractor={(item) => item.book_id}
          renderItem={({ item }) => (
            <BookItem
              _style={[styles.bookItem]}
              data={item}
              have_position
              status={1}
              onPress={() =>
                navigation.navigate("Edit Book", {
                  book_info: item,
                })
              }
            />
          )}
        />
      </View>
      <FlatButton
        text="Add Books"
        _styles={styles.addBookBtn}
        fontSize={15}
        onPress={() => navigation.navigate("Add Books")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  booksContainer: {
    width: "100%",
    marginTop: 10,
  },
  contentContainerStyle: {
    height: "84%",
    // width: "100%",
  },
  bookItem: {
    margin: 10,
  },
  addBookBtn: {
    width: "80%",
    marginBottom: 14,
    paddingVertical: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1e74fd",
  },
});

export default BookListDashBoard;
