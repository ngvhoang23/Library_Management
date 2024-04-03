import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { normalize } from "../defined_function";

function AvatarPicker({ _styles, avatar, setAvatar, onPickImage, initAvatar, title }) {
  return (
    <TouchableOpacity style={[styles.wrapper, _styles]} activeOpacity={0.5} onPress={onPickImage}>
      <View style={styles.container}>
        {avatar || initAvatar ? (
          <Image source={{ uri: avatar?.uri || initAvatar }} style={styles.avatarPreview} />
        ) : (
          <Text style={styles.title}>{title}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    with: "100%",
    minHeight: normalize(100),
    backgroundColor: "#eee",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#ced0d4",
    justifyContent: "center",
    alignItems: "center",
    padding: normalize(12),
  },

  container: {},

  title: {
    fontFamily: "nunito-medium",
    fontSize: normalize(12),
    letterSpacing: normalize(4),
    color: "#aaabaf",
  },

  avatarPreview: { width: normalize(120), height: normalize(120), borderRadius: 99999 },
});
export default AvatarPicker;
