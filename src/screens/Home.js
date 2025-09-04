import React, { useEffect, useState } from "react";
import { View, Text, Button, ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { auth, database } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Feather } from "@expo/vector-icons";

export default function HomeScreen({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const docRef = doc(database, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            console.log("No hay datos del usuario");
          }
        } catch (e) {
          console.log("Error al obtener datos del usuario:", e);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    navigation.replace("Login");
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>¡Bienvenido, {userData?.fullName || "usuario"}!</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Feather name="user" size={28} color="black" />
        </TouchableOpacity>
      </View>

      <Button title="Cerrar sesión" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  welcome: { fontSize: 20, fontWeight: "bold" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
