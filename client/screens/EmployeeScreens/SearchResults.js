import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button, Image, FlatList, SafeAreaView } from "react-native";
import { globalStyles } from "../../styles/global";
import axios from "axios";
import EmployeeItem from "../../components/EmployeeItem";
import FlatButton from "../../shared/FlatButton";
import { useIsFocused } from "@react-navigation/native";
import SearchBar from "../../components/SearchBar";
import { _retrieveData } from "../../defined_function";

function SearchResults({ route, navigation }) {
  const { search_value, placeholder, type } = route.params;

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
            .get(`http://10.0.2.2:5000/users/${type}/searching/${search_value}`, config)
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
            numColumns={2}
            keyExtractor={(item) => item.user_id}
            data={results}
            renderItem={({ item }) => (
              <EmployeeItem
                _style={styles.empItem}
                data={item}
                onPress={() =>
                  navigation.navigate("Employee Detail", {
                    emp_info: item,
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
  empItem: {
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

export default SearchResults;
