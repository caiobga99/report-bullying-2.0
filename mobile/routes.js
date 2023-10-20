import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Cadastro from "./screens/Cadastro/index";
import Login from "./screens/Login/index";
import Denuncias from "./screens/Denuncias/index";
import { HeaderTitle, HeaderIcon } from "./components/Navbar";
import Denuncie from "./screens/Denuncie";
import {
  useFonts,
  FredokaOne_400Regular,
} from "@expo-google-fonts/fredoka-one";
import FAQ from "./screens/FAQ";
const MyRoutes = () => {
  let [fontsLoaded] = useFonts({
    FredokaOne_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      // screenOptions={{
      // headerStyle: {
      //   backgroundColor: "#fff",
      // },
      //   headerShadowVisible: false,
      //   headerTransparent: true,
      //   headerTitle: () => <HeaderTitle />,
      //   headerTitleStyle: {
      //     fontSize: 32,
      //     textAlign: "center",
      //     flexWrap: "wrap",
      //     fontWeight: "400",
      //     fontFamily: "FredokaOne_400Regular",
      //   },
      // }}
      initialRouteName="Cadastro"
    >
      <Stack.Screen
        name="Denuncie"
        component={Denuncie}
        // options={{
        //   headerRight: () => <HeaderIcon />,
        // }}
      />
      <Stack.Screen name="Denuncias" component={Denuncias} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Cadastro" component={Cadastro} />
      <Stack.Screen name="FAQ" component={FAQ} />
    </Stack.Navigator>
  );
};

export default MyRoutes;
