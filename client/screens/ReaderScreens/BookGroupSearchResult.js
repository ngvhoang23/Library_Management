import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button, Image, FlatList, SafeAreaView } from "react-native";
import { globalStyles } from "../../styles/global";
import axios from "axios";
import EmployeeItem from "../../components/EmployeeItem";
import FlatButton from "../../shared/FlatButton";
import { useIsFocused } from "@react-navigation/native";
import SearchBar from "../../components/SearchBar";
import { SCREEN_WIDTH, _retrieveData, normalize } from "../../defined_function";
import BookItem from "../../components/BookItem";
import { ScrollView } from "react-native-gesture-handler";
import BookGroupItem from "../../components/BookGroupItem";
import BookGroupItem2 from "../../components/BookGroupItem2";

function BookGroupSearchResult({ route, navigation }) {
  const { search_value, placeholder, navigate_to } = route.params;

  const [results, setResults] = useState([]);
  const [searchValue, setSearchValue] = useState(search_value);
  useEffect(() => {
    handleSearch(search_value);
  }, [search_value]);

  const handleSearch = (search_value) => {
    _retrieveData("ACCESS_TOKEN")
      .then((access_token) => {
        const config = {
          params: {
            search_value,
          },
          headers: { Authorization: `Bearer ${access_token}` },
        };

        if (search_value) {
          axios
            .get(`http://10.0.2.2:5000/books/book-groups/searching/${search_value}`, config)
            .then((result) => {
              setResults(result.data);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.wrapper}>
      <SearchBar
        _styles={styles.searchBar}
        placeholder={placeholder}
        value={searchValue}
        onChange={(value) => setSearchValue(value)}
        onSearch={() => handleSearch(searchValue)}
      />

      <ScrollView
        style={{
          flex: 1,
          width: "100%",
        }}
      >
        {results?.length > 0 ? (
          <View style={styles.bookList}>
            {results.map((book, index) => {
              return (
                <BookGroupItem2
                  key={book.book_detail_id}
                  _styles={[styles.bookItem]}
                  cover_photo={book.cover_photo}
                  author_name={book.author_name}
                  book_name={book.book_name}
                  description={book.description}
                  book_detail_id={book.book_detail_id}
                  onPress={() =>
                    navigation.navigate("Book Detail", {
                      book_detail_id: book.book_detail_id,
                    })
                  }
                />
              );
            })}
          </View>
        ) : (
          <Text style={styles.messageText}>There are no results</Text>
        )}
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

  searchBar: {
    width: "100%",
  },

  bookList: {
    width: "100%",
    flex: 1,
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(10),
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },

  bookItem: {
    width: "100%",
    padding: normalize(10),
    borderRadius: normalize(10),
    marginBottom: normalize(10),
  },

  messageText: {
    marginTop: normalize(30),
    fontFamily: "nunito-medium",
    fontSize: normalize(14),
    letterSpacing: 4,
    color: "#aaabaf",
    textAlign: "center",
  },
});

export default BookGroupSearchResult;
