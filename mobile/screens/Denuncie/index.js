import { View, Text, StyleSheet, ScrollView, StatusBar } from "react-native";
import React, { useState } from "react";
import CustomButton from "../../components/CustomButton";
import { useForm, Controller } from "react-hook-form";
import { TextInput } from "react-native";
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
const Denuncie = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_300Light,
  });
  if (!fontsLoaded) {
    return null;
  }

  const { token } = useToken();

  const onSubmit = async (data) => {
    setLoading(true);
    api
      .post(`/denuncias?_token=${token}`, data)
      .then((res) => {
        setLoading(false);
        showToast(res.data);
        setTimeout(() => {
          navigation.goBack();
        }, 2500);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        {loading ? (
          <>
            <Text style={styles.textFooter}>Criando sua resposta...</Text>
            <Loading />
          </>
        ) : (
          <>
            <View style={styles.box}>
              <Text style={styles.title}>Denuncia</Text>
              <View style={styles.formGroup}>
                <View style={{ flex: 1 }}>
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={[
                          styles.input,
                          errors?.titulo && styles.inputError,
                        ]}
                        onBlur={onBlur}
                        onChangeText={(value) => onChange(value)}
                        value={value}
                        placeholder="Titulo"
                        placeholderTextColor={"rgba(0, 0, 0, 0.4)"}
                      />
                    )}
                    name="titulo"
                    rules={{
                      required: true,
                    }}
                  />
                  {errors?.titulo?.type === "required" && (
                    <Text style={styles.errorMessage}>
                      Titulo não pode estar vazia!
                    </Text>
                  )}
                </View>
                <View style={{ flex: 1 }}>
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={[
                          styles.textArea,
                          errors?.mensagem && styles.inputError,
                        ]}
                        onBlur={onBlur}
                        onChangeText={(value) => onChange(value)}
                        value={value}
                        placeholder="Mensagem"
                        placeholderTextColor={"rgba(0, 0, 0, 0.4)"}
                        multiline={true}
                      />
                    )}
                    name="mensagem"
                    rules={{
                      required: true,
                    }}
                  />
                  {errors?.mensagem?.type === "required" && (
                    <Text style={styles.errorMessage}>
                      Mensagem não pode estar vazia!
                    </Text>
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  <CustomButton
                    title={"Enviar Denuncia"}
                    onPress={handleSubmit(onSubmit)}
                    size={250}
                  />
                </View>
              </View>
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
  title: {
    fontSize: 29,
    textAlign: "center",
    fontFamily: "Poppins_600SemiBold",
  },
  formGroup: {
    width: "100%",
    height: "100%",
    justifyContent: "space-around",
  },
  input: {
    height: 60,
    width: "100%",
    borderWidth: 1,
    backgroundColor: "#495F7E",
    padding: 3,
    borderRadius: 10,
    color: "#fff",
    borderColor: "#495F7E",
    fontSize: 18,
    fontFamily: "Poppins_400Regular",
  },
  textArea: {
    height: 210,
    width: "100%",
    borderWidth: 1,
    backgroundColor: "#495F7E",
    padding: 5,
    borderRadius: 10,
    color: "#fff",
    borderColor: "#495F7E",
    fontSize: 18,
    fontFamily: "Poppins_400Regular",
    flexWrap: "wrap",
    textAlignVertical: "top",
  },
  inputError: {
    borderWidth: 1.6,
    borderColor: "red",
  },
  errorMessage: {
    color: "red",
    fontFamily: "Poppins_300Light",
    fontSize: 17,
  },
  textFooter: {
    fontSize: 19,
    fontFamily: "Poppins_400Regular",
    marginTop: 4,
  },
});

export default Denuncie;
