import { Image, StyleSheet, Text, View } from "react-native";
import InputItem from "../../components/InputItem";
import AvatarPicker from "../../components/AvatarPicker";
import { ScrollView } from "react-native-gesture-handler";
import FlatButton from "../../shared/FlatButton";
import LoadingModal from "../../components/LoadingModal";
import PreviewInfoItem from "../../components/PreviewInfoItem";
import {
  FontAwesome,
  MaterialIcons,
  Feather,
  Fontisto,
  FontAwesome5,
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome6,
  EvilIcons,
  SimpleLineIcons,
  Entypo,
  Ionicons,
} from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import AlertModal from "../../components/AlertModal";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import { _retrieveData, normalize } from "../../defined_function";

function BookGroupDetailScreen({ route, navigation }) {
  const { book_info } = route.params;
  const { book_detail_id } = book_info;

  const isFocused = useIsFocused();

  const [isLoading, setIsLoading] = useState(false);
  const [resultStatus, setResultStatus] = useState({ isSuccess: false, visible: false });
  const [status, setStatus] = useState(true);
  const [bookInfo, setBookInfo] = useState({});

  useEffect(() => {
    _retrieveData("ACCESS_TOKEN")
      .then((access_token) => {
        const config = {
          params: { book_detail_id },
          headers: { Authorization: `Bearer ${access_token}` },
        };

        if (isFocused) {
          axios
            .get(`http://10.0.2.2:5000/books/book-groups/${book_detail_id}`, config)
            .then((result) => {
              setBookInfo(result.data[0]);
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

  const { book_name, price, published_date, description, publish_com, author_name, category_name, cover_photo } =
    bookInfo;

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
        <View style={[styles.avatarContainer]}>
          <View>
            <Image source={{ uri: `http://10.0.2.2:5000${cover_photo}` }} style={styles.avatarPreview} />
          </View>
        </View>

        <PreviewInfoItem
          _styles={[styles.input]}
          textStyles={{ color: "#676768" }}
          lableTitle="Book name"
          value={book_name}
          multiline
          icon={<Ionicons name="book-outline" size={normalize(18)} color="#6fa4f8" />}
          read_only
        />

        <PreviewInfoItem
          _styles={[styles.input]}
          textStyles={{ color: "#676768" }}
          lableTitle="Price"
          value={price?.toString()}
          icon={<MaterialIcons name="attach-money" size={normalize(18)} color="#6fa4f8" />}
          read_only
        />

        <PreviewInfoItem
          _styles={[styles.input]}
          textStyles={{ color: "#676768" }}
          lableTitle="Published Date"
          value={published_date ? new Date(published_date).toISOString().split("T")[0] : ""}
          icon={<Fontisto name="date" size={normalize(18)} color="#6fa4f8" />}
          read_only
        />

        <PreviewInfoItem
          _styles={[styles.input]}
          textStyles={{ color: "#676768" }}
          lableTitle="Description"
          value={description}
          multiline
          read_only
        />

        <PreviewInfoItem
          _styles={[styles.input]}
          textStyles={{ color: "#676768" }}
          lableTitle="Publish company"
          value={publish_com}
          icon={<SimpleLineIcons name="cloud-upload" size={normalize(18)} color="#6fa4f8" />}
          read_only
        />

        <PreviewInfoItem
          _styles={[styles.input]}
          textStyles={{ color: "#676768" }}
          lableTitle="Author"
          value={author_name}
          icon={<AntDesign name="user" size={normalize(18)} color="#6fa4f8" />}
          read_only
        />

        <PreviewInfoItem
          _styles={[styles.input]}
          textStyles={{ color: "#676768" }}
          lableTitle="Category"
          value={category_name}
          icon={<MaterialIcons name="checklist-rtl" size={normalize(18)} color="#6fa4f8" />}
          read_only
        />
      </ScrollView>

      <View style={styles.options}>
        <FlatButton
          _styles={styles.openBookListBtn}
          text="Book List"
          onPress={() => navigation.navigate("Book List", { book_info: bookInfo })}
        />
        <FlatButton
          _styles={styles.editBtn}
          text="Edit"
          onPress={() => navigation.navigate("Edit Book Group", { book_info: bookInfo })}
        />
      </View>
      <LoadingModal visible={isLoading} />
      <AlertModal
        onClose={() => setResultStatus({ isSuccess: 0, visible: false })}
        isSuccess={resultStatus?.isSuccess}
        visible={resultStatus?.visible ? true : false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: normalize(20),
  },

  avatarContainer: {
    position: "relative",
    with: "100%",
    minHeight: normalize(50),
    backgroundColor: "#eee",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#ced0d4",
    justifyContent: "center",
    alignItems: "center",
    padding: normalize(12),
    marginBottom: normalize(20),
  },

  avatarPreview: { width: normalize(120), height: normalize(120), borderRadius: 99999 },

  headerTitle: {
    fontFamily: "nunito-medium",
    fontSize: normalize(18),
    width: "100%",
    marginLeft: normalize(40),
  },

  avatarPicker: {
    width: "100%",
    marginBottom: normalize(20),
  },

  formWrapper: {
    width: "100%",
    margin: normalize(20),
    justifyContent: "space-between",
    alignItems: "center",
  },

  formContainer: {
    width: "90%",
    height: normalize(420),
    flex: 1,
    flexGrow: 1,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },

  input: {
    marginBottom: normalize(20),
    width: "100%",
    marginBottom: normalize(30),
  },

  openBookListBtn: {
    height: normalize(32),
    width: "40%",
    paddingVertical: 0,
    marginRight: normalize(10),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1e74fd",
  },

  editBtn: {
    height: normalize(32),
    width: "40%",
    paddingVertical: 0,
    marginLeft: normalize(10),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1e74fd",
  },

  options: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: normalize(10),
    marginTop: normalize(10),
  },
});

export default BookGroupDetailScreen;
