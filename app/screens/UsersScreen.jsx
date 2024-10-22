import FormTitle from "../components/FormTitle";
import { Button, FlatList, View } from "react-native";
import styles from "../lib/styles";
import { useEffect, useState } from "react";
import { Text } from "react-native";
import { Api } from "../lib/api";



export default function Users({ navigation }) {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const data = await Api.get('user').then(res => res.json());
    setUsers(data);
  }

  useEffect(() => {
    loadUsers()
  }, [])


  const viewUser = (userId) => {
    navigation.navigate('User', { userId });
  }

  return (
    <View style={styles.container}>
      <FormTitle>Lista de usuarios</FormTitle>
      <FlatList style={{ width: '100%' }} data={users} key={user => user.uuid} renderItem={({ item }) => (
        <View style={styles.listItem}>
          <Text style={styles.userText}>Usuario: {item.username}</Text>
          <Text style={styles.userText}>Nombre: {item.displayName}</Text>
          <Text style={styles.userText}>Roles: {item.roles}</Text>
          <Text style={styles.userText}>Habilitado: {item.isEnabled ? 'Si' : 'No'}</Text>
          <Button style={styles.button}title="Ver" onPress={() => viewUser(item.uuid)} />
        </View>
      )} />
    </View>
  );
}