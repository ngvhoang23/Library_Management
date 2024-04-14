import { createStackNavigator } from "@react-navigation/stack";
import BookGroupsScreen from "../../screens/ReaderScreens/BookGroupsScreen";
import MainHeader from "../../components/MainHeader";
import BookBorrowingManDashBoard from "../../screens/ReaderScreens/BookBorrowingManDashBoard";
import NotificationScreen from "../../screens/ReaderScreens/NotificationScreen";
import ProfileScreen from "../../screens/ReaderScreens/ProfileScreen";

const Stack = createStackNavigator();

const screenOptionStyle = {};

const BookStackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle} initialRouteName="Book Groups">
      <Stack.Screen
        name="Book Groups"
        component={BookGroupsScreen}
        options={{ header: (props) => <MainHeader title="Book Groups" {...props} /> }}
      />
    </Stack.Navigator>
  );
};

const BookBorrowingStackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle} initialRouteName="Book Borrowing">
      <Stack.Screen
        name="Book Borrowing"
        component={BookBorrowingManDashBoard}
        options={{ header: (props) => <MainHeader title="Book Borrowing" {...props} /> }}
      />
    </Stack.Navigator>
  );
};

const NotificationStackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle} initialRouteName="Notifications">
      <Stack.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{ header: (props) => <MainHeader title="Notifications" {...props} /> }}
      />
    </Stack.Navigator>
  );
};

const ProfileStackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle} initialRouteName="Profile">
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ header: (props) => <MainHeader title="Profile" {...props} /> }}
      />
    </Stack.Navigator>
  );
};

export { BookStackNavigation, BookBorrowingStackNavigation, NotificationStackNavigation, ProfileStackNavigation };
