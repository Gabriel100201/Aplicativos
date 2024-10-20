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
      <FormTitle>Editar un usuario</FormTitle>
      <Text style={styles.text}>Nombre: {user.displayName}</Text>
      <Text style={styles.text}>UserName: {user.username}</Text>
      <Text style={styles.text}>Roles: {user.roles}</Text>
      <Text style={styles.text}>Hablitado: {user.isEnabled ? 'Si' : 'No'}</Text>
    </View>
  );
}