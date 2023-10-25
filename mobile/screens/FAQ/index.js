import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomButton from "../../components/CustomButton";
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  useFonts,
  Poppins_300Light,
} from "@expo-google-fonts/poppins";
export default function FAQ({ navigation }) {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_300Light,
  });
  if (!fontsLoaded) {
    return null;
  }
  const DATA = [
    {
      titulo: "Como Denuncia?",
      mensagem:
        "Entre a pagina “Denuncie”, e preencha com os dados necesserios. (Titulo e E-mail)",
    },
    {
      titulo: "Não tenho R.A?",
      mensagem:
        "Caso você não saiba seu R.A, entre na secretaria digital e consulte seu R.A",
    },
    {
      titulo: "Como funciona as Denuncias?",
      mensagem:
        "As denúncias são anonimas de forma que só professores e usuários administradores possam ver",
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Como Denuncia?</Text>
        <Text style={styles.content}>
          Entre a pagina “Denuncie”, e preencha com os dados necesserios. (Nome,
          R.A, E-mail)
        </Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.title}>Não tenho R.A?</Text>
        <Text style={styles.content}>
          Caso você não saiba seu R.A, entre na secretaria digital e consulte
          seu R.A
        </Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.title}>Como funciona as Denuncias?</Text>
        <Text style={styles.content}>
          As denúncias são anonimas de forma que só professores e usuários
          administradores possam ver
        </Text>
      </View>

      <CustomButton
        title="Voltar"
        size={120}
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
  },
  box: {
    backgroundColor: "rgba(217, 217, 217, 1)",
    height: 140,
    width: "90%",
    padding: 11,
    borderRadius: 15,
  },
  title: {
    fontFamily: "Poppins_600SemiBold",
    color: "rgba(73, 95, 126, 1)",
    fontSize: 21,
  },
  content: {
    fontSize: 18,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
});
