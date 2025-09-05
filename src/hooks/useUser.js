import { useState, useEffect } from "react";
import { Alert } from "react-native";

const useFetchUser = () => {
  // Estados del formulario
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");

  // Estados para la lista de user
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const cleanState = () => {
    // Limpiar campos y recargar lista
    setName("");
    setAge("");
    setEmail("");
  };

  // Obtener users desde la API
  const fetchUsers = async () => {
    try {
      const response = await fetch("https://retoolapi.dev/qt829x/reactmovil");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error al cargar user:", error);
    } finally {
      setLoading(false);
    }
  };

  // Guardar nuevo usuario en la API o editar
  const createUser = async (user) => {
    if (!name || !age || !email) {
      Alert.alert("Error", "Por favor, completa todos los campos");
      return;
    }

    const userData = {
      name,
      age: parseInt(age),
      email,
    };

    try {
      let response;

      if (user?.id) {
        // 📝 Editar usuario
        response = await fetch(
          `https://retoolapi.dev/qt829x/reactmovil/${user.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          }
        );

        if (response.ok) {
          Alert.alert("Éxito", "Usuario actualizado correctamente");
        } else {
          Alert.alert("Error", "No se pudo actualizar el usuario");
        }
      } else {
        // Crear nuevo usuario
        response = await fetch("https://retoolapi.dev/qt829x/reactmovil", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        if (response.ok) {
          Alert.alert("Éxito", "Usuario creado correctamente");
        } else {
          Alert.alert("Error", "No se pudo crear el usuario");
        }
      }
      // Limpiar campos y recargar lista
      cleanState();
      fetchUsers();
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Ocurrió un error al guardar el usuario");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(
        `https://retoolapi.dev/qt829x/reactmovil/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        Alert.alert("Error al eliminar");
        return;
      }
      Alert.alert("Usuario eliminado correctamente");
      fetchUsers();
    } catch (error) {
      console.log("hubo un error al eliminar", error);
    } finally {
      setLoading(false);
    }
  };

  // Ejecutar al cargar componente
  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    name,
    setName,
    age,
    setAge,
    email,
    setEmail,
    createUser,
    users,
    loading,
    fetchUsers,
    deleteUser,
    cleanState,
  };
};

export default useFetchUser;
