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

export default function Painel({ navigation }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();
  const getDenuncias = () => {
    setIsLoading(true);
    api
      .get("/denuncias")
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
        <>
          <Text
            style={[styles.text, { color: tema === "light" ? "#fff" : "#000" }]}
          >
            Total de {data.length} denuncias!
          </Text>
          <FlatList
            style={{ flex: 1 }}
            data={data}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <Denuncia
                titulo={item.titulo}
                mensagem={item.mensagem}
                email={item.email}
                onPress={() =>
                  navigation.push("Resposta", {
                    id_denuncia: item.id_denuncia,
                    id_usuario: item.id_usuario,
                  })
                }
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </>
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
          title="Voltar"
          size={120}
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
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
