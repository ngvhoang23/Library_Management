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

function BookGroupsScreen({ navigation }) {
  const [books, setBooks] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const isFocused = useIsFocused();

  const { user, setUser } = useUserInfoContext();

  const [currentCagory, setCurrentCategory] = useState();
  const [categories, setCategories] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    setSearchValue("");

    if (isFocused) {
      _retrieveData("ACCESS_TOKEN")
        .then((access_token) => {
          const config = {
            headers: { Authorization: `Bearer ${access_token}` },
            params: { reader_type: user?.reader_type },
          };
          axios
            .get(`http://10.0.2.2:5000/books/book-groups-by-reader`, config)
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

  useEffect(() => {
    if (isFocused) {
      _retrieveData("ACCESS_TOKEN")
        .then((access_token) => {
          const config = {
            headers: { Authorization: `Bearer ${access_token}` },
          };
          axios
            .get(`http://10.0.2.2:5000/books/categories`, config)
            .then((result) => {
              setCategories([{ category_id: -1, category_name: "All" }, ...result.data]);
              setCurrentCategory({ category_id: -1, category_name: "All" });
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

  useEffect(() => {
    setFilteredBooks(
      books.filter((book) => {
        if (currentCagory?.category_id == -1) {
          return true;
        }
        return book.category_id == currentCagory?.category_id;
      }),
    );
  }, [currentCagory, books]);

  const onSearch = () => {
    navigation.navigate("Book Search Result", {
      search_value: searchValue,
      placeholder: "Tìm kiếm sách...",
    });
  };

  return (
    <View style={styles.wrapper}>
      <SearchBar
        _styles={styles.searchBar}
        placeholder="Tìm kiếm sách..."
        value={searchValue}
        onChange={(value) => setSearchValue(value)}
        onSearch={onSearch}
      />

      <View
        style={{
          minHeight: normalize(30),
          width: "86%",
          marginTop: normalize(0),
        }}
      >
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{
            marginTop: normalize(10),
            marginBottom: normalize(10),
          }}
        >
          <View style={styles.categoryContainer}>
            {categories.map((category) => {
              return (
                <Pressable
                  key={category.category_id}
                  style={[styles.categoryItem, currentCagory?.category_id == category.category_id && styles.active]}
                  onPress={() => setCurrentCategory(category)}
                >
                  <Text
                    style={[styles.categoryTitle, currentCagory?.category_id == category.category_id && styles.active]}
                  >
                    {category.category_name}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>
      </View>

      <ScrollView
        style={{
          flex: 1,
          width: "100%",
        }}
      >
        <View style={styles.bookList}>
          {filteredBooks.map((book, index) => {
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
  categoryContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  categoryItem: {
    marginRight: normalize(16),
    paddingVertical: normalize(6),
    paddingHorizontal: normalize(16),
    borderRadius: normalize(100),
  },
  categoryTitle: {
    color: "#292929",
    fontFamily: "nunito-bold",
    fontSize: normalize(10),
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

export default BookGroupsScreen;
