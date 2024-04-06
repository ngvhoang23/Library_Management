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
import { Ionicons, AntDesign } from "@expo/vector-icons";
import SearchBar from "./SearchBar";
import { useIsFocused } from "@react-navigation/native";
import { SCREEN_WIDTH, normalize } from "../defined_function";
import FlatButton from "../shared/FlatButton";

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
            <Text style={styles.title} numberOfLines={1}>
              {option.title}
            </Text>
            <Text style={styles.description} numberOfLines={1}>
              {option.description}
            </Text>
          </View>
        </TouchableOpacity>
      );
    });
  };

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <TouchableOpacity style={styles.centeredView} activeOpacity={1}>
        <View style={styles.modalView}>
          <View style={styles.searchContainer}>
            {searchResult && (
              <Pressable
                style={styles.backBtn}
                onPress={() => {
                  setSearchResult();
                  setSearchValue("");
                }}
              >
                <Ionicons name="chevron-back" size={normalize(14)} color="#949498" />
              </Pressable>
            )}
            <SearchBar
              _styles={[styles.searchBar]}
              placeholder={"search books..."}
              value={searchValue}
              onChange={(value) => setSearchValue(value)}
              onSearch={() => {
                onSearch(searchValue);
              }}
            />
          </View>
          {searchResult && <Text style={styles.searchLable}>Search result</Text>}

          <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.contentContainer}>
              {searchResult ? renderOptions(searchResult) : renderOptions(options)}
            </View>
          </ScrollView>
          <FlatButton
            _styles={styles.buttonClose}
            onPress={() => setVisible(false)}
            text="Close"
            textColor={"#676768"}
          />
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
    marginTop: normalize(22),
    height: "100%",
  },
  modalView: {
    height: Dimensions.get("window").height / 1.5,
    margin: normalize(20),
    backgroundColor: "white",
    borderRadius: normalize(10),
    padding: normalize(20),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: normalize(2),
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: SCREEN_WIDTH - normalize(40),
    position: "relative",
  },

  searchContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  searchBar: {
    flex: 1,
  },

  backBtn: {
    paddingVertical: normalize(10),
    paddingRight: normalize(4),
    marginRight: normalize(6),
  },

  searchLable: {
    fontFamily: "nunito-medium",
    fontSize: normalize(10),
    letterSpacing: normalize(2),
    color: "#ced0d4",
    marginTop: normalize(8),
  },

  contentContainer: {},

  scrollContainer: {
    width: "100%",
    marginTop: normalize(20),
  },

  buttonClose: {
    position: "absolute",
    right: normalize(10),
    bottom: normalize(10),
    paddingHorizontal: normalize(14),
    paddingVertical: normalize(10),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: normalize(16),
    width: "100%",
    flex: 1,
  },

  content: {
    flex: 1,
    marginLeft: 10,
  },

  title: {
    width: "92%",
    fontFamily: "nunito-medium",
    fontSize: normalize(10),
    letterSpacing: normalize(2),
    color: "#676768",
    marginBottom: normalize(6),
  },

  description: {
    width: "100%",
    fontFamily: "nunito-medium",
    fontSize: normalize(8),
    letterSpacing: normalize(2),
    color: "#aaabaf",
  },

  photoPreview: {
    width: normalize(40),
    height: normalize(40),
    borderRadius: normalize(10),
  },
});

export default PickerModal;
