import React, { useEffect } from "react";

import { DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from "@react-navigation/drawer";
import { useAuthContext } from "../../context/roleContext";
import { useUserInfoContext } from "../../context/userInfoContext";
import axios from "axios";
import { SCREEN_HEIGHT, SCREEN_WIDTH, _retrieveData, normalize } from "../../defined_function/index";
import {
  BookBorrowingTabNavigation,
  BookTabNavigation,
  NotificationTabNavigation,
  ProfileTabNavigation,
} from "./TabNavigation";
import { Image, StyleSheet, Text, View } from "react-native";
import { AntDesign, MaterialCommunityIcons, Feather, MaterialIcons, Entypo, FontAwesome } from "@expo/vector-icons";
import ProfileScreen from "../../screens/ReaderScreens/ProfileScreen";
import BookBorrowingManDashBoard from "../../screens/ReaderScreens/BookBorrowingManDashBoard";
import NotificationScreen from "../../screens/ReaderScreens/NotificationScreen";

const Drawer = createDrawerNavigator();

const ReaderDrawerNavigator = () => {
  const { auth, setAuth } = useAuthContext();

  const { user, setUser } = useUserInfoContext();

  useEffect(() => {
    _retrieveData("ACCESS_TOKEN")
      .then((access_token) => {
        const config = {
          headers: { Authorization: `Bearer ${access_token}` },
        };

        axios
          .get(`http://10.0.2.2:5000/users/user-info`, config)
          .then((result) => {
            console.log("result.data", result.data);
            setUser(result.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return user ? (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          width: SCREEN_WIDTH / 1.45,
          height: SCREEN_HEIGHT,
        },

        drawerItemStyle: {
          marginBottom: normalize(10),
          paddingVertical: normalize(6),
          paddingHorizontal: normalize(4),
        },
      }}
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView
            {...props}
            style={{
              position: "relative",
            }}
            contentContainerStyle={{
              flexDirection: "column",
              justifyContent: "flex-start",
              height: SCREEN_HEIGHT,
            }}
          >
            <DrawerItemList {...props} />
            <View style={styles.bottomDrawerSection}>
              <DrawerItem
                label={"Logout"}
                onPress={() => setAuth(null)}
                labelStyle={{
                  fontSize: normalize(12),
                  fontFamily: "nunito-bold",
                  flexDirection: "column",
                  color: "#f02849",
                }}
                icon={({ focused, color, size }) => (
                  <MaterialIcons name="logout" size={normalize(19)} color={"#f02849"} />
                )}
              />
            </View>
          </DrawerContentScrollView>
        );
      }}
    >
      <Drawer.Screen
        name={user.full_name}
        component={ProfileTabNavigation}
        options={{
          headerShown: false,
          unmountOnBlur: true,
          drawerLabelStyle: {
            fontSize: normalize(11),
            fontFamily: "nunito-bold",
          },
          drawerIcon: ({ focused, color, size }) => (
            <Image source={{ uri: `http://10.0.2.2:5000${user?.user_avatar}` }} style={styles.userAvatar} />
          ),
        }}
      />

      <Drawer.Screen
        name="Books"
        component={BookTabNavigation}
        options={{
          headerShown: false,
          unmountOnBlur: true,
          drawerLabelStyle: {
            fontSize: normalize(11),
            fontFamily: "nunito-bold",
          },
          drawerIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name="bookshelf" size={normalize(20)} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Book Borrowing"
        component={BookBorrowingTabNavigation}
        options={{
          headerShown: false,
          unmountOnBlur: true,
          drawerLabelStyle: {
            fontSize: normalize(11),
            fontFamily: "nunito-bold",
          },
          drawerIcon: ({ focused, color, size }) => <Entypo name="book" size={normalize(19)} color={color} />,
        }}
      />

      <Drawer.Screen
        name="Notifications"
        component={NotificationTabNavigation}
        options={{
          headerShown: false,
          unmountOnBlur: true,
          drawerLabelStyle: {
            fontSize: normalize(11),
            fontFamily: "nunito-bold",
          },
          drawerIcon: ({ focused, color, size }) => <FontAwesome name="bell-o" size={normalize(19)} color={color} />,
        }}
      />
    </Drawer.Navigator>
  ) : (
    <View>
      <Text>123</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomDrawerSection: {
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
    flex: 1,
    paddingTop: normalize(10),
    paddingLeft: normalize(10),
    position: "absolute",
    right: 0,
    left: 0,
    bottom: normalize(10),
  },

  userAvatar: {
    aspectRatio: 1,
    height: normalize(30),
    borderRadius: 900000,
  },
});

export default ReaderDrawerNavigator;
