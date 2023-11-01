import { Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Poppins_400Regular, useFonts } from "@expo-google-fonts/poppins";
export default function CustomButton({ title, onPress, size, fontSize }) {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <TouchableOpacity
      style={[styles.button, { width: size ? size : 100 }]}
      onPress={onPress}
    >
      <Text style={[styles.text, { fontSize: fontSize ? fontSize : 20 }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#495F7E",
    borderRadius: 20,
    margin: 10,
    height: 65,
    width: 100,
  },
  text: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
});
