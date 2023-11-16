import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  useFonts,
  Poppins_300Light,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";
import CustomButton from "../CustomButton";
export default function Denuncia({ titulo, mensagem, onPress, email }) {
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
        {email ? <Text style={styles.textHeader}>{email}</Text> : ""}
        <Text style={styles.textHeader}>{titulo}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.textContent}>{mensagem}</Text>
      </View>
      <View>
        <CustomButton
          title={"Ver Resposta"}
          size={140}
          fontSize={18}
          onPress={onPress}
        />
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
    marginBottom: Dimensions.get("window").height * 0.04,
    marginLeft: 15,
    minHeight: Dimensions.get("window").height * 0.2,
    minWidth: Dimensions.get("window").width * 0.8,
  },
  header: {
    alignItems: "center",
    width: "100%",
    borderBottomWidth: 3,
    minWidth: Dimensions.get("window").width * 0.8,
    borderColor: "#C5C5C5",
  },
  textHeader: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 23,
    textShadowColor: "rgba(73, 95, 126, 1)",
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 5,
  },
  textContent: {
    fontFamily: "Poppins_400Regular",
    fontSize: 21,
  },
});
