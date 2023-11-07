import {
  StyleSheet,
  Text,
  View,
  Switch,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  useFonts,
  Poppins_300Light,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import useTema from "../../common/Tema";
import api from "../../lib/axios";
import showToast from "../../components/Toast";
import useUser from "../../common/User";
import useToken from "../../common/Token";
export default function Home({ navigation }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_300Light,
    Poppins_700Bold,
  });
  if (!fontsLoaded) {
    return null;
  }
  const { setIsLogged } = useUser();
  const { setToken } = useToken();
  const { setTema, tema } = useTema();
  const logout = () => {
    api.get("/logout").then((res) => {
      setIsLogged(false);
      setTema("dark");
      showToast(res.data.message);
      setToken(res.data.token);
      navigation.push("Login");
    });
  };
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
            thumbColor={isEnabled ? "#f5dd4b" : "#2A2A2A"}
            onValueChange={toggleSwitch}
            value={tema === "light"}
            style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
            onChange={() => {
              tema === "dark" ? setTema("light") : setTema("dark");
            }}
          />
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text
              style={[
                styles.temaText,
                {
                  color: tema === "light" ? "#8ba4c7" : "#2f4e7a",
                  fontFamily:
                    tema === "dark" ? "Poppins_700Bold" : "Poppins_400Regular",
                },
              ]}
            >
              CLARO
            </Text>
            <Text
              style={[
                styles.temaText,
                {
                  color: tema === "light" ? "#8ba4c7" : "#2f4e7a",
                },
              ]}
            >
              /
            </Text>
            <Text
              style={[
                styles.temaText,
                {
                  color: tema === "light" ? "#8ba4c7" : "#2f4e7a",
                  fontFamily:
                    tema === "light" ? "Poppins_700Bold" : "Poppins_400Regular",
                },
              ]}
            >
              ESCURO
            </Text>
          </View>
        </View>
        <View>
          <TouchableOpacity>
            <Text
              style={[
                styles.link,
                {
                  color: tema === "light" ? "#8ba4c7" : "#2f4e7a",
                },
              ]}
              onPress={() => navigation.push("Denuncie")}
            >
              FAZER DENUNCIA
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Pressable>
            <Text
              style={[
                styles.link,
                {
                  color: tema === "light" ? "#8ba4c7" : "#2f4e7a",
                },
              ]}
              onPress={() => navigation.push("Denuncias")}
            >
              DENUNCIAS
            </Text>
          </Pressable>
        </View>
        <View>
          <Pressable>
            <Text
              style={[
                styles.link,
                {
                  color: tema === "light" ? "#8ba4c7" : "#2f4e7a",
                },
              ]}
              onPress={() => navigation.push("FAQ")}
            >
              AJUDA
            </Text>
          </Pressable>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "red",
            width: "80%",
            height: "15%",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 22,
          }}
          onPress={() => logout()}
        >
          <Text
            style={[
              styles.link,
              { color: tema === "light" ? "#efefef" : "#fff" },
            ]}
          >
            Sair
          </Text>
        </TouchableOpacity>
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
    fontSize: 27,
    textShadowOffset: { width: 2.5, height: 2.5 },
    textShadowRadius: 20,
    textShadowColor: "rgba(73, 95, 126, 1)",
  },
  temaText: {
    fontSize: 20,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    textShadowColor: "rgba(73, 95, 126, 1)",
    textShadowOffset: { width: 2.5, height: 2.5 },
    textShadowRadius: 13.3,
  },
});
