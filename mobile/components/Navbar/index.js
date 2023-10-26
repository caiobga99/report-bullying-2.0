import { View, Text, StyleSheet, Dimensions } from "react-native";
import {
  useFonts,
  FredokaOne_400Regular,
} from "@expo-google-fonts/fredoka-one";
import SvgLogo from "../LogoSvg";
const Navbar = () => {
  let [fontsLoaded] = useFonts({
    FredokaOne_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.navbar}>
      <View style={styles.container}>
        <Text style={styles.text}>Report Bullying</Text>
      </View>
      <View style={styles.group}>
        <View style={styles.circle}>
          <SvgLogo />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    height: "20%",
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
