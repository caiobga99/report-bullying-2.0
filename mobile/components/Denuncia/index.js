import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  useFonts,
  Poppins_300Light,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";
export default function Denuncia({ email, ra, mensagem }) {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_300Light,
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>R.A: {ra}</Text>
      </View>
      <View>
        <Text style={styles.textContent}>{mensagem}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 3,
    backgroundColor: "#D9D9D9",
    height: "auto",
    width: "90%",
    borderRadius: 50,
    borderColor: "#C2C2C2",
    alignItems: "center",
    padding: 22,
    marginBottom: Dimensions.get("window").height * 0.03,
    marginLeft: 15,
  },
  header: {},
  textHeader: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 23,
  },
  textContent: {
    fontFamily: "Poppins_400Regular",
    fontSize: 21,
  },
});
