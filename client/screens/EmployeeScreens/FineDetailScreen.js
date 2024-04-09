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
import { faArrowRightFromBracket, faHandHoldingHand, faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import AlertModal from "../../components/AlertModal";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import { _retrieveData, normalize } from "../../defined_function";
import BriefBookInfoPreview from "../../components/BriefBookInfoPreview";
import BriefUserInfoPreview from "../../components/BriefUserInfoPreview";
import OverdueBookItem from "../../components/OverdueBookItem";
import PayDeptModal from "../../components/PayDeptModal";

function FineDetailScreen({ route, navigation }) {
  const { reader_info, borrowed_books, total_fine, total_amount_collected } = route.params;
  const { reader_id, reader_name, reader_avatar, reader_phone_num } = reader_info;

  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);
  const [resultStatus, setResultStatus] = useState({ isSuccess: false, visible: false });
  const [isShowPayDeptModal, setIsShowPayDeptModal] = useState(false);

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <BriefUserInfoPreview
          _styles={styles.userInfoContainer}
          full_name={reader_name}
          phone_num={reader_phone_num}
          avatar={`http://10.0.2.2:5000${reader_avatar}`}
        />
        <PreviewInfoItem
          _styles={[styles.infoPreview]}
          textStyles={{ color: "#f02849" }}
          lableTitle="Total fine"
          value={`${total_fine} VNĐ`}
          icon={<FontAwesomeIcon icon={faMoneyBill1} size={normalize(18)} style={{ color: "#949498" }} />}
          read_only
        />

        <PreviewInfoItem
          _styles={[styles.infoPreview]}
          textStyles={{ color: "#6ec531" }}
          lableTitle="Amount Collected"
          value={`${total_amount_collected || 0} VNĐ`}
          icon={<FontAwesomeIcon icon={faMoneyBill1} size={normalize(18)} style={{ color: "#949498" }} />}
          read_only
        />

        <PreviewInfoItem
          _styles={[styles.infoPreview]}
          textStyles={{ color: "#f02849" }}
          lableTitle="Remaining"
          value={`${total_fine - total_amount_collected || 0} VNĐ`}
          icon={<FontAwesomeIcon icon={faMoneyBill1} size={normalize(18)} style={{ color: "#949498" }} />}
          read_only
        />
      </View>

      <View style={styles.options}>
        <FlatButton
          _styles={styles.seeDetailBtn}
          text="See Detail"
          onPress={() =>
            navigation.navigate("Overdue Books Detail", {
              overdue_books: borrowed_books,
            })
          }
        />
        <FlatButton _styles={styles.payFineBtn} text="Pay the fine" onPress={() => setIsShowPayDeptModal(true)} />
      </View>
      <LoadingModal visible={isLoading} />
      <AlertModal
        onClose={() => setResultStatus({ isSuccess: 0, visible: false })}
        isSuccess={resultStatus?.isSuccess}
        visible={resultStatus?.visible ? true : false}
      />
      <PayDeptModal
        total_dept={total_fine - total_amount_collected}
        reader_id={reader_id}
        visible={isShowPayDeptModal}
        setVisible={setIsShowPayDeptModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: normalize(20),
    paddingBottom: 0,
  },

  container: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: 0,
  },

  userInfoContainer: {
    width: "100%",
    marginBottom: normalize(16),
  },

  infoPreview: {
    marginBottom: normalize(20),
  },

  payFineBtn: {
    height: normalize(32),
    flex: 1,
    paddingVertical: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1e74fd",
    marginLeft: normalize(10),
  },

  seeDetailBtn: {
    height: normalize(32),
    flex: 1,
    paddingVertical: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1e74fd",
    marginRight: normalize(10),
  },

  totalFine: {
    marginBottom: normalize(10),
  },

  options: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: normalize(10),
  },
});

export default FineDetailScreen;
