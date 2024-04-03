import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { BorrowBookDashboardStackNavigation } from "./StackNavigator";
import AddBookGroupScreen from "../../screens/EmployeeScreens/AddBookGroupScreen";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { normalize } from "../../defined_function";

const Tab = createBottomTabNavigator();

const BorrowBookTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: normalize(42),
          paddingTop: normalize(8),
          paddingBottom: normalize(4),
        },
        tabBarLabelStyle: {
          fontSize: normalize(10),
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
            return <MaterialCommunityIcons name="view-dashboard-outline" size={normalize(20)} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Borrow Book"
        component={AddBookGroupScreen}
        options={{
          tabBarLabel: "Borrow Book",
          tabBarIcon: ({ focused, color, size }) => {
            return <Entypo name="add-to-list" size={normalize(20)} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export { BorrowBookTabNavigation };
