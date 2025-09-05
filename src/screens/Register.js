import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
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
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(database, "users", user.uid), {
        email,
        fullName,
        graduationYear: gradYear,
        degree,
        createdAt: new Date(),
      });

      Alert.alert("Registrado Correctamente", "Se ha registrado con éxito.");
      navigation.navigate("Login");
    } catch (e) {
      console.log(e);
      setError(e.message);
      Alert.alert("Error al registrar", e.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crear Cuenta</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput
        placeholder="Nombre completo"
        value={fullName}
        onChangeText={setFullName}
        style={styles.input}
        placeholderTextColor="#aaa"
      />
      <TextInput
        placeholder="Año de graduación"
        value={gradYear}
        onChangeText={setGradYear}
        style={styles.input}
        keyboardType="numeric"
        placeholderTextColor="#aaa"
      />
      <TextInput
        placeholder="Título universitario"
        value={degree}
        onChangeText={setDegree}
        style={styles.input}
        placeholderTextColor="#aaa"
      />
      <TextInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        placeholderTextColor="#aaa"
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#aaa"
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>

      <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
        ¿Ya tienes cuenta? <Text style={styles.linkBold}>Inicia sesión</Text>
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingVertical: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#333",
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    backgroundColor: "#4A90E2",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  link: {
    marginTop: 20,
    textAlign: "center",
    color: "#666",
    fontSize: 14,
  },
  linkBold: {
    color: "#4A90E2",
    fontWeight: "bold",
  },
  error: {
    color: "#ff4d4d",
    marginBottom: 10,
    textAlign: "center",
  },
});
