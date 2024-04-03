import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  AddEmpStackNavigator,
  AddReaderStackNavigation,
  BorrowBookDashboardStackNavigation,
  EmpManStackNavigator,
  ReaderManStackNavigation,
} from "./StackNavigator";
import AddBookGroupScreen from "../../screens/EmployeeScreens/AddBookGroupScreen";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { normalize } from "../../defined_function";

const Tab = createBottomTabNavigator();

const EmployeeManTabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: normalize(40),
          paddingTop: normalize(6),
          paddingBottom: normalize(4),
        },
        tabBarLabelStyle: {
          fontSize: normalize(8),
          fontFamily: "nunito-medium",
        },
        tabBarLabelPosition: "below-icon",
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={EmpManStackNavigator}
        options={{
          tabBarLabel: "Dashboard",
          tabBarIcon: ({ focused, color, size }) => {
            return <MaterialCommunityIcons name="view-dashboard-outline" size={normalize(16)} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Borrow Book"
        component={AddEmpStackNavigator}
        options={{
          tabBarLabel: "Add Employee",
          tabBarIcon: ({ focused, color, size }) => {
            return <Entypo name="add-to-list" size={normalize(16)} color={color} />;
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
          height: normalize(40),
          paddingTop: normalize(6),
          paddingBottom: normalize(4),
        },
        tabBarLabelStyle: {
          fontSize: normalize(8),
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
            return <MaterialCommunityIcons name="view-dashboard-outline" size={normalize(16)} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Borrow Reader"
        component={AddReaderStackNavigation}
        options={{
          tabBarLabel: "Add Reader",
          tabBarIcon: ({ focused, color, size }) => {
            return <Entypo name="add-to-list" size={normalize(16)} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export { EmployeeManTabNavigation, ReaderManTabNavigation };
