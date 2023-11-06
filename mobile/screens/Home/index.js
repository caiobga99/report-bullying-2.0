import {
  StyleSheet,
  Text,
  View,
  Switch,
  Pressable,
  Appearance,
} from "react-native";
import React, { useState } from "react";
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  useFonts,
  Poppins_300Light,
} from "@expo-google-fonts/poppins";
import useTema from "../../common/Tema";
export default function Home({ navigation }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_300Light,
  });
  if (!fontsLoaded) {
    return null;
  }
  const { setTema, tema } = useTema();
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: tema === "dark" ? "#fff" : "#000" },
      ]}
    >
      <View style={styles.box}>
        <View style={{ alignItems: "center" }}>
          <Switch
            trackColor={{ false: "#767577", true: "#e6e9ed" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            onValueChange={toggleSwitch}
            value={tema === "light"}
            style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
            onChange={() => {
              tema === "dark" ? setTema("light") : setTema("dark");
            }}
          />
          <Text style={styles.temaText}>CLARO/ESCURO</Text>
        </View>
        <View>
          <Pressable>
            <Text
              style={styles.link}
              onPress={() => navigation.push("Denuncie")}
            >
              FAZER DENUNCIA
            </Text>
          </Pressable>
        </View>
        <View>
          <Pressable>
            <Text
              style={styles.link}
              onPress={() => navigation.push("Denuncias")}
            >
              DENUNCIAS
            </Text>
          </Pressable>
        </View>
        <View>
          <Pressable>
            <Text style={styles.link} onPress={() => navigation.push("FAQ")}>
              AJUDA
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  box: {
    height: "70%",
    width: "90%",
    padding: 11,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-around",
  },
  link: {
    fontFamily: "Poppins_600SemiBold",
    color: "rgba(73, 95, 126, 1)",
    fontSize: 27,
  },
  temaText: {
    fontSize: 20,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    color: "rgba(73, 95, 126, 1)",
  },
});
