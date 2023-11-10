import { StyleSheet, Text, View, ScrollView } from "react-native";
import { TextInput } from "react-native";
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  useFonts,
  Poppins_300Light,
} from "@expo-google-fonts/poppins";
import CustomButton from "../../components/CustomButton";
import { useForm, Controller } from "react-hook-form";
import validator from "validator";
import api from "../../lib/axios";
import useUser from "../../common/User";
import { useToken } from "../../common/Token";
import { CommonActions } from "@react-navigation/native";
import showToast from "../../components/Toast";
import { useEffect } from "react";
import useAnonymous from "../../common/Anonymous";
export default function Login({ navigation }) {
  const { setIsLogged, isLogged } = useUser();
  if (isLogged) {
    navigation.navigate("Home");
  }
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
  const { setViewReport, setIsAnonymous } = useAnonymous();
  const onSubmit = async (data) => {
    api.post(`/login?_token=${token}`, data).then((res) => {
      showToast(res.data);
      if (res.data === "Usuario Logado com Sucesso!") {
        setIsLogged(true);
        setViewReport(true);
        navigation.push("Home"); // navigation.dispatch(
        //   CommonActions.reset({
        //     index: 0,
        //     routes: [{ name: "Home" }],
        //   })
        // );
      } else if (res.data === "Usuario Anonimo Logado com Sucesso!") {
        setViewReport(false);
        setIsAnonymous(true);
        setIsLogged(true);
        navigation.push("Home");
      } else {
        console.log(res.data);
      }
    });
  };
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.title}>Login</Text>
          <View style={styles.formGroup}>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>E-mail</Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.input, errors?.email && styles.inputError]}
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                    textContentType="emailAddress"
                  />
                )}
                name="email"
                rules={{
                  required: true,
                  maxLength: 26,
                  validate: (val) => validator.isEmail(val),
                }}
              />
              {errors?.email?.type === "required" && (
                <Text style={styles.errorMessage}>
                  E-mail não pode estar vazio!
                </Text>
              )}
              {errors?.email?.type === "maxLength" && (
                <Text style={styles.errorMessage}>
                  E-mail não ter mais de 26 caracteres!
                </Text>
              )}
              {errors?.email?.type === "validate" && (
                <Text style={styles.errorMessage}>E-mail invalido!</Text>
              )}
            </View>
            <Text style={styles.label}>Senha</Text>
            <View style={{ flex: 1 }}>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      styles.input,
                      errors?.password && styles.inputError,
                    ]}
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                    secureTextEntry
                  />
                )}
                name="password"
                rules={{
                  required: true,
                  maxLength: 26,
                }}
              />
              {errors?.password?.type === "required" && (
                <Text style={styles.errorMessage}>
                  Senha não pode estar vazia!
                </Text>
              )}
              {errors?.password?.type === "maxLength" && (
                <Text style={styles.errorMessage}>
                  Senha não pode ter mais de 26 caracteres!
                </Text>
              )}
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <CustomButton title={"Entrar"} onPress={handleSubmit(onSubmit)} />
              <CustomButton
                title={"Anonimo"}
                onPress={() =>
                  onSubmit({
                    email: "Anonimo@gmail.com",
                    password: "Anonimo@123",
                  })
                }
              />
            </View>
          </View>
        </View>
        <Text style={styles.textFooter}>Não tem uma conta?</Text>
        <CustomButton
          title={"Cadastre-se"}
          onPress={() => navigation.navigate("Cadastro")}
          size={140}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  box: {
    borderWidth: 3,
    backgroundColor: "#D9D9D9",
    height: "80%",
    width: "90%",
    borderRadius: 50,
    borderColor: "#C2C2C2",
    alignItems: "center",
    padding: 22,
  },
  formGroup: {
    width: "100%",
    height: "100%",
    justifyContent: "space-around",
  },
  title: {
    fontSize: 33,
    textAlign: "center",
    fontFamily: "Poppins_600SemiBold",
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
    marginTop: 6,
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
    marginTop: 5,
  },
});
