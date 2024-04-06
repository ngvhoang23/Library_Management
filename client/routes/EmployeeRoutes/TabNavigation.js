import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  AddBookStackNavigation,
  AddBorrowBookStackNavigation,
  AddReaderStackNavigation,
  BookManStackNavigation,
  BorrowBookDashboardStackNavigation,
  ReaderManStackNavigation,
} from "./StackNavigator";
import AddBookGroupScreen from "../../screens/EmployeeScreens/AddBookGroupScreen";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { normalize } from "../../defined_function";

const Tab = createBottomTabNavigator();

const BorrowBookTabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: normalize(50),
          paddingTop: normalize(8),
          paddingBottom: normalize(4),
        },
        tabBarLabelStyle: {
          fontSize: normalize(12),
          fontFamily: "nunito-medium",
        },
        tabBarLabelPosition: "below-icon",
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={BorrowBookDashboardStackNavigation}
        options={{
          tabBarLabel: "Dashboard",
          tabBarIcon: ({ focused, color, size }) => {
            return <MaterialCommunityIcons name="view-dashboard-outline" size={normalize(18)} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Borrow Book Tab"
        component={AddBorrowBookStackNavigation}
        options={{
          tabBarLabel: "Borrow Book",
          tabBarIcon: ({ focused, color, size }) => {
            return <Entypo name="add-to-list" size={normalize(18)} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

const ReaderManTabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: normalize(50),
          paddingTop: normalize(8),
          paddingBottom: normalize(4),
        },
        tabBarLabelStyle: {
          fontSize: normalize(12),
          fontFamily: "nunito-medium",
        },
        tabBarLabelPosition: "below-icon",
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={ReaderManStackNavigation}
        options={{
          tabBarLabel: "Dashboard",
          tabBarIcon: ({ focused, color, size }) => {
            return <MaterialCommunityIcons name="view-dashboard-outline" size={normalize(18)} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Borrow Reader"
        component={AddReaderStackNavigation}
        options={{
          tabBarLabel: "Add Reader",
          tabBarIcon: ({ focused, color, size }) => {
            return <Entypo name="add-to-list" size={normalize(18)} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

const BookManTabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: normalize(50),
          paddingTop: normalize(8),
          paddingBottom: normalize(4),
        },
        tabBarLabelStyle: {
          fontSize: normalize(12),
          fontFamily: "nunito-medium",
        },
        tabBarLabelPosition: "below-icon",
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={BookManStackNavigation}
        options={{
          tabBarLabel: "Dashboard",
          tabBarIcon: ({ focused, color, size }) => {
            return <MaterialCommunityIcons name="view-dashboard-outline" size={normalize(18)} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Add Book Group"
        component={AddBookStackNavigation}
        options={{
          tabBarLabel: "Add Book Group",
          tabBarIcon: ({ focused, color, size }) => {
            return <Entypo name="add-to-list" size={normalize(18)} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export { BorrowBookTabNavigation, ReaderManTabNavigation, BookManTabNavigation };
