import { View, Text, StyleSheet, Dimensions } from "react-native";
import {
  useFonts,
  FredokaOne_400Regular,
} from "@expo-google-fonts/fredoka-one";
import SvgLogo from "../LogoSvg";
import useTema from "../../common/Tema";
const Navbar = () => {
  let [fontsLoaded] = useFonts({
    FredokaOne_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }
  const { tema } = useTema();

  return (
    <View
      style={[
        styles.navbar,
        { backgroundColor: tema === "dark" ? "#fff" : "#000" },
      ]}
    >
      <View style={styles.container}>
        <Text
          style={[styles.text, { color: tema === "dark" ? "#000" : "#fff" }]}
        >
          Report Bullying
        </Text>
      </View>
      <View style={styles.group}>
        <SvgLogo />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    height: "23%",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "transparent",
  },
  circle: {
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    width: Dimensions.get("window").width * 0.21,
    height: Dimensions.get("window").width * 0.21,
    backgroundColor: "#495F7E",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 32,
    textAlign: "center",
    flexWrap: "wrap",
    fontWeight: "400",
    fontFamily: "FredokaOne_400Regular",
  },
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  group: {
    width: "44%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Navbar;
