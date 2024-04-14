import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";

const SlideDownAnimation = ({ children }) => {
  const slideAnimation = useRef(new Animated.Value(0)).current;
  const fadeAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnimation, {
        toValue: 1,
        duration: 200, // Adjust duration as needed
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnimation, {
        toValue: 1,
        duration: 200, // Adjust duration as needed
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        opacity: fadeAnimation,
        transform: [
          {
            translateY: slideAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [-100, 0],
            }),
          },
        ],
      }}
    >
      {children}
    </Animated.View>
  );
};

export default SlideDownAnimation;
