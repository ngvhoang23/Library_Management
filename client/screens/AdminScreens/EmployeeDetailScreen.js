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
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import { _retrieveData, normalize } from "../../defined_function";
import AlertModal from "../../components/AlertModal";

function EmployeeDetailScreen({ route, navigation }) {
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

  const {
    user_avatar,
    user_name,
    password,
    full_name,
    phone_num,
    birth_date,
    email_address,
    gender,
    first_name,
    last_name,
    address,
    created_at,
  } = empInfo;

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
    <View style={styles.wrapper}>
      <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
        <View style={[styles.avatarContainer]}>
          <View>
            <Image source={{ uri: `http://10.0.2.2:5000${user_avatar}` }} style={styles.avatarPreview} />
          </View>
        </View>

        <PreviewInfoItem
          _styles={[styles.input]}
          textStyles={{ color: "#676768" }}
          lableTitle="User Name"
          value={user_name}
          icon={<AntDesign name="user" size={normalize(18)} color="#6fa4f8" />}
          read_only
        />

        <PreviewInfoItem
          _styles={[styles.input]}
          textStyles={{ color: "#676768" }}
          lableTitle="Phone Number"
          value={phone_num}
          icon={<AntDesign name="phone" size={normalize(18)} color="#6fa4f8" />}
          read_only
        />

        <PreviewInfoItem
          _styles={[styles.input]}
          textStyles={{ color: "#676768" }}
          lableTitle="Gender"
          value={gender ? "Male" : "Female"}
          icon={<FontAwesome name="transgender" size={normalize(18)} color="#6fa4f8" />}
          read_only
        />

        <PreviewInfoItem
          _styles={[styles.input]}
          textStyles={{ color: "#676768" }}
          lableTitle="Birth Date"
          value={birth_date ? new Date(birth_date).toISOString().split("T")[0] : ""}
          icon={<Fontisto name="date" size={normalize(18)} color="#6fa4f8" />}
          read_only
        />

        <PreviewInfoItem
          _styles={[styles.input]}
          textStyles={{ color: "#676768" }}
          lableTitle="First Work Date"
          value={created_at ? new Date(created_at).toISOString().split("T")[0] : ""}
          icon={<FontAwesome name="hourglass-1" size={normalize(16)} color="#6fa4f8" />}
          read_only
        />

        <PreviewInfoItem
          _styles={[styles.input]}
          textStyles={{ color: "#676768" }}
          lableTitle="Email"
          value={email_address}
          icon={<Fontisto name="email" size={normalize(18)} color="#6fa4f8" />}
          read_only
        />

        <PreviewInfoItem
          _styles={[styles.input]}
          textStyles={{ color: "#676768" }}
          lableTitle="Address"
          value={address}
          icon={<EvilIcons name="location" size={normalize(22)} color="#6fa4f8" />}
          read_only
        />

        <PreviewInfoItem
          _styles={[styles.input]}
          textStyles={{ color: "#676768" }}
          lableTitle="Full Name"
          value={full_name}
          icon={<MaterialIcons name="drive-file-rename-outline" size={normalize(18)} color="#6fa4f8" />}
          read_only
        />
      </ScrollView>
      <View style={styles.options}>
        <FlatButton
          _styles={styles.changePasswordBtn}
          text="Change Password"
          onPress={() => navigation.navigate("Change Password", { user_id: emp_info?.user_id })}
        />
        <FlatButton _styles={styles.deleteBtn} text="Delete Employee" onPress={handleDeleteEmployee} />
        <FlatButton
          _styles={styles.editBtn}
          text="Edit"
          onPress={() => navigation.navigate("Edit Employee", { emp_info: empInfo })}
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

  deleteBtn: {
    height: normalize(32),
    width: "46%",
    paddingVertical: 0,
    marginLeft: normalize(10),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f02849",
  },

  editBtn: {
    height: normalize(32),
    width: "100%",
    paddingVertical: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1e74fd",
    marginTop: normalize(10),
  },

  changePasswordBtn: {
    height: normalize(32),
    width: "46%",
    paddingVertical: 0,
    marginRight: normalize(10),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1e74fd",
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

export default EmployeeDetailScreen;
