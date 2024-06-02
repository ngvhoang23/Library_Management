import { StyleSheet, TextInput, View, TouchableOpacity, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { globalStyles } from "../styles/global";
import { normalize } from "../defined_function";

function SearchBar({ placeholder, onChange, value, textStyles, onSearch, _styles }) {
  return (
    <TouchableOpacity activeOpacity={1.0} style={[styles.wrapper, _styles]}>
      <TextInput
        style={[globalStyles.input, styles.input, textStyles]}
        numberOfLines={1}
        placeholder={placeholder}
        onChangeText={onChange}
        value={value}
        placeholderTextColor={"#ced0d4"}
      />
      <TouchableOpacity style={styles.searchBtn} activeOpacity={0} onPress={onSearch}>
        <Image
          source={require("./../assets/images/search_icon.png")}
          style={{ width: normalize(20), height: normalize(20), backgroundColor: "transparent" }}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: normalize(36),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    // borderBottomWidth: 0.5,
    borderColor: "#ced0d4",
    borderRadius: 4,
  },
  input: {
    flex: 1,
    marginTop: normalize(8),
    fontSize: normalize(12),
    fontFamily: "nunito-medium",
    borderColor: "transparent",
    letterSpacing: 1,
    paddingHorizontal: normalize(20),
  },
  searchBtn: {
    width: normalize(40),
    height: normalize(40),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SearchBar;
