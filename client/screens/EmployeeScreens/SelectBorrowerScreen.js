import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button, Image, FlatList, SafeAreaView } from "react-native";
import { globalStyles } from "../../styles/global";
import axios from "axios";
import EmployeeItem from "../../components/EmployeeItem";
import FlatButton from "../../shared/FlatButton";
import { useIsFocused } from "@react-navigation/native";
import ReaderItem from "../../components/ReaderItem";
import SearchBar from "../../components/SearchBar";
import { SCREEN_WIDTH, _retrieveData, normalize } from "../../defined_function";
import { ScrollView } from "react-native-gesture-handler";

function SelectBorrowerScreen({ navigation }) {
  const [readers, setReaders] = useState([]);
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
            .get(`http://10.0.2.2:5000/borrowed-books/borrowers`, config)
            .then((result) => {
              setReaders([...result.data]);
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
    navigation.navigate("Borrowers Search Result", {
      search_value: searchValue,
      placeholder: "search borrower...",
    });
  };

  return (
    <View style={styles.wrapper}>
      <SearchBar
        _styles={styles.searchBar}
        placeholder="search borrower..."
        value={searchValue}
        onChange={(value) => setSearchValue(value)}
        onSearch={onSearch}
      />

      <ScrollView>
        <View style={styles.readerList}>
          {readers.map((reader, index) => {
            return (
              <ReaderItem
                key={index}
                _style={[styles.readerItem]}
                borrowed_books={reader.borrowed_books || 0}
                data={reader}
                onPress={() => {
                  if (reader.borrowed_books >= 4) {
                    alert("Cannot borrow because the reader has borrowed 4 books within 4 days");
                    return;
                  }
                  if (new Date(reader.expire_date) <= new Date()) {
                    alert("Reader card has expired");
                    return;
                  }
                  navigation.navigate("Select Book Group", {
                    reader_info: reader,
                  });
                }}
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
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  readerList: {
    width: SCREEN_WIDTH,
    flex: 1,
    paddingVertical: normalize(14),
    paddingHorizontal: normalize(6),
    overflow: "scroll",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },

  readerItem: {
    width: "44%",
    padding: normalize(10),
    margin: normalize(8),
    borderRadius: normalize(10),
  },
});

export default SelectBorrowerScreen;
