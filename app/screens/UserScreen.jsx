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
  <View style={styles.containerMenu}>
    <Text style={styles.title}>Informacion del usuario</Text>
    <Text style={styles.userText}>
      <Text style={{ fontWeight: 'bold' }}>Nombre: </Text>{user.displayName}
    </Text>
    <Text style={styles.userText}>
      <Text style={{ fontWeight: 'bold' }}>UserName: </Text>{user.username}
    </Text>
    <Text style={styles.userText}>
      <Text style={{ fontWeight: 'bold' }}>Roles: </Text>{user.roles}
    </Text>
    <Text style={styles.userText}>
      <Text style={{ fontWeight: 'bold' }}>Habilitado: </Text>{user.isEnabled ? 'Si' : 'No'}
    </Text>
  </View>
</View>

  );
}