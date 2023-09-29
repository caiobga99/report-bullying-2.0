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
export default function Cadastro() {
  const {
    handleSubmit,
    control,
    reset,
    watch,
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

  const watchPassword = watch("password");
  const onSubmit = async (data) => {
    const { name, email, password, ra } = data;
    console.log(data);
    setTimeout(() => {
      reset({
        name: "",
        email: "",
        ra: "",
        password: "",
        passwordConfirmation: "",
      });
    }, 2000);
  };
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.title}>Cadastre-se</Text>
          <View style={styles.formGroup}>
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
                maxLength: 26,
                minLength: 4,
              }}
            />
            {errors?.name?.type === "required" && (
              <Text style={styles.errorMessage}>
                Nome não pode estar vazio!
              </Text>
            )}
            {errors?.name?.type === "maxLength" && (
              <Text style={styles.errorMessage}>
                Nome não pode ter mais de 26 caracteres!
              </Text>
            )}
            {errors?.name?.type === "minLength" && (
              <Text style={styles.errorMessage}>
                Nome não pode ter menos de 4 caracteres!
              </Text>
            )}
            <Text style={styles.label}>R.A</Text>
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
                minLength: 9,
              }}
            />
            {errors?.ra?.type === "required" && (
              <Text style={styles.errorMessage}>R.A não pode estar vazio!</Text>
            )}
            {errors?.ra?.type === "minLength" && (
              <Text style={styles.errorMessage}>
                R.A não pode ter menos de 9 caracteres!
              </Text>
            )}
            <Text style={styles.label}>E-mail</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, errors?.email && styles.inputError]}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
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
            <Text style={styles.label}>Senha</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, errors?.password && styles.inputError]}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
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
            <Text style={styles.label}>Confirmar Senha</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[
                    styles.input,
                    errors?.passwordConfirmation && styles.inputError,
                  ]}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
              name="passwordConfirmation"
              rules={{
                required: true,
                maxLength: 26,
                validate: (value) => value === watchPassword,
              }}
            />
            {errors?.passwordConfirmation?.type === "required" && (
              <Text style={styles.errorMessage}>
                Confirmar Senha não pode estar vazia!!
              </Text>
            )}
            {errors?.passwordConfirmation?.type === "maxLength" && (
              <Text style={styles.errorMessage}>
                Confirmar Senha não pode ter mais de 26 caracteres!
              </Text>
            )}
            {errors?.passwordConfirmation?.type === "validate" && (
              <Text style={styles.errorMessage}>As senhas não conferem!</Text>
            )}
          </View>
        </View>
        <CustomButton title={"Entrar"} onPress={handleSubmit(onSubmit)} />
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
    height: "87%",
    width: "90%",
    borderRadius: 50,
    borderColor: "#C2C2C2",
    alignItems: "center",
    padding: 22,
  },
  formGroup: {
    width: "100%",
    height: "100%",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 27,
    textAlign: "center",
    fontFamily: "Poppins_600SemiBold",
  },
  input: {
    height: 40,
    width: "100%",
    borderWidth: 1,
    backgroundColor: "#495F7E",
    padding: 3,
    borderRadius: 30,
    color: "#fff",
    borderColor: "#495F7E",
  },
  label: {
    marginTop: 6,
    fontSize: 23,
    fontFamily: "Poppins_400Regular",
  },
  inputError: {
    borderWidth: 1.6,
    borderColor: "red",
  },
  errorMessage: {
    color: "red",
    fontFamily: "Poppins_300Light",
    fontSize: 15,
  },
});
