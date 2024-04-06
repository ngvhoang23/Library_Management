import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MainHeader from "../../components/MainHeader";
import ReaderManDashboard from "../../screens/EmployeeScreens/ReaderManDashboard";
import AddReaderScreen from "../../screens/EmployeeScreens/AddReaderScreen";
import ReaderDetailScreen from "../../screens/EmployeeScreens/ReaderDetailScreen";
import EditReaderScreen from "../../screens/EmployeeScreens/EditReaderScreen";
import ChangePasswordScreen from "../../screens/EmployeeScreens/ChangePasswordScreen";
import SearchResults from "../../screens/EmployeeScreens/SearchResults";
import BookGroupManDashboard from "../../screens/EmployeeScreens/BookGroupManDashboard";
import AddBookGroupScreen from "../../screens/EmployeeScreens/AddBookGroupScreen";
import EditBookGroupScreen from "../../screens/EmployeeScreens/EditBookGroupScreen";
import BookGroupDetailScreen from "../../screens/EmployeeScreens/BookGroupDetailScreen";
import BookListDashBoard from "../../screens/EmployeeScreens/BookListDashBoard";
import EditBookScreen from "../../screens/EmployeeScreens/EditBookScreen";
import AddBookScreen from "../../screens/EmployeeScreens/AddBookScreen";
import BookGroupSearchResult from "../../screens/EmployeeScreens/BookGroupSearchResult";
import BookSearchResult from "../../screens/EmployeeScreens/BookSearchResult";
import BorrowedBookManDashboard from "../../screens/EmployeeScreens/BorrowedBookManDashboard";
import SelectBorrowerScreen from "../../screens/EmployeeScreens/SelectBorrowerScreen";
import AddBorrowBookScreen from "../../screens/EmployeeScreens/AddBorrowBookScreen";
import SelectBookGroupScreen from "../../screens/EmployeeScreens/SelectBookGroupScreen";
import SelectBorrowedBookScreen from "../../screens/EmployeeScreens/SelectBorrowedBookScreen";

const Stack = createStackNavigator();

const screenOptionStyle = {};

const ReaderManStackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle} initialRouteName="Readers">
      <Stack.Screen
        name="Readers"
        component={ReaderManDashboard}
        options={{
          header: (props) => <MainHeader title="Readers" {...props} />,
        }}
      />

      <Stack.Screen
        name="Add Readers"
        component={AddReaderScreen}
        options={{ header: (props) => <MainHeader title="Add Readers" {...props} is_stack /> }}
      />

      <Stack.Screen
        name="Reader Detail"
        component={ReaderDetailScreen}
        options={{ header: (props) => <MainHeader title="Readers Detail" {...props} is_stack /> }}
      />

      <Stack.Screen
        name="Edit Reader"
        component={EditReaderScreen}
        options={{ header: (props) => <MainHeader title="Edit Reader" {...props} is_stack /> }}
      />

      <Stack.Screen
        name="Change Password"
        component={ChangePasswordScreen}
        options={{ header: (props) => <MainHeader title="Change Reader Password" {...props} is_stack /> }}
      />

      <Stack.Screen
        name="Search Results"
        component={SearchResults}
        options={{ header: (props) => <MainHeader title="Search Result" {...props} is_stack /> }}
      />
    </Stack.Navigator>
  );
};

const AddReaderStackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle} initialRouteName="Add Readers">
      <Stack.Screen
        name="Add Readers"
        component={AddReaderScreen}
        options={{ header: (props) => <MainHeader title="Add Readers" {...props} /> }}
      />
    </Stack.Navigator>
  );
};

const BookManStackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Book Groups"
        component={BookGroupManDashboard}
        options={{
          header: (props) => <MainHeader title="Book Groups" {...props} />,
        }}
      />
      <Stack.Screen
        name="Add Book Groups"
        component={AddBookGroupScreen}
        options={{
          header: (props) => <MainHeader title="Add Book Group" {...props} is_stack />,
        }}
      />

      <Stack.Screen
        name="Add Books"
        component={AddBookScreen}
        options={{
          header: (props) => <MainHeader title="Add Book" {...props} is_stack />,
        }}
      />

      <Stack.Screen
        name="Book Group Detail"
        component={BookGroupDetailScreen}
        options={{
          header: (props) => <MainHeader title="Book Group Detail" {...props} is_stack />,
        }}
      />

      <Stack.Screen
        name="Edit Book Group"
        component={EditBookGroupScreen}
        options={{
          header: (props) => <MainHeader title="Edit Book Group" {...props} is_stack />,
        }}
      />

      <Stack.Screen
        name="Book List"
        component={BookListDashBoard}
        options={{
          header: (props) => <MainHeader title="Book List" {...props} is_stack />,
        }}
      />

      <Stack.Screen
        name="Edit Book"
        component={EditBookScreen}
        options={{
          header: (props) => <MainHeader title="Edit Book" {...props} is_stack />,
        }}
      />

      <Stack.Screen
        name="Book Group Search Result"
        component={BookGroupSearchResult}
        options={{
          header: (props) => <MainHeader title="Book Group Search Result" {...props} is_stack />,
        }}
      />

      <Stack.Screen
        name="Book Search Result"
        component={BookSearchResult}
        options={{
          header: (props) => <MainHeader title="Book Search Result" {...props} is_stack />,
        }}
      />
    </Stack.Navigator>
  );
};

const AddBookStackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Add Book Groups"
        component={AddBookGroupScreen}
        options={{
          header: (props) => <MainHeader title="Add Book Group" {...props} />,
        }}
      />
    </Stack.Navigator>
  );
};

const BorrowBookDashboardStackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle} initialRouteName="Borrowed Book Management">
      <Stack.Screen
        name="Borrowed Book Management"
        component={BorrowedBookManDashboard}
        options={{
          header: (props) => <MainHeader title="Borrowed Book Management" {...props} />,
        }}
      />
    </Stack.Navigator>
  );
};

const AddBorrowBookStackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle} initialRouteName="Select Borrower">
      <Stack.Screen
        name="Select Borrower"
        component={SelectBorrowerScreen}
        options={{
          header: (props) => <MainHeader title="Select Borrower" {...props} />,
        }}
      />

      <Stack.Screen
        name="Select Book Group"
        component={SelectBookGroupScreen}
        options={{
          header: (props) => <MainHeader title="Select Book Group" {...props} is_stack />,
        }}
      />

      <Stack.Screen
        name="Select Borrowed Book"
        component={SelectBorrowedBookScreen}
        options={{
          header: (props) => <MainHeader title="Select Book" {...props} is_stack />,
        }}
      />

      <Stack.Screen
        name="Borrow Book"
        component={AddBorrowBookScreen}
        options={{
          header: (props) => <MainHeader title="Borrow Book" {...props} is_stack />,
        }}
      />

      <Stack.Screen
        name="Book Group Search Result"
        component={BookGroupSearchResult}
        options={{
          header: (props) => <MainHeader title="Book Group Search Result" {...props} is_stack />,
        }}
      />

      <Stack.Screen
        name="Book Search Result"
        component={BookSearchResult}
        options={{
          header: (props) => <MainHeader title="Book Search Result" {...props} is_stack />,
        }}
      />
    </Stack.Navigator>
  );
};

export {
  ReaderManStackNavigation,
  AddReaderStackNavigation,
  BookManStackNavigation,
  BorrowBookDashboardStackNavigation,
  AddBookStackNavigation,
  AddBorrowBookStackNavigation,
};
