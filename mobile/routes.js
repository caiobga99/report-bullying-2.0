import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Cadastro from "./screens/Cadastro/index";
import Login from "./screens/Login/index";
import Denuncias from "./screens/Denuncias/index";
import Navbar from "./components/Navbar";
import Denuncie from "./screens/Denuncie";

const MyRoutes = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Denuncie" component={Denuncie} />
      {/* <Stack.Screen name="Denuncias" component={Denuncias} /> */}
      {/* <Stack.Screen name="Login" component={Login} /> */}
      {/* <Stack.Screen name="Cadastro" component={Cadastro} /> */}
    </Stack.Navigator>
  );
};

export default MyRoutes;
