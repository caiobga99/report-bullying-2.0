import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "../../components/CustomButton";
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  useFonts,
  Poppins_300Light,
} from "@expo-google-fonts/poppins";
import api from "../../lib/axios";
import showToast from "../../components/Toast";
import Loading from "../../components/Loading";
import { useIsFocused } from "@react-navigation/native";
import useTema from "../../common/Tema";
const Resposta = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();
  const { id_denuncia, id_usuario } = route.params;
  const getRespostas = () => {
    setIsLoading(true);
    console.log(id_usuario);
    api
      .get(`/resposta/${id_denuncia}/${id_usuario}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.length <= 0) {
          showToast(
            "Ocorreu um erro ao criar sua resposta, por favor tente novamente"
          );
          setData(
            [
              {
                conselho:
                  "Desculpe, não foi possivel gerar uma resposta para sua denuncia, por favor tente novamente!",
              },
            ][0]
          );
          setIsLoading(false);
          return;
        }
        setData(res.data[0]);
        console.log(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (isFocused) {
      getRespostas();
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
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View
        style={[
          styles.container,
          { backgroundColor: tema === "dark" ? "#fff" : "#000" },
        ]}
      >
        {isLoading ? (
          <>
            <Loading background={tema === "dark" ? "#fff" : "#000"} />
          </>
        ) : (
          <>
            <View style={styles.box}>
              <Text style={styles.text}>{data.conselho}</Text>
            </View>
            <CustomButton
              title={"Voltar"}
              onPress={() => navigation.goBack()}
              size={140}
            />
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#D9D9D9",
  },
  box: {
    borderWidth: 3,
    backgroundColor: "#D9D9D9",
    minHeight: "82%",
    height: "auto",
    width: "90%",
    borderRadius: 50,
    borderColor: "#C2C2C2",
    alignItems: "center",
    padding: 25,
  },
  text: {
    fontSize: 18,
    fontFamily: "Poppins_400Regular",
  },
});

export default Resposta;
