import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Pressable,
} from "react-native";
import { globalStyles } from "../../styles/global";
import axios from "axios";
import FlatButton from "../../shared/FlatButton";
import { StackActions, useFocusEffect, useIsFocused, NavigationActions } from "@react-navigation/native";
import ReaderItem from "../../components/ReaderItem";
import SearchBar from "../../components/SearchBar";
import { SCREEN_WIDTH, _retrieveData, normalize } from "../../defined_function";
import BookItem from "../../components/BookItem";
import { useUserInfoContext } from "../../context/userInfoContext";
import BookGroupItem2 from "../../components/BookGroupItem2";
import SearchBox from "../../components/SearchBox";

function BooksByCategorySearchResult({ route, navigation }) {
  const { search_value, category_id, category_name } = route.params;

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
            category_id,
          },
          headers: { Authorization: `Bearer ${access_token}` },
        };

        if (search_value) {
          axios
            .get(`http://10.0.2.2:5000/books/book-groups/searching-for-category/${search_value}`, config)
            .then((result) => {
              setResults([...result.data]);
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
      <View style={styles.header}>
        <View style={styles.rightLine}></View>
        <Text style={styles.headerTitle}>{category_name}</Text>
        <View style={styles.leftLine}></View>
      </View>

      <SearchBox
        _styles={styles.searchBox}
        value={searchValue}
        setValue={setSearchValue}
        onSearch={() => handleSearch(searchValue)}
      />

      <ScrollView
        style={{
          flex: 1,
          width: "100%",
        }}
      >
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

  rightLine: {
    flex: 1,
    backgroundColor: "#ced0d4",
    height: 2,
  },

  leftLine: {
    flex: 1,
    backgroundColor: "#ced0d4",
    height: 2,
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
});

export default BooksByCategorySearchResult;
