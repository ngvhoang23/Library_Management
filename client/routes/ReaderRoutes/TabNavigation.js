import { normalize } from "../../defined_function";
import {
  BookBorrowingStackNavigation,
  BookStackNavigation,
  NotificationStackNavigation,
  ProfileStackNavigation,
} from "./StackNavigator";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, Feather, MaterialIcons, Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const BookTabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        unmountOnBlur: true,
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
        component={BookStackNavigation}
        options={{
          tabBarLabel: "Dashboard",
          tabBarIcon: ({ focused, color, size }) => {
            return <AntDesign name="home" size={normalize(16)} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

const BookBorrowingTabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        unmountOnBlur: true,
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
        component={BookBorrowingStackNavigation}
        options={{
          tabBarLabel: "Dashboard",
          tabBarIcon: ({ focused, color, size }) => {
            return <AntDesign name="home" size={normalize(16)} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

const NotificationTabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        unmountOnBlur: true,
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
        component={NotificationStackNavigation}
        options={{
          tabBarLabel: "Dashboard",
          tabBarIcon: ({ focused, color, size }) => {
            return <AntDesign name="home" size={normalize(16)} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

const ProfileTabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        unmountOnBlur: true,
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
        component={ProfileStackNavigation}
        options={{
          tabBarLabel: "Dashboard",
          tabBarIcon: ({ focused, color, size }) => {
            return <AntDesign name="home" size={normalize(16)} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export { BookTabNavigation, BookBorrowingTabNavigation, NotificationTabNavigation, ProfileTabNavigation };
