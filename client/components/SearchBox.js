import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { normalize } from "../defined_function";
import { TouchableOpacity } from "react-native-gesture-handler";

function SearchBox({ _styles, value, setValue, onSearch }) {
  return (
    <View style={[styles.wrapper, _styles]}>
      <TouchableOpacity style={styles.searchBtn} onPress={onSearch}>
        <Ionicons style={styles.searchIcon} name="search" size={normalize(18)} color="#5b4cfd" />
      </TouchableOpacity>
      <TextInput
        placeholder="Tìm kiếm sách..."
        style={styles.input}
        value={value}
        onChangeText={(val) => {
          setValue(val);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "90%",
    elevation: 1,
    shadowColor: "#000",
    borderRadius: normalize(10),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: normalize(8),
  },
  searchBtn: {},
  searchIcon: {
    marginRight: normalize(10),
  },
  input: {
    flex: 1,
    fontSize: normalize(12),
    fontFamily: "nunito-medium",
    color: "#3c3c3c",
  },
});

export default SearchBox;
