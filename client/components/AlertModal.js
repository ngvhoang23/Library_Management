import { ActivityIndicator, Button, Modal, StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useRef } from "react";

function AlertModal({ visible, isSuccess, onClose }) {
  const timeoutRef = useRef();

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      onClose();
    }, 1000);
    return () => {
      clearTimeout(timeoutRef?.current);
    };
  }, [visible]);

  return (
    <Modal animationType="fade" transparent={true} visible={visible} statusBarTranslucent={true}>
      <View style={styles.centeredView}>
        {isSuccess ? (
          <View style={styles.modalView}>
            <AntDesign name="checkcircleo" size={40} color="#5cb85c" />
            <Text style={styles.modalText}>Success</Text>
          </View>
        ) : (
          <View style={styles.modalView}>
            <AntDesign name="closecircleo" size={40} color="#ff3333" />
            <Text style={styles.modalText}>Failed </Text>
          </View>
        )}
      </View>
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
    margin: 20,
    width: 200,
    height: 70,
    backgroundColor: "white",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalText: {
    marginVertical: 15,
    textAlign: "center",
    fontSize: 16,
    marginLeft: 15,
    fontFamily: "nunito-medium",
    letterSpacing: 4,
  },
});

export default AlertModal;
