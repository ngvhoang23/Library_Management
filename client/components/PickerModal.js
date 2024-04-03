import { useEffect, useState } from "react";
import {
  Button,
  Image,
  Modal,
  Alert,
  StyleSheet,
  Text,
  Pressable,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SearchBar from "./SearchBar";
import { useIsFocused } from "@react-navigation/native";

function PickerModal({ value, setValue, options, searchResult, setSearchResult, visible, setVisible, onSearch }) {
  const [searchValue, setSearchValue] = useState("");
  const isFocused = useIsFocused();

  useEffect(() => {
    if (visible) {
      setSearchResult();
      setSearchValue("");
    }
  }, [visible]);

  const renderOptions = (options) => {
    return options.map((option) => {
      return (
        <TouchableOpacity
          key={option.id}
          activeOpacity={0.4}
          onPress={() => {
            setValue(option.id);
            setVisible(false);
          }}
          style={styles.item}
        >
          <Image source={{ uri: option.photo }} style={styles.photoPreview} />
          <View style={styles.content}>
            <Text style={styles.title}>{option.title}</Text>
            <Text style={styles.description}>{option.description}</Text>
          </View>
        </TouchableOpacity>
      );
    });
  };

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <TouchableOpacity style={styles.centeredView} activeOpacity={0} onPress={() => setVisible(false)}>
        <View>
          <View style={styles.modalView}>
            <SearchBar
              _styles={[styles.searchBar, { marginLeft: searchResult ? 50 : 0, width: searchResult ? "90%" : "100%" }]}
              placeholder={"search books..."}
              value={searchValue}
              onChange={(value) => setSearchValue(value)}
              onSearch={() => onSearch(searchValue)}
            />
            {searchResult && <Text style={styles.searchLable}>Search result</Text>}
            {searchResult && (
              <Pressable style={styles.backBtn} onPress={() => setSearchResult()}>
                <Ionicons name="chevron-back" size={24} color="#676768" />
              </Pressable>
            )}
            <ScrollView
              style={styles.container}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
              }}
            >
              {searchResult ? renderOptions(searchResult) : renderOptions(options)}
            </ScrollView>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    height: "100%",
  },
  modalView: {
    height: Dimensions.get("window").height / 1.5,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    paddingTop: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: "relative",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: Dimensions.get("window").width - 100,
  },

  searchBar: {
    marginBottom: 20,
    width: "100%",
  },

  searchLable: {
    fontFamily: "nunito-medium",
    fontSize: 14,
    letterSpacing: 2,
    marginBottom: 20,
    color: "#676768",
  },

  backBtn: {
    position: "absolute",
    top: 20,
    left: 10,
    padding: 20,
  },

  container: {},

  buttonClose: {
    position: "absolute",
    right: 20,
    top: 20,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 16,
    width: "100%",
  },

  content: {
    flexGrow: 1,
    marginLeft: 10,
  },

  title: {
    width: "70%",
    fontFamily: "nunito-medium",
    fontSize: 16,
    letterSpacing: 2,
    color: "#676768",
    marginBottom: 10,
  },

  description: {
    width: "100%",
    fontFamily: "nunito-medium",
    fontSize: 12,
    letterSpacing: 2,
    color: "#aaabaf",
  },

  photoPreview: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
});

export default PickerModal;
