import { Image, StyleSheet, Text, View } from "react-native";
import InputItem from "../../components/InputItem";
import AvatarPicker from "../../components/AvatarPicker";
import { ScrollView } from "react-native-gesture-handler";
import FlatButton from "../../shared/FlatButton";
import LoadingModal from "../../components/LoadingModal";
import PreviewInfoItem from "../../components/PreviewInfoItem";
import { Entypo } from "@expo/vector-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMoneyBill1, faCalendarCheck } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowRightFromBracket,
  faHandHoldingHand,
  faArrowRotateLeft,
  FontAwesome,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import AlertModal from "../../components/AlertModal";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import { _retrieveData, normalize } from "../../defined_function";
import BriefBookInfoPreview from "../../components/BriefBookInfoPreview";
import BriefUserInfoPreview from "../../components/BriefUserInfoPreview";

function BorrowingBookDetailScreen({ route, navigation }) {
  const { borrowing_book_info } = route.params;
  const {
    borrow_id,
    book_id,
    book_name,
    cover_photo,
    author_name,
    position,
    category_name,
    borrow_date,
    return_date,
    actual_return_date,
    reader_name,
    reader_phone_num,
    reader_avatar,
  } = borrowing_book_info;

  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);
  const [resultStatus, setResultStatus] = useState({ isSuccess: false, visible: false });

  const returnBook = () => {
    _retrieveData("ACCESS_TOKEN")
      .then((access_token) => {
        const config = {
          headers: { Authorization: `Bearer ${access_token}` },
        };

        const payload = {
          borrow_id,
          actual_return_date: new Date().toISOString().split("T")[0],
        };

        axios
          .put(`http://10.0.2.2:5000/borrowed-books/return-book/${borrow_id}`, payload, config)
          .then((result) => {
            setResultStatus({ isSuccess: 1, visible: true });
            // navigation.goBack();
          })
          .catch((err) => {
            setResultStatus({ isSuccess: 0, visible: true });
            console.log("err", err);
          })
          .finally((result) => {
            setIsLoading(false);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteBorrowedBook = () => {
    _retrieveData("ACCESS_TOKEN")
      .then((access_token) => {
        const config = {
          headers: { Authorization: `Bearer ${access_token}` },
          params: {
            borrow_id,
          },
        };

        axios
          .delete(`http://10.0.2.2:5000/borrowed-books/${borrow_id}`, config)
          .then((result) => {
            setResultStatus({ isSuccess: 1, visible: true });
            // navigation.goBack();
          })
          .catch((err) => {
            setResultStatus({ isSuccess: 0, visible: true });
            console.log("err", err);
          })
          .finally((result) => {
            setIsLoading(false);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
        <BriefUserInfoPreview
          _styles={styles.userInfoContainer}
          full_name={reader_name}
          phone_num={reader_phone_num}
          avatar={`http://10.0.2.2:5000${reader_avatar}`}
        />
        <BriefBookInfoPreview
          _styles={styles.bookInfoContainer}
          book_name={book_name}
          author_name={author_name}
          position={position}
          overdue={new Date() > new Date(return_date)}
          cover_photo={`http://10.0.2.2:5000${cover_photo}`}
        />
        <PreviewInfoItem
          _styles={[styles.input]}
          textStyles={{ color: "#676768" }}
          lableTitle="Borrow Date"
          value={borrow_date ? new Date(borrow_date).toISOString().split("T")[0] : ""}
          icon={<FontAwesome name="hourglass-1" size={normalize(16)} color="#6fa4f8" />}
          read_only
        />

        <PreviewInfoItem
          _styles={[styles.input]}
          textStyles={{ color: new Date() > new Date(return_date) ? "#f02849" : "#676768" }}
          lableTitle="Return Date"
          value={return_date ? new Date(return_date).toISOString().split("T")[0] : ""}
          icon={<FontAwesome name="hourglass-end" size={normalize(16)} color="#6fa4f8" />}
          read_only
        />

        <PreviewInfoItem
          _styles={[styles.input]}
          textStyles={{ color: "#676768" }}
          lableTitle="Actual Return Date"
          value={actual_return_date ? new Date(actual_return_date).toISOString().split("T")[0] : ""}
          icon={<FontAwesomeIcon icon={faCalendarCheck} size={normalize(18)} style={{ color: "#949498" }} />}
          read_only
        />

        {new Date() > new Date(return_date) && (
          <PreviewInfoItem
            _styles={[styles.input]}
            textStyles={{ color: "#f02849" }}
            lableTitle="Fine"
            value={`${Math.abs(Math.floor((new Date(return_date) - new Date()) / (1000 * 60 * 60 * 24)) * 1000)} VNĐ`}
            icon={<FontAwesomeIcon icon={faMoneyBill1} size={normalize(18)} style={{ color: "#949498" }} />}
            read_only
          />
        )}
      </ScrollView>

      <View style={styles.options}>
        <FlatButton _styles={styles.deleteBtn} text="Delete" onPress={deleteBorrowedBook} />
        <FlatButton _styles={styles.returnBookBtn} text="Return this book" onPress={returnBook} />
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
  },

  userInfoContainer: {
    width: "100%",
    marginBottom: normalize(16),
  },

  bookInfoContainer: {
    width: "100%",
    marginBottom: normalize(20),
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

  headerTitle: {
    fontFamily: "nunito-medium",
    fontSize: normalize(18),
    width: "100%",
    marginLeft: normalize(40),
  },

  formWrapper: {
    width: "100%",
    marginHorizontal: normalize(20),
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
    marginTop: normalize(30),
  },

  input: {
    marginBottom: normalize(20),
    width: "100%",
    marginBottom: normalize(30),
  },

  deleteBtn: {
    height: normalize(32),
    width: "40%",
    paddingVertical: 0,
    marginRight: normalize(10),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f02849",
  },

  returnBookBtn: {
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

export default BorrowingBookDetailScreen;
