import { Image, ImageBackground, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
  Octicons,
} from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import AlertModal from "../../components/AlertModal";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import { _retrieveData, normalize } from "../../defined_function";

function ReaderDetailScreen({ route, navigation }) {
  const { emp_info } = route.params;
  const { user_id } = emp_info;

  const isFocused = useIsFocused();

  const [isLoading, setIsLoading] = useState(false);
  const [resultStatus, setResultStatus] = useState({ isSuccess: false, visible: false });
  const [empInfo, setEmpInfo] = useState({});

  useEffect(() => {
    _retrieveData("ACCESS_TOKEN")
      .then((access_token) => {
        const config = {
          params: { user_id },
          headers: { Authorization: `Bearer ${access_token}` },
        };

        if (isFocused) {
          axios
            .get(`http://10.0.2.2:5000/users/employees/${user_id}`, config)
            .then((result) => {
              setEmpInfo(result.data[0]);
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

  const { user_avatar, user_name, full_name, phone_num, birth_date, email_address, gender, address } = empInfo;

  const handleDeleteEmployee = () => {
    _retrieveData("ACCESS_TOKEN")
      .then((access_token) => {
        const configurations = {
          method: "DELETE",
          url: `http://10.0.2.2:5000/users/employee`,
          data: { user_id: user_id },
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        };
        axios(configurations)
          .then((result) => {
            setResultStatus({ isSuccess: 1, visible: true });
            navigation.goBack();
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
    <ImageBackground source={require("../../assets/images/page_bg2.jpg")} resizeMode="cover" style={styles.wrapper}>
      <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={require("../../assets/images/page_bg.jpg")}
          resizeMode="cover"
          imageStyle={{ borderRadius: normalize(10) }}
          style={[styles.headerContainer]}
        >
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.avatarContainer}
            onPress={() => navigation.navigate("Edit Employee", { emp_info: empInfo })}
          >
            <Image source={{ uri: `http://10.0.2.2:5000${user_avatar}` }} style={styles.avatarPreview} />

            <FlatButton _styles={styles.editBtn} text="Edit">
              <AntDesign name="edit" size={normalize(12)} color="#fff" />
            </FlatButton>
          </TouchableOpacity>
        </ImageBackground>

        <PreviewInfoItem
          _styles={[styles.input]}
          textStyles={{ color: "#676768" }}
          lableTitle="Tên đăng nhập"
          value={user_name}
          icon={<AntDesign name="user" size={normalize(16)} color="#3c3c3c" />}
          read_only
        />

        <PreviewInfoItem
          _styles={[styles.input]}
          textStyles={{ color: "#676768" }}
          lableTitle="Số điện thoại"
          value={phone_num}
          icon={<AntDesign name="phone" size={normalize(16)} color="#3c3c3c" />}
          read_only
        />

        <PreviewInfoItem
          _styles={[styles.input]}
          textStyles={{ color: "#676768" }}
          lableTitle="Giới tính"
          value={gender ? "Male" : "Female"}
          icon={<FontAwesome name="transgender" size={normalize(16)} color="#3c3c3c" />}
          read_only
        />

        <PreviewInfoItem
          _styles={[styles.input]}
          textStyles={{ color: "#676768" }}
          lableTitle="Ngày sinh"
          value={birth_date ? new Date(birth_date).toISOString().split("T")[0] : ""}
          icon={<Fontisto name="date" size={normalize(16)} color="#3c3c3c" />}
          read_only
        />

        <PreviewInfoItem
          _styles={[styles.input]}
          textStyles={{ color: "#676768" }}
          lableTitle="Email"
          value={email_address}
          icon={<Fontisto name="email" size={normalize(16)} color="#3c3c3c" />}
          read_only
        />

        <PreviewInfoItem
          _styles={[styles.input]}
          textStyles={{ color: "#676768" }}
          lableTitle="Địa chỉ"
          value={address}
          icon={<EvilIcons name="location" size={normalize(22)} color="#3c3c3c" />}
          read_only
          numberOfLines={4}
          multiline
        />

        <PreviewInfoItem
          _styles={[styles.input]}
          textStyles={{ color: "#676768" }}
          lableTitle="Họ và tên"
          value={full_name}
          icon={<MaterialIcons name="drive-file-rename-outline" size={normalize(16)} color="#3c3c3c" />}
          read_only
        />
      </ScrollView>

      <View style={styles.options}>
        <FlatButton
          _styles={styles.changePasswordBtn}
          text="Đổi mật khẩu"
          onPress={() => navigation.navigate("Change Password", { user_id: emp_info?.user_id })}
        >
          <FontAwesome6 name="key" size={normalize(12)} color="#fff" />
        </FlatButton>
        <FlatButton _styles={styles.deleteBtn} text="Xóa nhân viên" onPress={handleDeleteEmployee} />
      </View>
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

  headerContainer: {
    marginTop: normalize(10),
    position: "relative",
    with: "100%",
    minHeight: normalize(50),
    justifyContent: "center",
    alignItems: "center",
    padding: normalize(12),
    marginBottom: normalize(20),
    backgroundColor: "#6c60ff",
    borderRadius: normalize(100),

    elevation: 400,
    shadowColor: "#6c60ff",

    marginHorizontal: normalize(10),
  },

  editBtn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1e74fd",
    position: "absolute",
    padding: normalize(6),
    left: normalize(-8),
  },

  readerName: {
    width: "100%",
    textAlign: "center",
    fontSize: normalize(11),
    letterSpacing: 1,
    color: "#fff",
    fontFamily: "nunito-bold",
    marginTop: normalize(10),
  },

  avatarPreview: { width: normalize(100), height: normalize(100), borderRadius: 99999 },

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
    width: "100%",
    height: normalize(420),
    flex: 1,
    flexGrow: 1,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },

  input: {
    width: "100%",
    marginBottom: normalize(20),
    paddingLeft: normalize(20),
    paddingRight: normalize(20),
  },

  changePasswordBtn: {
    height: normalize(32),
    width: "46%",
    paddingVertical: 0,
    marginRight: normalize(10),
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6c60ff",
    borderRadius: normalize(40),
  },

  deleteBtn: {
    height: normalize(32),
    width: "46%",
    paddingVertical: 0,
    marginLeft: normalize(10),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f02849",
    borderRadius: normalize(40),
  },

  activeBtn: {
    position: "absolute",
    bottom: normalize(10),
    left: normalize(10),
    zIndex: normalize(10),
    backgroundColor: "#6ec531",
    paddingVertical: normalize(8),
    paddingHorizontal: normalize(10),
    borderRadius: normalize(4),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  status: {
    position: "absolute",
    zIndex: 10,
    fontSize: normalize(14),
    borderRadius: 1000,
    bottom: normalize(4),
    right: normalize(4),
    width: normalize(20),
    height: normalize(20),
    backgroundColor: "#6ec531",
    alignItems: "center",
    justifyContent: "center",
  },

  options: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    paddingHorizontal: normalize(16),
    marginBottom: normalize(10),
    marginTop: normalize(10),
  },
});

export default ReaderDetailScreen;
