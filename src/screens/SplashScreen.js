import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
} from "react-native";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ImageBackground
      source={require("../../assets/SplashScreen.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.text}>Cargando app...</Text>
        <ActivityIndicator
          size="large"
          color="#ffffff"
          style={{ marginTop: 20 }}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)", // semitransparente para mejor contraste
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    color: "#ffffff",
    fontWeight: "bold",
  },
});
