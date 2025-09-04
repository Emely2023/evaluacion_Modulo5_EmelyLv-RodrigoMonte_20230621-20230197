// screens/ProfileScreen.js
import React, { useEffect, useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, Alert } from "react-native";
import { auth, database } from "../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function ProfileScreen({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [gradYear, setGradYear] = useState("");
  const [degree, setDegree] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const docRef = doc(database, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      setFullName(data.fullName || "");
      setGradYear(data.graduationYear || "");
      setDegree(data.degree || "");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleUpdate = async () => {
    const user = auth.currentUser;
    
    if (!user) return;

    const docRef = doc(database, "users", user.uid);
    await updateDoc(docRef, {
      fullName,
      graduationYear: gradYear,
      degree,
    });

    Alert.alert("Datos actualizados");
    navigation.goBack();
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar perfil</Text>
      <TextInput placeholder="Nombre completo" value={fullName} onChangeText={setFullName} style={styles.input} />
      <TextInput placeholder="Año de graduación" value={gradYear} onChangeText={setGradYear} keyboardType="numeric" style={styles.input} />
      <TextInput placeholder="Título universitario" value={degree} onChangeText={setDegree} style={styles.input} />
      <Button title="Guardar cambios" onPress={handleUpdate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, marginBottom: 10, padding: 8, borderRadius: 4 },
});
