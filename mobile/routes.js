import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Cadastro from "./screens/Cadastro/index";
import Login from "./screens/Cadastro/index";
const MyRoutes = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Cadastro} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default MyRoutes;
