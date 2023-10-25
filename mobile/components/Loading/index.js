import { ActivityIndicator, View } from "react-native";

export default function Loading({ background }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: background || "#fff",
      }}
    >
      <ActivityIndicator color="#49a1b8" />
    </View>
  );
}
