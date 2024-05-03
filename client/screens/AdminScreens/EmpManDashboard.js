import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button, Image, FlatList, SafeAreaView, ImageBackground } from "react-native";
import { globalStyles } from "../../styles/global";
import axios from "axios";
import EmployeeItem from "../../components/EmployeeItem";
import FlatButton from "../../shared/FlatButton";
import { useIsFocused } from "@react-navigation/native";
import SearchBar from "../../components/SearchBar";
import { SCREEN_WIDTH, _retrieveData, normalize } from "../../defined_function";
import { ScrollView } from "react-native-gesture-handler";

function EmpManDashboard({ navigation }) {
  const [employees, setEmployees] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const isFocused = useIsFocused();

  useEffect(() => {
    setSearchValue("");

    _retrieveData("ACCESS_TOKEN")
      .then((access_token) => {
        const config = {
          headers: { Authorization: `Bearer ${access_token}` },
        };

        if (isFocused) {
          axios
            .get(`http://10.0.2.2:5000/users/employees`, config)
            .then((result) => {
              setEmployees([...result.data]);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isFocused]);

  const onSearch = () => {
    navigation.navigate("Search Results", {
      search_value: searchValue,
      placeholder: "Tìm kiếm nhân viên...",
      type: "employees",
    });
  };

  return (
    <ImageBackground source={require("../../assets/images/page_bg2.jpg")} resizeMode="cover" style={styles.wrapper}>
      <SearchBar
        _styles={styles.searchBar}
        placeholder="Tìm kiếm nhân viên..."
        value={searchValue}
        onChange={(value) => setSearchValue(value)}
        onSearch={onSearch}
      />

      <View style={styles.titleLine}>
        <Text style={styles.title}>Nhân viên</Text>
        <Text style={styles.line}></Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.empList}>
          {employees.map((emp, index) => {
            return (
              <EmployeeItem
                key={index}
                _style={[styles.empItem]}
                data={emp}
                onPress={() =>
                  navigation.navigate("Employee Detail", {
                    emp_info: emp,
                  })
                }
              />
            );
          })}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,
  },

  searchBar: {},

  empList: {
    width: SCREEN_WIDTH - normalize(20),
    flex: 1,
    paddingVertical: normalize(6),
    paddingHorizontal: normalize(6),
    overflow: "scroll",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },

  empItem: {
    width: "100%",
    padding: normalize(10),
    margin: 10,
    borderRadius: normalize(10),
  },

  titleLine: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: normalize(10),
    marginTop: normalize(8),
    marginBottom: normalize(8),
  },
  title: {
    fontFamily: "nunito-bold",
    color: "#8c8c8d",
    fontSize: normalize(9),
    marginRight: normalize(6),
  },
  line: {
    width: "100%",
    height: normalize(1.3),
    borderBottomWidth: 0.5,
    borderColor: "#ced0d4",
  },
});

export default EmpManDashboard;
