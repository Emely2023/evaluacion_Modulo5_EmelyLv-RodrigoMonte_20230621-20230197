import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import useFetchUser from "../hooks/useUser";

const AddUser = ({ navigation }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState(null); // Nuevo estado para el usuario recibido

  const {
    name,
    age,
    email,
    setName,
    setAge,
    setEmail,
    createUser,
    cleanState,
  } = useFetchUser();

  const route = useRoute();

  useEffect(() => {
    const userFromParams = route.params?.user;

    if (userFromParams) {
      setName(userFromParams.name || "");
      setAge(String(userFromParams.age || ""));
      setEmail(userFromParams.email || "");
      setEditingUser(userFromParams);
      setIsEditing(true);
    } else {
      setEditingUser(null);
      setIsEditing(false);
    }
  }, [route.params]);

  const irShowUser = () => {
    navigation.navigate("ShowUser");
  };

  const cleanForm = () => {
    cleanState();
    setEditingUser(null);
    setIsEditing(false);
    irShowUser();
  };

  const handleSaveform = () => {
    createUser(editingUser);
    setIsEditing(false);
    irShowUser();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        {isEditing ? "Editar Usuario" : "Agregar Usuario"}
      </Text>
      <Text style={styles.subtitle}>
        {isEditing
          ? "Modifica la información del usuario seleccionado"
          : "Ingresa la información del nuevo usuario"}
      </Text>

      <View style={styles.formCard}>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#A1866F"
        />
        <TextInput
          style={styles.input}
          placeholder="Edad"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
          placeholderTextColor="#A1866F"
        />
        <TextInput
          style={styles.input}
          placeholder="Correo"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholderTextColor="#A1866F"
        />

        <TouchableOpacity style={styles.button} onPress={handleSaveform}>
          <Text style={styles.buttonText}>
            {isEditing ? "Editar" : "Guardar"}
          </Text>
        </TouchableOpacity>

        {isEditing && (
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: "#B00020", marginTop: 10 },
            ]}
            onPress={cleanForm}
          >
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F9FAFB",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#3C2A21",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#7B5E57",
    textAlign: "center",
    marginBottom: 25,
  },
  formCard: {
    width: "100%",
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D3B8AE",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "#FFF",
    color: "#333",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#5C3D2E",
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default AddUser;
