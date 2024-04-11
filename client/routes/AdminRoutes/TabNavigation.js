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
import { AntDesign, Feather, MaterialIcons, Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const EmployeeManTabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        unmountOnBlur: true,
        headerShown: false,
        tabBarStyle: {
          height: normalize(44),
          paddingTop: normalize(6),
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
        component={EmpManStackNavigator}
        options={{
          tabBarLabel: "Dashboard",
          tabBarIcon: ({ focused, color, size }) => {
            return <AntDesign name="home" size={normalize(16)} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Borrow Book"
        component={AddEmpStackNavigator}
        options={{
          tabBarLabel: "Add Employee",
          tabBarIcon: ({ focused, color, size }) => {
            return <Feather name="user-plus" size={normalize(16)} color={color} />;
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
        unmountOnBlur: true,
        headerShown: false,
        tabBarStyle: {
          height: normalize(44),
          paddingTop: normalize(6),
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
        component={ReaderManStackNavigation}
        options={{
          tabBarLabel: "Dashboard",
          tabBarIcon: ({ focused, color, size }) => {
            return <AntDesign name="home" size={normalize(16)} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Add Reader"
        component={AddReaderStackNavigation}
        options={{
          tabBarLabel: "Add Reader",
          tabBarIcon: ({ focused, color, size }) => {
            return <Feather name="user-plus" size={normalize(16)} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export { EmployeeManTabNavigation, ReaderManTabNavigation };
