import React, { useEffect } from "react";
import { omit } from "lodash";

import { DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from "@react-navigation/drawer";

import { EmpManStackNavigator, ReaderManStackNavigation } from "./StackNavigator";
import { useAuthContext } from "../../context/roleContext";
import { useUserInfoContext } from "../../context/userInfoContext";
import axios from "axios";
import { _retrieveData } from "../../defined_function/index";
import { EmployeeManTabNavigation, ReaderManTabNavigation } from "./TabNavigation";

const Drawer = createDrawerNavigator();

const AdminDrawerNavigator = () => {
  const { auth, setAuth } = useAuthContext();

  const { user, setUser } = useUserInfoContext();

  useEffect(() => {
    _retrieveData("ACCESS_TOKEN").then((access_token) => {
      const config = {
        headers: { Authorization: `Bearer ${access_token}` },
      };

      axios
        .get(`http://10.0.2.2:5000/users/user-info`, config)
        .then((result) => {
          setUser(result.data);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }, []);

  return (
    <Drawer.Navigator
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem label={"Logout"} onPress={() => setAuth(null)} />
          </DrawerContentScrollView>
        );
      }}
    >
      <Drawer.Screen name="Manage Employees" component={EmployeeManTabNavigation} options={{ headerShown: false }} />
      <Drawer.Screen name="Manage Readers" component={ReaderManTabNavigation} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
};

export default AdminDrawerNavigator;
