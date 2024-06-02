import { Image, StyleSheet, View } from "react-native";
import OptionProfileItem from "../../components/OptionProfileItem";
import { Ionicons, Octicons, SimpleLineIcons, Entypo, MaterialIcons } from "@expo/vector-icons";
import { normalize } from "../../defined_function";

function SettingScreen({ navigation }) {
  return (
    <View style={styles.optionContainer}>
      <OptionProfileItem
        _styles={styles.optionItem}
        icon={
          <Image
            source={require("../../assets/images/key_icon.png")}
            style={{ width: normalize(24), height: normalize(24), backgroundColor: "transparent" }}
          />
        }
        title={"Đổi mật khẩu"}
        description={"Đổi mật khẩu"}
        onPress={() => navigation.navigate("Change Password")}
      />

      <OptionProfileItem
        _styles={styles.optionItem}
        icon={
          <Image
            source={require("../../assets/images/email_icon.png")}
            style={{ width: normalize(24), height: normalize(24), backgroundColor: "transparent" }}
          />
        }
        title={"Đổi địa chỉ email"}
        description={"Đổi địa chỉ email"}
        onPress={() => navigation.navigate("Change Email")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: normalize(10),
  },
  optionItem: {
    width: "100%",
  },
});

export default SettingScreen;
