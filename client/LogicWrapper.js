import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useAuthContext } from "./context/roleContext";
import { Text, View } from "react-native";
import AdminDrawerNavigator from "./routes/AdminRoutes/AdminDrawerNavigator";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { _retrieveData } from "./defined_function";
import LoginScreen from "./screens/AdminScreens/login";
import EmployeeDrawerNavigator from "./routes/EmployeeRoutes/EmployeeDrawerNavigator";

function LogicWrapper() {
  const { auth, setAuth } = useAuthContext();
  const handleLogin = (values) => {
    _retrieveData("ACCESS_TOKEN")
      .then((access_token) => {
        const { user_name, password } = values;

        const payload = {
          user_name,
          password,
        };

        const config = {
          headers: { Authorization: `Bearer ${access_token}` },
        };

        axios
          .post(`http://10.0.2.2:5000/auth/login`, payload, config)
          .then((result) => {
            const { user_info, access_token } = result.data;
            return new Promise((resolve, reject) => {
              _storeData("ACCESS_TOKEN", access_token)
                .then(resolve({ user_info, access_token }))
                .catch((err) => {
                  reject(err);
                });
            });
          })
          .then(({ user_info, access_token }) => {
            if (user_info?.role) {
              setAuth(user_info?.role);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const _storeData = (key, value) => AsyncStorage.setItem(key, value);

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#fff",
    },
  };

  const render = () => {
    if (auth === "admin" || 1) {
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
    return <LoginScreen handleSubmit={handleLogin} />;
  };

  return render();
}

export default LogicWrapper;
