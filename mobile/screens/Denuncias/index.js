import { StyleSheet, Text, View, FlatList, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import Denuncia from "../../components/Denuncia";
import CustomButton from "../../components/CustomButton";
import api from "../../lib/axios";

export default function Denuncias() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    api
      .get("/denuncia")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <>
          <Text>Loading...</Text>
        </>
      ) : (
        <FlatList
          style={{ flex: 1 }}
          data={data}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Denuncia ra={item.RA} mensagem={item.mensagem} />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
      <View style={styles.foot}>
        <CustomButton title="Fazer Denuncia" size={120} />
        <CustomButton title="FAQ" size={120} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  foot: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "space-around",
  },
});
