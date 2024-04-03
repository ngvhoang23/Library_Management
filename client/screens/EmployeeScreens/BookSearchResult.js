import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button, Image, FlatList, SafeAreaView } from "react-native";
import { globalStyles } from "../../styles/global";
import axios from "axios";
import EmployeeItem from "../../components/EmployeeItem";
import FlatButton from "../../shared/FlatButton";
import { useIsFocused } from "@react-navigation/native";
import SearchBar from "../../components/SearchBar";
import { _retrieveData } from "../../defined_function";
import BookItem from "../../components/BookItem";

function BookSearchResult({ route, navigation }) {
  const { search_value, placeholder } = route.params;

  const [results, setResults] = useState([]);
  const [searchValue, setSearchValue] = useState(search_value);
  useEffect(() => {
    handleSearch(search_value);
  }, []);

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
            .get(`http://10.0.2.2:5000/books/searching/${search_value}`, config)
            .then((result) => {
              console.log(result.data);
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
      <SearchBar
        _styles={styles.searchBar}
        placeholder={placeholder}
        value={searchValue}
        onChange={(value) => setSearchValue(value)}
        onSearch={() => handleSearch(searchValue)}
      />
      <View style={styles.empsContainer}>
        {results?.length > 0 ? (
          <FlatList
            style={styles.contentContainerStyle}
            contentContainerStyle={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            numColumns={1}
            keyExtractor={(item) => item.book_id}
            data={results}
            renderItem={({ item }) => (
              <BookItem
                _style={[styles.bookItem]}
                data={item}
                have_position
                status={item.status}
                onPress={() =>
                  navigation.navigate("Edit Book", {
                    book_info: item,
                  })
                }
              />
            )}
          />
        ) : (
          <Text style={styles.messageText}>There are no results</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  searchBar: {
    width: "100%",
  },
  empsContainer: {
    marginTop: 10,
  },
  contentContainerStyle: {
    height: 500,
    flexGrow: 0,
    marginBottom: 20,
  },
  bookItem: {
    margin: 10,
  },

  messageText: {
    marginTop: 30,
    fontFamily: "nunito-medium",
    fontSize: 22,
    letterSpacing: 4,
    color: "#aaabaf",
  },
});

export default BookSearchResult;
