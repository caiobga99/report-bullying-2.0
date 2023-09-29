import "react-native-gesture-handler";
import { StyleSheet, Text, ScrollView, StatusBar, View } from "react-native";
import MyRoutes from "./routes";
import Navbar from "./components/Navbar";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <Navbar />
      <MyRoutes />
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
