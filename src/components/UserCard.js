import { StyleSheet, Text, View } from "react-native";
import Buttons from "./Buttons";

export default CardUser = ({ user, deleteUser, handleEdit }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{user.name}</Text>
      <Text style={styles.cardText}>Edad: {user.age}</Text>
      <Text style={styles.cardText}>Correo: {user.email}</Text>
      <View style={styles.buttonRow}>
        <Buttons text="Eliminar" action={() => deleteUser(user)} />
        <Buttons text="Editar usuario" action={() => handleEdit(user)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F6",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around", // o "center" si prefieres
    marginTop: 16,
  },
  listContainer: {
    paddingBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#2C2C2E",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#6C6C70",
    textAlign: "center",
    marginBottom: 12,
  },
  counterText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#444",
    textAlign: "center",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    marginVertical: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1C1C1E",
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    color: "#3A3A3C",
    marginBottom: 6,
  },
});
