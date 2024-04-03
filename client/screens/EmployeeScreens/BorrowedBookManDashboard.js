import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button, Image, FlatList, SafeAreaView, Dimensions, ScrollView } from "react-native";
import axios from "axios";
import FlatButton from "../../shared/FlatButton";
import { useIsFocused } from "@react-navigation/native";
import SearchBar from "../../components/SearchBar";
import { SCREEN_HEIGHT, SCREEN_WIDTH, _retrieveData, normalize } from "../../defined_function";
import BorrowedBookItem from "../../components/BorrowedBookItem";
import { AntDesign } from "@expo/vector-icons";

function BorrowedBookManDashboard({ navigation }) {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
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
            .get(`http://10.0.2.2:5000/books/borrowed-books`, config)
            .then((result) => {
              console.log(result.data);
              setBorrowedBooks([
                ...result.data,
                ...result.data,
                ...result.data,
                ...result.data,
                ...result.data,
                ...result.data,
              ]);
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
    // navigation.navigate("Book Group Search Result", {
    //   search_value: searchValue,
    //   placeholder: "search books...",
    // });
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

      {/* <FlatList
        contentContainerStyle={{
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
        }}
        style={styles.borrowedList}
        numColumns={1}
        keyExtractor={(item, id) => id}
        data={borrowedBooks}
        renderItem={({ item }) => (
          <BorrowedBookItem
            _style={[styles.bookItem]}
            data={item}
            onPress={() =>
              navigation.navigate("Book Group Detail", {
                book_info: item,
              })
            }
          />
        )}
      /> */}

      <ScrollView>
        <View style={styles.borrowedList}>
          {borrowedBooks.map((borrowedBook, index) => {
            return (
              <BorrowedBookItem
                key={index}
                _style={[styles.bookItem]}
                data={borrowedBook}
                onPress={() =>
                  navigation.navigate("Book Group Detail", {
                    book_info: borrowedBook,
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
    width: "100%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  borrowedList: {
    width: SCREEN_WIDTH,
    flex: 1,
    paddingVertical: normalize(14),
    paddingHorizontal: normalize(6),
    overflow: "scroll",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  bookItem: {
    width: "100%",
    padding: normalize(10),
    borderRadius: normalize(10),
    marginBottom: normalize(14),
  },
});

export default BorrowedBookManDashboard;
