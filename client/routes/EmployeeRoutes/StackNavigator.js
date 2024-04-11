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
import SelectBorrowerScreen from "../../screens/EmployeeScreens/SelectBorrowerScreen";
import AddBorrowBookScreen from "../../screens/EmployeeScreens/AddBorrowBookScreen";
import SelectBookGroupScreen from "../../screens/EmployeeScreens/SelectBookGroupScreen";
import SelectBorrowedBookScreen from "../../screens/EmployeeScreens/SelectBorrowedBookScreen";
import BorrowingBooksByBorrowersScreen from "../../screens/EmployeeScreens/BorrowingBooksByBorrowersScreen";
import BorrowingBookDetailScreen from "../../screens/EmployeeScreens/BorrowingBookDetailScreen";
import BorrowersManDashboard from "../../screens/EmployeeScreens/BorrowersManDashboard";
import BorrowersSearchResult from "../../screens/EmployeeScreens/BorrowersSearchResult";
import BorrowingBookByBorrowerSearchResult from "../../screens/EmployeeScreens/BorrowingBookByBorrowerSearchResult";
import BorrowingReaderSearchResult from "../../screens/EmployeeScreens/BorrowingReaderSearchResult";
import BookGroupToBorrowSearchResult from "../../screens/EmployeeScreens/BookGroupToBorrowSearchResult";
import BookToBorrowSearchResult from "../../screens/EmployeeScreens/BookToBorrowSearchResult";
import BorrowedBookManDashBoard from "../../screens/EmployeeScreens/BorrowedBookManDashBoard";
import FineManDashBoard from "../../screens/EmployeeScreens/FineManDashBoard";
import BorrowingBookSearchResult from "../../screens/EmployeeScreens/BorrowingBookSearchResult";
import FineDetailScreen from "../../screens/EmployeeScreens/FineDetailScreen";
import OverdueBookListScreen from "../../screens/EmployeeScreens/OverdueBookListScreen";
import FineSearchResult from "../../screens/EmployeeScreens/FineSearchResult";
import ReaderSearchResults from "../../screens/EmployeeScreens/ReaderSearchResults";

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
        name="Reader Search Results"
        component={ReaderSearchResults}
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

const BorrowersManagementDashboardStackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle} initialRouteName="Borrowers Management">
      <Stack.Screen
        name="Borrowers Management"
        component={BorrowersManDashboard}
        options={{
          header: (props) => <MainHeader title="Borrowers Management" {...props} />,
        }}
      />

      <Stack.Screen
        name="Borrowing Books"
        component={BorrowingBooksByBorrowersScreen}
        options={{
          header: (props) => <MainHeader title="Borrowing Books" {...props} is_stack />,
        }}
      />

      <Stack.Screen
        name="Borrowing Book Detail"
        component={BorrowingBookDetailScreen}
        options={{
          header: (props) => <MainHeader title="Borrowing Book Detail" {...props} is_stack />,
        }}
      />

      <Stack.Screen
        name="Borrowers Search Result"
        component={BorrowingReaderSearchResult}
        options={{
          header: (props) => <MainHeader title="Borrowers Search Result" {...props} is_stack />,
        }}
      />

      <Stack.Screen
        name="Borrowing Books Search Result"
        component={BorrowingBookByBorrowerSearchResult}
        options={{
          header: (props) => <MainHeader title="Books Search Result" {...props} is_stack />,
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
        name="Borrowers Search Result"
        component={BorrowersSearchResult}
        options={{
          header: (props) => <MainHeader title="Borrowers Search Result" {...props} is_stack />,
        }}
      />

      <Stack.Screen
        name="Book Group To Borrow Search Result"
        component={BookGroupToBorrowSearchResult}
        options={{
          header: (props) => <MainHeader title="Book Groups Search Result" {...props} is_stack />,
        }}
      />

      <Stack.Screen
        name="Book To Borrow Search Result"
        component={BookToBorrowSearchResult}
        options={{
          header: (props) => <MainHeader title="Books Search Result" {...props} is_stack />,
        }}
      />
    </Stack.Navigator>
  );
};

const BorrowedBookManStackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Borrowed Books"
        component={BorrowedBookManDashBoard}
        options={{
          header: (props) => <MainHeader title="Borrowed Books" {...props} />,
        }}
      />

      <Stack.Screen
        name="Borrowing Book Detail"
        component={BorrowingBookDetailScreen}
        options={{
          header: (props) => <MainHeader title="Borrowing Book Detail" {...props} is_stack />,
        }}
      />

      <Stack.Screen
        name="Borrowing Books Search Result"
        component={BorrowingBookSearchResult}
        options={{
          header: (props) => <MainHeader title="Books Search Result" {...props} is_stack />,
        }}
      />
    </Stack.Navigator>
  );
};

const FineManStackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Fine"
        component={FineManDashBoard}
        options={{
          header: (props) => <MainHeader title="Fine" {...props} />,
        }}
      />

      <Stack.Screen
        name="Fine Detail"
        component={FineDetailScreen}
        options={{
          header: (props) => <MainHeader title="Fine Detail" {...props} is_stack />,
        }}
      />

      <Stack.Screen
        name="Overdue Books Detail"
        component={OverdueBookListScreen}
        options={{
          header: (props) => <MainHeader title="Overdue Books" {...props} is_stack />,
        }}
      />

      <Stack.Screen
        name="Fine Search Result"
        component={FineSearchResult}
        options={{
          header: (props) => <MainHeader title="Fine Search Result" {...props} is_stack />,
        }}
      />
    </Stack.Navigator>
  );
};

export {
  ReaderManStackNavigation,
  AddReaderStackNavigation,
  BookManStackNavigation,
  BorrowersManagementDashboardStackNavigation,
  AddBookStackNavigation,
  AddBorrowBookStackNavigation,
  BorrowedBookManStackNavigation,
  FineManStackNavigation,
};
