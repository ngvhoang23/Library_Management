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

function BookGroupManDashboard({ navigation }) {
  const [books, setBooks] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const isFocused = useIsFocused();

  const [layout, setLayout] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    setSearchValue("");

    if (isFocused) {
      _retrieveData("ACCESS_TOKEN")
        .then((access_token) => {
          const config = {
            headers: { Authorization: `Bearer ${access_token}` },
          };
          axios
            .get(`http://10.0.2.2:5000/books/book-groups`, config)
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
    navigation.navigate("Book Group Search Result", {
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
      <View
        style={styles.booksContainer}
        onLayout={(event) => {
          setLayout(event.nativeEvent.layout);
        }}
      >
        <FlatList
          contentContainerStyle={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          numColumns={1}
          style={styles.contentContainerStyle}
          keyExtractor={(item) => item.book_detail_id}
          data={books}
          renderItem={({ item }) => (
            <BookItem
              _style={[styles.bookItem]}
              data={item}
              onPress={() =>
                navigation.navigate("Book Group Detail", {
                  book_info: item,
                })
              }
            />
          )}
        />
      </View>
      <FlatButton
        text="Add Book Group"
        _styles={styles.addBookBtn}
        fontSize={15}
        onPress={() => navigation.navigate("Add Book Groups")}
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
    height: 580,
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

export default BookGroupManDashboard;
