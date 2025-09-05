// screens/RegisterScreen.js
import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, database } from "../config/firebase";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [gradYear, setGradYear] = useState("");
  const [degree, setDegree] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (!email || !password || !fullName || !gradYear || !degree) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Guardar en Firestore
      await setDoc(doc(database, "users", user.uid), {
        email: email,
        fullName: fullName,
        graduationYear: gradYear,
        degree: degree,
        createdAt: new Date(),
      });

      navigation.navigate("Login");
    } catch (e) {
      console.log(e);
      setError(e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Registro</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput placeholder="Nombre completo" value={fullName} onChangeText={setFullName} style={styles.input} />
      <TextInput placeholder="Año de graduación" value={gradYear} onChangeText={setGradYear} style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="Título universitario" value={degree} onChangeText={setDegree} style={styles.input} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <Button title="Registrar" onPress={handleRegister} />
      <Text onPress={() => navigation.navigate("Login")}>¿Ya tienes cuenta? Inicia sesión</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  input: { borderWidth: 1, marginBottom: 10, padding: 8, borderRadius: 4 },
  error: { color: "red", marginBottom: 10 },
});
