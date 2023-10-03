import { StyleSheet, Text, View, FlatList, Dimensions } from "react-native";
import React from "react";
import Denuncia from "../../components/Denuncia";
import CustomButton from "../../components/CustomButton";

export default function Denuncias() {
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
      <FlatList
        style={{ flex: 1 }}
        data={DATA}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Denuncia nome={item.nome} ra={item.ra} mensagem={item.mensagem} />
        )}
        keyExtractor={(item) => item.id}
      />

      <View style={styles.foot}>
        <CustomButton title="Fazer Denuncia" size={120} />
        <CustomButton title="FAQ" size={120} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  foot: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "space-around",
  },
});
