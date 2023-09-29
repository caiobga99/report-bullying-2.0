import { StyleSheet, Text, View } from "react-native";

export default function Login() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Login Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "85%",
    width: "100%",
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
});
