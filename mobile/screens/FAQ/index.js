import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import Denuncia from "../../components/Denuncia";
import CustomButton from "../../components/CustomButton";
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  useFonts,
  Poppins_300Light,
} from "@expo-google-fonts/poppins";
export default function FAQ() {
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
      nome: "asdasd",
      ra: "2132131-2",
      mensagem:
        "12312321 nabnufb bewfb jnbnbewuibgf bgiibweg bibiwegbiwegibgewibgwebibgiewibgweibgewibygwebgiybugibuh bigw ibuhg ewibuy gew uibgf bgiibweg bibiwegbiwegibgewibgwebibgiewibgweibgewibygwebgiybugibuh bigw ibuhg ewibuy gewuibgf bgiibweg bibiwegbiwegibgewibgwebibgiewibgweibgewibygwebgiybugibuh bigw ibuhg ewibuy gewuibgf bgiibweg bibiwegbiwegibgewibgwebibgiewibgweibgewibygwebgiybugibuh bigw ibuhg ewibuy gewuibgf bgiibweg bibiwegbiwegibgewibgwebibgiewibgweibgewibygwebgiybugibuh bigw ibuhg ewibuy gewuibgf bgiibweg bibiwegbiwegibgewibgwebibgiewibgweibgewibygwebgiybugibuh bigw ibuhg ewibuy gewuibgf bgiibweg bibiwegbiwegibgewibgwebibgiewibgweibgewibygwebgiybugibuh bigw ibuhg ewibuy gewuibgf bgiibweg bibiwegbiwegibgewibgwebibgiewibgweibgewibygwebgiybugibuh bigw ibuhg ewibuy gewuibgf bgiibweg bibiwegbiwegibgewibgwebibgiewibgweibgewibygwebgiybugibuh bigw ibuhg ewibuy gew",
      id: 1,
    },
    {
      nome: "asdasd",
      ra: "2132131-2",
      mensagem:
        "12312321 nabnufb bewfb jnbnbewuibgf bgiibweg bibiwegbiwegibgewibgwebibgiewibgweibgewibygwebgiybugibuh bigw ibuhg ewibuy gew uibgf bgiibweg bibiwegbiwegibgewibgwebibgiewibgweibgewibygwebgiybugibuh bigw ibuhg ewibuy gewuibgf bgiibweg bibiwegbiwegibgewibgwebibgiewibgweibgewibygwebgiybugibuh bigw ibuhg ewibuy gewuibgf bgiibweg bibiwegbiwegibgewibgwebibgiewibgweibgewibygwebgiybugibuh bigw ibuhg ewibuy gewuibgf bgiibweg bibiwegbiwegibgewibgwebibgiewibgweibgewibygwebgiybugibuh bigw ibuhg ewibuy gewuibgf bgiibweg bibiwegbiwegibgewibgwebibgiewibgweibgewibygwebgiybugibuh bigw ibuhg ewibuy gewuibgf bgiibweg bibiwegbiwegibgewibgwebibgiewibgweibgewibygwebgiybugibuh bigw ibuhg ewibuy gewuibgf bgiibweg bibiwegbiwegibgewibgwebibgiewibgweibgewibygwebgiybugibuh bigw ibuhg ewibuy gewuibgf bgiibweg bibiwegbiwegibgewibgwebibgiewibgweibgewibygwebgiybugibuh bigw ibuhg ewibuy gew",
      id: 2,
    },
    {
      nome: "asdasd",
      ra: "2132131-2",
      mensagem:
        "12312321 nabnufb bewfb jnbnbewuibgf bgiibweg bibiwegbiwegibgewibgwebibgiewibgweibgewibygwebgiybugibuh bigw ibuhg ewibuy gew uibgf bgiibweg bibiwegbiwegibgewibgwebibgiewibgweibgewibygwebgiybugibuh bigw ibuhg ewibuy gewuibgf bgiibweg bibiwegbiwegibgewibgwebibgiewibgweibgewibygwebgiybugibuh bigw ibuhg ewibuy gewuibgf bgiibweg bibiwegbiwegibgewibgwebibgiewibgweibgewibygwebgiybugibuh bigw ibuhg ewibuy gewuibgf bgiibweg bibiwegbiwegibgewibgwebibgiewibgweibgewibygwebgiybugibuh bigw ibuhg ewibuy gewuibgf bgiibweg bibiwegbiwegibgewibgwebibgiewibgweibgewibygwebgiybugibuh bigw ibuhg ewibuy gewuibgf bgiibweg bibiwegbiwegibgewibgwebibgiewibgweibgewibygwebgiybugibuh bigw ibuhg ewibuy gewuibgf bgiibweg bibiwegbiwegibgewibgwebibgiewibgweibgewibygwebgiybugibuh bigw ibuhg ewibuy gewuibgf bgiibweg bibiwegbiwegibgewibgwebibgiewibgweibgewibygwebgiybugibuh bigw ibuhg ewibuy gew",
      id: 3,
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

      <CustomButton title="Voltar" size={120} />
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
    fontSize: 22,
  },
  content: {
    fontSize: 18,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
});