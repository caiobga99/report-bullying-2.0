import "react-native-gesture-handler";
import { StyleSheet, StatusBar } from "react-native";
import MyRoutes from "./routes";
import Navbar from "./components/Navbar";
import { NavigationContainer } from "@react-navigation/native";
import { TokenProvider } from "./common/Token";
import { UserProvider } from "./common/User";
import { TemaProvider } from "./common/Tema";

export default function App() {
  return (
    <NavigationContainer>
      <TokenProvider>
        <TemaProvider>
          <UserProvider>
            <Navbar />
            <MyRoutes />
          </UserProvider>
        </TemaProvider>
      </TokenProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: StatusBar.currentHeight * 2.5,
  },
});
