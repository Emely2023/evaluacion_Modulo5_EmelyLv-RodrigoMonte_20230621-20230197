//using https://retool.com/api-generator#iframe-section

//la siguiente direccion: https://retoolapi.dev/zZhXYF/movil

/*
información de la api
{
id: 1,
edad: 84,
correo: "-",
nombre: "Filippa Gwillim"
},
*/
import React, { useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  Alert,
} from "react-native";

import CardUser from "../components/UserCard";

import useFetchUser from "../hooks/useUser";
import { useFocusEffect } from "@react-navigation/native";

const ShowUser = ({ navigation }) => {
  const { users, loading, fetchUsers, deleteUser } = useFetchUser();

  // Se ejecuta cada vez que esta pantalla se enfoca
  useFocusEffect(
    useCallback(() => {
      fetchUsers();
    }, [])
  );

  const handleEdit = (user) => {
    navigation.navigate("AddUser", { user });
  };
  const handleDelete = (user) => {
    Alert.alert(
      "¿Estás seguro?",
      "Esta acción no se puede deshacer.",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sí, continuar",
          onPress: () => deleteUser(user.id),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Lista de Usuarios</Text>
      <Text style={styles.subtitle}>
        Consulta los usuarios registrados desde la API
      </Text>

      {!loading && (
        <Text style={styles.counterText}>
          Total de usuarios: {users.length}
        </Text>
      )}

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#5C3D2E"
          style={{ marginTop: 20 }}
        />
      ) : (
        <FlatList
          data={users}
          keyExtractor={(user) => user.id.toString()}
          renderItem={({ item }) => (
            <CardUser user={item} handleEdit={handleEdit} deleteUser={handleDelete} />
          )}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB", // fondo claro y limpio
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  listContainer: {
    paddingBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1F2937", // gris oscuro moderno
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#6B7280", // gris medio
    textAlign: "center",
    marginBottom: 12,
  },
  counterText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    textAlign: "center",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    marginVertical: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#E5E7EB", // borde sutil
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    color: "#4B5563",
    marginBottom: 6,
  },
});

export default ShowUser;
