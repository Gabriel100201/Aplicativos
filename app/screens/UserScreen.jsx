import { Text, View } from "react-native";
import FormTitle from "../components/FormTitle";
import styles from "../lib/styles";
import { useEffect, useState } from "react";
import { Api } from "../lib/api";

export default function User({ route }) {
  const [user, setUser] = useState([]);

  const loadUsers = async () => {
    const data = await Api.get('user', { uuid: route.params.userId }).then(res => res.json());
    setUser(data);
  }

  useEffect(() => {
    loadUsers()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar un usuario</Text>
      <Text style={styles.userText}>Nombre: {user.displayName}</Text>
      <Text style={styles.userText}>UserName: {user.username}</Text>
      <Text style={styles.userText}>Roles: {user.roles}</Text>
      <Text style={styles.userText}>Hablitado: {user.isEnabled ? 'Si' : 'No'}</Text>
    </View>
  );
}