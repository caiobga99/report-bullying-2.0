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
import useToken from "../../common/Token";
import showToast from "../../components/Toast";
import Loading from "../../components/Loading";
import { useIsFocused } from "@react-navigation/native";
const Resposta = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();
  const { id } = route.params;
  console.log(id);
  const getRespostas = () => {
    setIsLoading(true);
    api
      .get(`/resposta/${id}`)
      .then((res) => {
        setData(res.data);
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

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        {isLoading ? (
          <>
            <Loading />
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
    backgroundColor: "#fff",
  },
  box: {
    borderWidth: 3,
    backgroundColor: "#D9D9D9",
    height: "82%",
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
