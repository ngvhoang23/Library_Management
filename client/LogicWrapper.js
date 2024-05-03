import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useAuthContext } from "./context/roleContext";
import AdminDrawerNavigator from "./routes/AdminRoutes/AdminDrawerNavigator";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { _retrieveData } from "./defined_function";
import EmployeeDrawerNavigator from "./routes/EmployeeRoutes/EmployeeDrawerNavigator";
import ReaderDrawerNavigator from "./routes/ReaderRoutes/ReaderDrawerNavigator";
import socket from "./socket";
import LoginScreen from "./screens/SharedScreens/LoginScreen";
import WelcomeScreen from "./screens/SharedScreens/WelcomeScreen";
import { AuthStackNavigation } from "./routes/SharedRoutes/StackNavigator";

function LogicWrapper() {
  const { auth, setAuth } = useAuthContext();

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#fff",
    },
  };

  const render = () => {
    if (auth === "admin") {
      return (
        <NavigationContainer theme={MyTheme}>
          <AdminDrawerNavigator />
        </NavigationContainer>
      );
    }
    if (auth === "emp") {
      return (
        <NavigationContainer theme={MyTheme}>
          <EmployeeDrawerNavigator />
        </NavigationContainer>
      );
    }
    if (auth === "reader") {
      return (
        <NavigationContainer theme={MyTheme}>
          <ReaderDrawerNavigator />
        </NavigationContainer>
      );
    }
    return (
      <NavigationContainer theme={MyTheme}>
        <AuthStackNavigation />
      </NavigationContainer>
    );
  };

  return render();
}

export default LogicWrapper;
