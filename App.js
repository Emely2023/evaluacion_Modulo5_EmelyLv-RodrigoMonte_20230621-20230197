// App.js
import React, { useEffect, useState, useCallback } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import Navigation from "./src/navigation/Navigation";

// Evita que el splash se oculte automáticamente
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const prepareApp = async () => {
      try {
        // Simula carga de datos o Firebase
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppReady(true);
      }
    };

    prepareApp();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appReady) {
      await SplashScreen.hideAsync();
    }
  }, [appReady]);

  if (!appReady) {
    return (
      <View style={styles.splashContainer}>
        <Image source={require("./assets/SplashScreen.jpg")} style={styles.logo} />
        <Text style={styles.splashText}>Cargando app...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Navigation />
    </View>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: 20,
  },
  splashText: {
    fontSize: 18,
    color: "#555",
  },
});
