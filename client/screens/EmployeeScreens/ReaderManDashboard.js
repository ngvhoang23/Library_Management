import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button, Image, FlatList, SafeAreaView } from "react-native";
import { globalStyles } from "../../styles/global";
import axios from "axios";
import EmployeeItem from "../../components/EmployeeItem";
import FlatButton from "../../shared/FlatButton";
import { useIsFocused } from "@react-navigation/native";
import ReaderItem from "../../components/ReaderItem";
import SearchBar from "../../components/SearchBar";
import { _retrieveData } from "../../defined_function";

function ReaderManDashboard({ navigation }) {
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
            .get(`http://10.0.2.2:5000/users/readers`, config)
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
    navigation.navigate("Search Results", {
      search_value: searchValue,
      placeholder: "search readers...",
      type: "readers",
    });
  };

  return (
    <View style={styles.wrapper}>
      <SearchBar
        _styles={styles.searchBar}
        placeholder="search employees..."
        value={searchValue}
        onChange={(value) => setSearchValue(value)}
        onSearch={onSearch}
      />
      <View style={styles.readersContainer}>
        <FlatList
          style={styles.contentContainerStyle}
          numColumns={2}
          keyExtractor={(item) => item.user_id}
          data={readers}
          renderItem={({ item }) => (
            <ReaderItem
              _style={styles.readerItem}
              data={item}
              onPress={() =>
                navigation.navigate("Reader Detail", {
                  reader_info: item,
                })
              }
            />
          )}
        />
      </View>
      <FlatButton
        text="Add reader"
        _styles={styles.addReaderBtn}
        fontSize={14}
        onPress={() => navigation.navigate("Add Readers")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  readersContainer: {
    marginTop: 10,
  },
  contentContainerStyle: {
    height: 580,
    flexGrow: 0,
    marginBottom: 20,
  },
  readerItem: {
    margin: 10,
  },
  addReaderBtn: {
    width: 300,
    height: 40,
    marginBottom: 14,
    paddingVertical: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1e74fd",
  },
});

export default ReaderManDashboard;
