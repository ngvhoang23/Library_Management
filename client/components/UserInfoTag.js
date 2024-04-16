import { Image, StyleSheet, Text, View, ImageBackground } from "react-native";
import FlatButton from "../shared/FlatButton";
import { AntDesign } from "@expo/vector-icons";
import { normalize } from "../defined_function";

function UserInfoTag({ full_name, role, user_avatar, onEdit, email }) {
  return (
    <ImageBackground source={require("../assets/images/page_bg.jpg")} style={styles.wrapper}>
      <View style={styles.leftSide}>
        <Text style={styles.userName} numberOfLines={2}>
          {full_name}
        </Text>
        <Text style={styles.desContent}>{role === "admin" ? "Admin" : "Employee"}</Text>
        {/* {email && <Text style={styles.emailContent}>Email: {email}</Text>} */}
      </View>
      <View style={styles.righSide}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: `http://10.0.2.2:5000/${user_avatar}` }} style={styles.avatarItem} />
        </View>
        <FlatButton text={"Edit Profile"} _styles={styles.editBtn} textColor="#5b4cfd" onPress={onEdit}>
          <AntDesign name="edit" size={normalize(14)} color="#5b4cfd" />
        </FlatButton>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: normalize(20),
    paddingRight: normalize(30),
    paddingLeft: normalize(20),

    shadowColor: "#52006A",
    elevation: 120,
  },
  leftSide: {},
  userName: {
    fontFamily: "nunito-bold",
    color: "#3c3c3c",
    fontSize: normalize(16),
    textAlign: "center",
    width: normalize(150),
  },
  desContent: {
    fontFamily: "nunito-bold",
    color: "#8c8c8d",
    fontSize: normalize(10),
    textAlign: "center",
  },
  emailContent: {
    marginTop: normalize(10),
    fontFamily: "nunito-bold",
    color: "#8c8c8d",
    fontSize: normalize(10),
    textAlign: "center",
  },
  righSide: {},
  avatarContainer: {
    borderWidth: 4,
    borderColor: "#6ec531",
    borderRadius: normalize(1000),
    padding: normalize(2),
    marginBottom: normalize(10),
  },
  avatarItem: {
    width: normalize(80),
    height: normalize(80),
    borderRadius: normalize(1000),
  },
  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: normalize(10),
    paddingVertical: normalize(6),
    borderWidth: 1,
    borderColor: "#6c60ff",
    backgroundColor: "#fff",
    color: "#5b4cfd",
  },
});

export default UserInfoTag;
