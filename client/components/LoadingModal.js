import { ActivityIndicator, Button, Modal, StyleSheet, Text, View } from "react-native";

function LoadingModal({ visible }) {
  return (
    <Modal animationType="fade" transparent={true} visible={visible} statusBarTranslucent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ActivityIndicator size="large" color={"#1e74fd"} />
          <Text style={styles.modalText}>Loading...</Text>
        </View>
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

export default LoadingModal;
