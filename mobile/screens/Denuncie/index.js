import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import CustomButton from "../../components/CustomButton";
import { useForm, Controller } from "react-hook-form";
import validator from "validator";
import { TextInput } from "react-native";
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  useFonts,
  Poppins_300Light,
} from "@expo-google-fonts/poppins";
const Denuncie = () => {
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
  const onSubmit = async (data) => {
    const { email, password } = data;
    console.log(data);
    setTimeout(() => {
      reset({
        email: "",
        password: "",
      });
    }, 2000);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.title}>Denuncia</Text>
          <View style={styles.formGroup}>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Nome</Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.input, errors?.name && styles.inputError]}
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                  />
                )}
                name="name"
                rules={{
                  required: true,
                }}
              />
              {errors?.name?.type === "required" && (
                <Text style={styles.errorMessage}>
                  Nome não pode estar vazio!
                </Text>
              )}
            </View>
            <Text style={styles.label}>R.A</Text>
            <View style={{ flex: 1 }}>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.input, errors?.ra && styles.inputError]}
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                  />
                )}
                name="ra"
                rules={{
                  required: true,
                  minLength: 7,
                }}
              />
              {errors?.ra?.type === "required" && (
                <Text style={styles.errorMessage}>
                  R.A não pode estar vazia!
                </Text>
              )}
              {errors?.ra?.type === "minLength" && (
                <Text style={styles.errorMessage}>
                  R.A não pode ter menos de 9 caracteres!
                </Text>
              )}
            </View>
            <View style={{ flex: 1 }}>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.input, errors?.ra && styles.inputError]}
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                  />
                )}
                name="ra"
                rules={{
                  required: true,
                  minLength: 7,
                }}
              />
              {errors?.ra?.type === "required" && (
                <Text style={styles.errorMessage}>
                  R.A não pode estar vazia!
                </Text>
              )}
              {errors?.ra?.type === "minLength" && (
                <Text style={styles.errorMessage}>
                  R.A não pode ter menos de 9 caracteres!
                </Text>
              )}
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <CustomButton title={"Entrar"} onPress={handleSubmit(onSubmit)} />
            </View>
          </View>
        </View>
        <CustomButton
          title={"Voltar"}
          // onPress={navigation.goBack()}
          size={140}
        />
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
    height: "85%",
    width: "90%",
    borderRadius: 50,
    borderColor: "#C2C2C2",
    alignItems: "center",
    padding: 22,
  },
  title: {
    fontSize: 33,
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
    borderRadius: 30,
    color: "#fff",
    borderColor: "#495F7E",
    fontSize: 18,
    fontFamily: "Poppins_400Regular",
  },
  label: {
    marginTop: 5,
    fontSize: 27,
    fontFamily: "Poppins_400Regular",
  },
  inputError: {
    borderWidth: 1.6,
    borderColor: "red",
  },
  errorMessage: {
    color: "red",
    fontFamily: "Poppins_300Light",
    fontSize: 19,
  },
  textFooter: {
    fontSize: 19,
    fontFamily: "Poppins_400Regular",
    marginTop: 4,
  },
});

export default Denuncie;
