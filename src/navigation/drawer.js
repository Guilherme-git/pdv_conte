import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "../components/customDrawer";
import {
  Ionicons,
  Entypo,
  FontAwesome,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

import Home from "../screens/home";

export default () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      initialRouteName="users-create"
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: "transparent",
        drawerActiveTintColor: "#F2F2F2",
        drawerInactiveBackgroundColor: "transparent",
        drawerInactiveTintColor: "#A2A2A2",
      }}
    >
      <Drawer.Screen
        options={{
          title: "Painel",
          drawerIcon: ({ color }) => (
            <Ionicons name="home-sharp" size={24} color={color} />
          ),
        }}
        name="home"
        component={Home}
      />
    </Drawer.Navigator>
  );
};
