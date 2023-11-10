import "react-native-gesture-handler";
import { StyleSheet, StatusBar } from "react-native";
import MyRoutes from "./routes";
import Navbar from "./components/Navbar";
import { NavigationContainer } from "@react-navigation/native";
import { TokenProvider } from "./common/Token";
import { UserProvider } from "./common/User";
import { TemaProvider } from "./common/Tema";
import { AnonymousProvider } from "./common/Anonymous";

export default function App() {
  return (
    <NavigationContainer>
      <TokenProvider>
        <TemaProvider>
          <AnonymousProvider>
            <UserProvider>
              <Navbar />
              <MyRoutes />
            </UserProvider>
          </AnonymousProvider>
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
