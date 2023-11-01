import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Cadastro from "./screens/Cadastro/index";
import Login from "./screens/Login/index";
import Denuncias from "./screens/Denuncias/index";
import Denuncie from "./screens/Denuncie";
import {
  useFonts,
  FredokaOne_400Regular,
} from "@expo-google-fonts/fredoka-one";
import FAQ from "./screens/FAQ";
import useToken from "./common/Token";
import useUser from "./common/User";
import { useEffect } from "react";
import api from "./lib/axios";
import Resposta from "./screens/Resposta";
const MyRoutes = () => {
  let [fontsLoaded] = useFonts({
    FredokaOne_400Regular,
  });

  const { setToken } = useToken();
  const { setIsLogged, isLogged } = useUser();
  useEffect(() => {
    // api.get("/logout");
    api.get("/token").then((res) => setToken(res.data));
    api.get("/userIsLogged").then((res) => setIsLogged(res.data));
  }, []);

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
      initialRouteName="Login"
    >
      {isLogged ? (
        <>
          <Stack.Screen name="Denuncias" component={Denuncias} />
          <Stack.Screen name="FAQ" component={FAQ} />
          <Stack.Screen
            name="Denuncie"
            component={Denuncie}
            // options={{
            //   headerRight: () => <HeaderIcon />,
            // }}
          />
          <Stack.Screen name="Resposta" component={Resposta} />
        </>
      ) : (
        <>
          <Stack.Screen name="Cadastro" component={Cadastro} />
          <Stack.Screen name="Login" component={Login} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default MyRoutes;
