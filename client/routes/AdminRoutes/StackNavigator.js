import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EmpManDashboard from "../../screens/AdminScreens/EmpManDashboard";
import AddEmployeScreen from "../../screens/AdminScreens/AddEmployeScreen";
import MainHeader from "../../components/MainHeader";
import EmployeeDetailScreen from "../../screens/AdminScreens/EmployeeDetailScreen";
import EditEmployeeScreen from "../../screens/AdminScreens/EditEmployeeScreen";
import ChangePasswordScreen from "../../screens/AdminScreens/ChangePasswordScreen";
import ReaderManDashboard from "../../screens/AdminScreens/ReaderManDashboard";
import AddReaderScreen from "../../screens/AdminScreens/AddReaderScreen";
import ReaderDetailScreen from "../../screens/AdminScreens/ReaderDetailScreen";
import EditReaderScreen from "../../screens/AdminScreens/EditReaderScreen";
import SearchResults from "../../screens/AdminScreens/SearchResults";
import ReaderSearchResults from "../../screens/EmployeeScreens/ReaderSearchResults";

const Stack = createStackNavigator();

const screenOptionStyle = {};

const EmpManStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle} initialRouteName="Employees">
      <Stack.Screen
        name="Employees"
        component={EmpManDashboard}
        options={{
          header: (props) => <MainHeader title="Employees" {...props} />,
        }}
      />
      <Stack.Screen
        name="Add Employees"
        component={AddEmployeScreen}
        options={{ header: (props) => <MainHeader title="Add Employees" {...props} is_stack /> }}
      />
      <Stack.Screen
        name="Employee Detail"
        component={EmployeeDetailScreen}
        options={{ header: (props) => <MainHeader title="Employee Detail" {...props} is_stack /> }}
      />

      <Stack.Screen
        name="Edit Employee"
        component={EditEmployeeScreen}
        options={{ header: (props) => <MainHeader title="Edit Employee" {...props} is_stack /> }}
      />

      <Stack.Screen
        name="Change Password"
        component={ChangePasswordScreen}
        options={{ header: (props) => <MainHeader title="Change Employee Password" {...props} is_stack /> }}
      />

      <Stack.Screen
        name="Search Results"
        component={SearchResults}
        options={{ header: (props) => <MainHeader title="Search Result" {...props} is_stack /> }}
      />
    </Stack.Navigator>
  );
};

const AddEmpStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle} initialRouteName="Add Employees">
      <Stack.Screen
        name="Add Employees"
        component={AddEmployeScreen}
        options={{ header: (props) => <MainHeader title="Add Employees" {...props} /> }}
      />
    </Stack.Navigator>
  );
};

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
        name="Readers Search Results"
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

export { EmpManStackNavigator, ReaderManStackNavigation, AddEmpStackNavigator, AddReaderStackNavigation };
