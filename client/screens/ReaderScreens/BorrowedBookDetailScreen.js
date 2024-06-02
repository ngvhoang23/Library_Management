import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import InputItem from "../../components/InputItem";
import AvatarPicker from "../../components/AvatarPicker";
import { ScrollView } from "react-native-gesture-handler";
import FlatButton from "../../shared/FlatButton";
import LoadingModal from "../../components/LoadingModal";
import PreviewInfoItem from "../../components/PreviewInfoItem";
import { Entypo, FontAwesome, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMoneyBill1, faCalendarCheck } from "@fortawesome/free-regular-svg-icons";
import { faArrowRightFromBracket, faHandHoldingHand, faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import AlertModal from "../../components/AlertModal";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import { _retrieveData, normalize } from "../../defined_function";
import BriefBookInfoPreview from "../../components/BriefBookInfoPreview";
import BriefUserInfoPreview from "../../components/BriefUserInfoPreview";
import BriefBorrowingInfoPreview from "../../components/BriefBorrowingInfoPreview";

function BorrowedBookDetailScreen({ route, navigation }) {
  const { borrow_id } = route.params;

  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);
  const [resultStatus, setResultStatus] = useState({ isSuccess: false, visible: false });

  const [borrowInfo, setBorrowInfo] = useState();

  useEffect(() => {
    if (!borrow_id) return;
    _retrieveData("ACCESS_TOKEN")
      .then((access_token) => {
        const config = {
          headers: { Authorization: `Bearer ${access_token}` },
          params: { borrow_id },
        };
        axios
          .get(`http://10.0.2.2:5000/borrowed-books/borrowing-books/detail/${borrow_id}`, config)
          .then((result) => {
            setBorrowInfo(result.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [borrow_id]);

  const {
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
    description,
  } = borrowInfo ? borrowInfo : {};

  const renderPosition = (position) => {
    return position
      ?.split("-")
      .map((pos, index) => {
        if (index == 0) {
          pos = `K${pos}`;
        } else if (index == 1) {
          pos = `H${pos}`;
        } else if (index == 2) {
          pos = `TT${pos}`;
        }
        return pos;
      })
      .join("-");
  };

  return (
    <ImageBackground source={require("../../assets/images/page_bg1.jpg")} style={styles.wrapper}>
      <ScrollView
        style={styles.formContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ImageBackground source={require("../../assets/images/page_bg.jpg")} style={[styles.headerWrapper]}>
          <TouchableOpacity
            style={[styles.headerContainer]}
            onPress={() => navigation.navigate("Edit Book Group", { book_info: bookInfo })}
          >
            <View style={[styles.bookInfo, styles.elevation]}>
              <Text style={styles.bookNameHeader} numberOfLines={3}>
                {book_name}
              </Text>
              {author_name && <Text style={styles.authorNameHeader}>by {author_name}</Text>}
              {position && (
                <Text style={styles.desContent} numberOfLines={3}>
                  Vị trí: {renderPosition(position)}
                </Text>
              )}
            </View>
            <View style={styles.bookCoverPhoto}>
              <Image source={{ uri: `http://10.0.2.2:5000/${cover_photo}` }} style={styles.avatarPreview} />
            </View>
          </TouchableOpacity>
        </ImageBackground>

        <PreviewInfoItem
          _styles={[styles.input]}
          textStyles={{ color: "#676768" }}
          lableTitle="Ngày mượn"
          value={borrow_date ? new Date(borrow_date).toISOString().split("T")[0] : " "}
          icon={
            <Image
              source={require("../../assets/images/calendar_dur_icon.png")}
              style={{ width: normalize(20), height: normalize(20), backgroundColor: "transparent" }}
            />
          }
          border
          read_only
        />

        <PreviewInfoItem
          _styles={[styles.input]}
          textStyles={{ color: new Date() > new Date(return_date) ? "#f02849" : "#676768" }}
          lableTitle="Ngày trả"
          value={return_date ? new Date(return_date).toISOString().split("T")[0] : " "}
          icon={
            <Image
              source={require("../../assets/images/calendar_dur_icon.png")}
              style={{ width: normalize(20), height: normalize(20), backgroundColor: "transparent" }}
            />
          }
          border
          read_only
        />

        {new Date() > new Date(return_date) && (
          <PreviewInfoItem
            _styles={[styles.input]}
            textStyles={{ color: "#f02849", fontFamily: "nunito-bold" }}
            lableTitle="Số ngày muộn"
            value={`${Math.round((new Date() - new Date(return_date)) / (1000 * 3600 * 24))} days overdue`}
            icon={
              <Image
                source={require("../../assets/images/calendar_dur_icon.png")}
                style={{ width: normalize(20), height: normalize(20), backgroundColor: "transparent" }}
              />
            }
            border
            read_only
          />
        )}

        {new Date() > new Date(return_date) && (
          <PreviewInfoItem
            _styles={[styles.input]}
            textStyles={{ color: "#f02849", fontFamily: "nunito-bold" }}
            lableTitle="Tiền phạt"
            value={`${Math.abs(Math.floor((new Date(return_date) - new Date()) / (1000 * 60 * 60 * 24)) * 1000)} VNĐ`}
            icon={
              <Image
                source={require("../../assets/images/clock_icon.png")}
                style={{ width: normalize(20), height: normalize(20), backgroundColor: "transparent" }}
              />
            }
            border
            read_only
          />
        )}
      </ScrollView>

      <LoadingModal visible={isLoading} />
      <AlertModal
        onClose={() => setResultStatus({ isSuccess: 0, visible: false })}
        isSuccess={resultStatus?.isSuccess}
        visible={resultStatus?.visible ? true : false}
      />
    </ImageBackground>
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

  headerWrapper: {
    flex: 1,
    marginBottom: normalize(30),
    paddingHorizontal: normalize(16),
  },

  headerContainer: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    position: "relative",
    marginTop: normalize(10),
    padding: normalize(10),
    paddingTop: normalize(20),
    paddingBottom: normalize(30),
  },

  bookInfo: {
    width: "54%",
    borderRadius: normalize(10),
  },

  bookNameHeader: {
    fontFamily: "nunito-bold",
    fontSize: normalize(18),
    letterSpacing: normalize(2),
    color: "#3c3c3c",
  },

  authorNameHeader: {
    width: "100%",
    fontFamily: "nunito-medium",
    fontSize: normalize(10),
    letterSpacing: normalize(2),
    marginBottom: normalize(4),
    color: "#6c60ff",
  },

  desContent: {
    fontFamily: "nunito-medium",
    fontSize: normalize(10),
    color: "#676768",
    marginTop: normalize(6),
  },

  bookCoverPhoto: {},

  borrowingInfo: {
    width: "100%",
    marginBottom: normalize(30),
    marginTop: normalize(20),
    paddingHorizontal: normalize(10),
  },

  avatarPreview: {
    width: normalize(100),
    height: normalize(140),
    borderRadius: normalize(8),
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

  formContainer: {
    width: "100%",
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#eee",
    marginTop: normalize(0),
  },

  input: {
    width: "90%",
    marginBottom: normalize(20),
    paddingLeft: normalize(10),
    paddingRight: normalize(10),
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
    borderRadius: normalize(100),
  },

  returnBookBtn: {
    height: normalize(32),
    width: "40%",
    paddingVertical: 0,
    marginLeft: normalize(10),
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6c60ff",
    borderRadius: normalize(100),
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

export default BorrowedBookDetailScreen;
