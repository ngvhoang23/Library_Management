import { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import FlatButton from "../shared/FlatButton";
import { SCREEN_WIDTH, _retrieveData, normalize } from "../defined_function";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { useIsFocused } from "@react-navigation/native";
import LoadingModal from "./LoadingModal";
import AlertModal from "./AlertModal";
import axios from "axios";
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
import socket from "../socket";

function MonthPickerModal() {
  return (
    <Modal animationType="fade" transparent={true} visible={visible} statusBarTranslucent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}></View>
      </View>
      <LoadingModal visible={isLoading} />
      <AlertModal
        onClose={() => setResultStatus({ isSuccess: 0, visible: false })}
        isSuccess={resultStatus?.isSuccess}
        visible={resultStatus?.visible ? true : false}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0008",
  },

  modalView: {
    width: SCREEN_WIDTH / 1.5,
    backgroundColor: "white",
    borderRadius: normalize(5),
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    padding: normalize(16),
    position: "relative",
  },

  container: {
    width: "100%",
  },

  input: {
    padding: normalize(10),
    width: "100%",
    borderWidth: 1,
    borderColor: "#ced0d4",
    borderRadius: normalize(10),
    borderStyle: "solid",
    fontSize: normalize(14),
    color: "#6ec531",
  },

  errorText: {
    marginTop: normalize(4),
    marginLeft: normalize(6),
    fontSize: normalize(10),
    color: "#f02849",
  },

  payFineBtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6c60ff",
    padding: normalize(20),
    paddingVertical: normalize(10),
    marginTop: normalize(16),
    borderRadius: normalize(1000),
  },

  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: normalize(14),
  },

  headerTitleWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  headerTitle: {
    fontSize: normalize(12),
    letterSpacing: 1,
    color: "#6c60ff",
    backgroundColor: "#fff",
    textTransform: "uppercase",
    fontFamily: "nunito-bold",
  },

  buttonClose: {},
});

export default MonthPickerModal;
