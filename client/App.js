import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import * as Font from "expo-font";

import LogicWrapper from "./LogicWrapper";
import ContextWrapper from "./ContextWrapper";

const getFonts = () =>
  Font.loadAsync({
    "nunito-regular": require("./assets/fonts/Nunito-Regular.ttf"),
    "nunito-bold": require("./assets/fonts/Nunito-Bold.ttf"),
    "nunito-medium": require("./assets/fonts/Nunito-Medium.ttf"),
  });

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  useEffect(() => {
    getFonts().then((result) => {
      setFontsLoaded(true);
    });
  }, []);

  if (fontsLoaded) {
    return (
      <ContextWrapper>
        <LogicWrapper />
      </ContextWrapper>
    );
  } else {
    return (
      <View>
        <Text></Text>
      </View>
    );
  }
}
