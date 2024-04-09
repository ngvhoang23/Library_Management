import React, { useEffect } from "react";
import { omit } from "lodash";

import { DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from "@react-navigation/drawer";

import {
  BookManStackNavigation,
  BorrowBookStackNavigation,
  EmpManStackNavigator,
  ReaderManStackNavigation,
} from "./StackNavigator";
import { useAuthContext } from "../../context/roleContext";
import { useUserInfoContext } from "../../context/userInfoContext";
import axios from "axios";
import { SCREEN_HEIGHT, SCREEN_WIDTH, _retrieveData, normalize } from "../../defined_function/index";
import {
  BookManTabNavigation,
  BorrowedBookManTabNavigation,
  BorrowerManTabNavigation,
  ReaderManTabNavigation,
} from "./TabNavigation";
import FlatButton from "../../shared/FlatButton";
import LoginForm from "../../components/loginForm";
import {
  faBook,
  faBookOpenReader,
  faChartLine,
  faBookmark,
  faUser,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { StyleSheet, View, StatusBar } from "react-native";
import { AntDesign, MaterialCommunityIcons, Feather, MaterialIcons } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

const EmployeeDrawerNavigator = () => {
  const { auth, setAuth } = useAuthContext();

  const { user, setUser } = useUserInfoContext();

  useEffect(() => {
    _retrieveData("ACCESS_TOKEN").then((access_token) => {
      const config = {
        headers: { Authorization: `Bearer ${access_token}` },
      };

      axios
        .get(`http://10.0.2.2:5000/users/user-info`, config)
        .then((result) => {
          setUser(result.data);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }, []);

  return (
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
        name="Manage Readers"
        component={ReaderManTabNavigation}
        options={{
          headerShown: false,
          unmountOnBlur: true,
          drawerLabelStyle: {
            fontSize: normalize(11),
            fontFamily: "nunito-bold",
          },
          drawerIcon: ({ focused, color, size }) => <Feather name="users" size={normalize(19)} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Manage Books"
        component={BookManTabNavigation}
        options={{
          headerShown: false,
          unmountOnBlur: true,
          drawerLabelStyle: {
            fontSize: normalize(11),
            fontFamily: "nunito-bold",
          },
          drawerIcon: ({ focused, color, size }) => <Feather name="book-open" size={normalize(19)} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Manage Borrowers"
        component={BorrowerManTabNavigation}
        options={{
          headerShown: false,
          unmountOnBlur: true,
          drawerLabelStyle: {
            fontSize: normalize(11),
            fontFamily: "nunito-bold",
          },
          drawerIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name="smart-card-reader-outline" size={normalize(19)} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Manage Borrowed Books"
        component={BorrowedBookManTabNavigation}
        options={{
          headerShown: false,
          unmountOnBlur: true,
          drawerLabelStyle: {
            fontSize: normalize(11),
            fontFamily: "nunito-bold",
          },
          drawerIcon: ({ focused, color, size }) => <AntDesign name="book" size={normalize(19)} color={color} />,
        }}
      />
    </Drawer.Navigator>
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
});

export default EmployeeDrawerNavigator;
