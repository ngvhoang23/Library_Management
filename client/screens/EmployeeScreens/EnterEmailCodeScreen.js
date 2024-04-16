import React, { useRef, useState } from "react";
import { StyleSheet, View, ScrollView, Keyboard, TouchableOpacity, ImageBackground } from "react-native";
import { Formik } from "formik";
import FlatButton from "../../shared/FlatButton.js";
import * as yup from "yup";
import InputItem from "../../components/InputItem.js";
import axios from "axios";
import AvatarPicker from "../../components/AvatarPicker.js";
import DateTimePicker from "@react-native-community/datetimepicker";
import MyDateTimePicker from "../../components/MyDateTimePicker.js";
import MenuPickers from "../../components/MenuPicker.js";
import LoadingModal from "../../components/LoadingModal.js";
import AlertModal from "../../components/AlertModal.js";
import { _retrieveData, normalize } from "../../defined_function/index.js";
import { useUserInfoContext } from "../../context/userInfoContext.js";
import ErrorAlertModal from "../../components/ErrorAlertModal.js";
import WarningAlertModal from "../../components/WarningAlertModal.js";
import CountDown from "../../components/CountDown.js";

const formSchema = yup.object({});

function EnterEmailCodeScreen({ route, navigation }) {
  const { duration } = route.params;

  const { user, setUser } = useUserInfoContext();

  const [isLoading, setIsLoading] = useState(false);
  const [resultStatus, setResultStatus] = useState({ isSuccess: false, visible: false });

  const handleSubmit = (values) => {
    const { token } = values;

    _retrieveData("ACCESS_TOKEN")
      .then((access_token) => {
        const configurations = {
          method: "POST",
          url: `http://10.0.2.2:5000/users/email`,
          data: { user_id: user.user_id, email_address: "ngvhoang03@gmail.com", token },
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        };

        axios(configurations)
          .then((result) => {
            setResultStatus({ isSuccess: 1, visible: true, message: "Success" });
            navigation.navigate("Profile");
          })
          .catch((err) => {
            if (err?.response?.data?.message == "INVALID_VALIDATION_CODE") {
              setResultStatus({ isSuccess: 0, visible: true, message: "Invalid Code" });
            } else {
              setResultStatus({ isSuccess: 0, visible: true, message: "Failed" });
            }
            console.log("err", err);
          })
          .finally((result) => {
            setIsLoading(false);
          });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally((result) => {
        setIsLoading(false);
      });
  };

  return (
    <ImageBackground source={require("../../assets/images/page_bg1.jpg")}>
      <TouchableOpacity style={styles.wrapper} activeOpacity={1.0} onPress={Keyboard.dismiss}>
        <Formik
          initialValues={{
            token: "",
          }}
          validationSchema={formSchema}
          onSubmit={(values, actions) => {
            actions.resetForm();
            handleSubmit(values);
          }}
        >
          {(props) => (
            <View style={styles.formWrapper}>
              <InputItem
                _styles={[styles.input]}
                placeholder="Enter confirmation code"
                lableTitle="Enter confirmation code"
                onChange={props.handleChange("token")}
                value={props.values.token}
                errorText={props.errors.token}
              />
              <CountDown
                _styles={styles.countDown}
                title={"Code will expired in "}
                initValue={duration / 1000}
                onTimeOut={() => {
                  setResultStatus({ isSuccess: 0, visible: true, message: "Code expired" });
                  setTimeout(() => {
                    navigation.goBack();
                  }, 1000);
                }}
              />
              <FlatButton
                _styles={styles.submitBtn}
                onPress={props.handleSubmit}
                text="Submit"
                fontSize={normalize(10)}
              />
            </View>
          )}
        </Formik>
        <LoadingModal visible={isLoading} />

        <AlertModal
          onClose={() => setResultStatus({ isSuccess: 0, visible: false })}
          isSuccess={resultStatus?.isSuccess}
          visible={resultStatus?.visible ? true : false}
          text={resultStatus?.message}
        />
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: "100%",
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },

  container: {
    height: "100%",
    width: "100%",
  },

  formWrapper: {
    width: "90%",
    margin: normalize(20),
    justifyContent: "space-between",
    alignItems: "center",
  },

  input: {
    marginBottom: normalize(10),
    width: "100%",
  },

  // countDown: { backgroundColor: "red" },

  submitBtn: {
    width: "100%",
    height: normalize(32),
    marginTop: normalize(10),
    marginBottom: normalize(20),
    paddingVertical: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6c60ff",
    borderRadius: normalize(100),
  },
});

export default EnterEmailCodeScreen;
