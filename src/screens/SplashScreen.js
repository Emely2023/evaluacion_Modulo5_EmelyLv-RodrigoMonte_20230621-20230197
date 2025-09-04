// SplashScreen.js
import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";

export default function SplashScreen({ onFinish }) {
  useEffect(() => {
    // Simula carga, por ejemplo cargar Firebase o assets
    const timer = setTimeout(() => {
      onFinish(); // Avisar que terminó la carga para navegar
    }, 2000); // 2 segundos de splash

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/SplashScreen.jpg")} // tu logo o cualquier imagen
        style={styles.logo}
      />
      <Text style={styles.text}>Cargando app...</Text>
      <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 180,
    height: 180,
    resizeMode: "contain",
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    color: "#333",
  },
});
