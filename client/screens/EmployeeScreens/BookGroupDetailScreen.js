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
  Entypo,
} from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import AlertModal from "../../components/AlertModal";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import { _retrieveData } from "../../defined_function";

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
          icon={<Entypo name="open-book" size={24} color="#676768" />}
          read_only
        />

        <PreviewInfoItem
          _styles={[styles.input]}
          textStyles={{ color: "#676768" }}
          lableTitle="Price"
          value={price?.toString()}
          icon={<MaterialIcons name="price-check" size={24} color="#676768" />}
          read_only
        />

        <PreviewInfoItem
          _styles={[styles.input]}
          textStyles={{ color: "#676768" }}
          lableTitle="Published Date"
          value={published_date ? new Date(published_date).toISOString().split("T")[0] : ""}
          icon={<Entypo name="publish" size={24} color="#676768" />}
          read_only
        />

        <PreviewInfoItem
          _styles={[styles.input]}
          textStyles={{ color: "#676768" }}
          lableTitle="Description"
          value={description}
          icon={<MaterialCommunityIcons name="message-text-outline" size={24} color="#676768" />}
          read_only
        />

        <PreviewInfoItem
          _styles={[styles.input]}
          textStyles={{ color: "#676768" }}
          lableTitle="Publish company"
          value={publish_com}
          icon={<Entypo name="publish" size={24} color="#676768" />}
          read_only
        />

        <PreviewInfoItem
          _styles={[styles.input]}
          textStyles={{ color: "#676768" }}
          lableTitle="Author"
          value={author_name}
          icon={<AntDesign name="user" size={24} color="#676768" />}
          read_only
        />

        <PreviewInfoItem
          _styles={[styles.input]}
          textStyles={{ color: "#676768" }}
          lableTitle="Category"
          value={category_name}
          icon={<MaterialIcons name="type-specimen" size={24} color="#676768" />}
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
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },

  avatarContainer: {
    position: "relative",
    with: "100%",
    minHeight: 100,
    backgroundColor: "#eee",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#ced0d4",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    marginBottom: 20,
  },

  avatarPreview: { width: 200, height: 200, borderRadius: 99999 },

  headerTitle: {
    fontFamily: "nunito-medium",
    fontSize: 18,
    width: "100%",
    marginLeft: 40,
  },

  avatarPicker: {
    width: "100%",
    marginBottom: 20,
  },

  formWrapper: {
    width: "100%",
    margin: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },

  formContainer: {
    width: "90%",
    height: "90%",
    borderBottomWidth: 1,
    borderColor: "#eee",
  },

  input: {
    marginBottom: 20,
    width: "100%",
    marginBottom: 30,
  },

  openBookListBtn: {
    height: 50,
    width: "40%",
    paddingVertical: 0,
    marginRight: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1e74fd",
    borderRadius: 10,
  },

  editBtn: {
    height: 50,
    width: "40%",
    paddingVertical: 0,
    marginLeft: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1e74fd",
    borderRadius: 10,
  },

  options: {
    width: "100%",
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BookGroupDetailScreen;
