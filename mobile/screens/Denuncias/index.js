import { StyleSheet, Text, View, FlatList, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import Denuncia from "../../components/Denuncia";
import CustomButton from "../../components/CustomButton";
import Loading from "../../components/Loading";
import api from "../../lib/axios";
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  useFonts,
  Poppins_300Light,
} from "@expo-google-fonts/poppins";
import { useIsFocused } from "@react-navigation/native";
import useTema from "../../common/Tema";

export default function Denuncias({ navigation }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();
  const getDenuncias = () => {
    setIsLoading(true);
    api
      .get("/denuncia")
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (isFocused) {
      getDenuncias();
    }
  }, [isFocused]);
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_300Light,
  });
  if (!fontsLoaded) {
    return null;
  }
  const { tema } = useTema();
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: tema === "dark" ? "#fff" : "#000",
        },
      ]}
    >
      {isLoading ? (
        <>
          <Loading background={tema === "dark" ? "#fff" : "#000"} />
        </>
      ) : data.length <= 0 ? (
        <View style={styles.containerText}>
          <Text
            style={[styles.text, { color: tema === "light" ? "#fff" : "#000" }]}
          >
            Nenhuma Denuncia foi Feita Ainda😊
          </Text>
        </View>
      ) : (
        <FlatList
          style={{ flex: 1 }}
          data={data}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Denuncia
              titulo={item.titulo}
              mensagem={item.mensagem}
              onPress={() =>
                navigation.push("Resposta", { id: item.id_denuncia })
              }
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}

      <View
        style={[
          styles.foot,
          {
            backgroundColor: tema === "dark" ? "#fff" : "#000",
          },
        ]}
      >
        <CustomButton
          title="Home"
          size={120}
          onPress={() => navigation.push("Home")}
        />
        <CustomButton
          title="Fazer Denuncia"
          size={120}
          onPress={() => navigation.push("Denuncie")}
        />
        <CustomButton
          title="Ajuda"
          size={120}
          onPress={() => navigation.push("FAQ")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "98%",
    width: "100%",
    alignItems: "center",
  },
  foot: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "space-around",
  },
  containerText: {
    height: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontFamily: "Poppins_600SemiBold",
  },
});
