import FormTitle from "../components/FormTitle";
import { Button, FlatList, View } from "react-native";
import styles from "../lib/styles";
import { useEffect, useState } from "react";
import { Text } from "react-native";

const fetchUsers = () => {
  const data = [
    {
      uuid: 1,
      username: 'admin',
      displayName: 'Administrador',
      roles: 'admin',
      isEnabled: true
    },
    {
      uuid: 2,
      username: 'user',
      displayName: 'Usuario',
      roles: 'user',
      isEnabled: true
    }
  ];
  return data;
}

export default function Users({ navigation }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const users = fetchUsers();
    setUsers(users);
  }, [])


  const viewUser = (userId) => {
    navigation.navigate('User', { userId });
  }

  return (
    <View style={{ width: '90%' }}>
      <FormTitle>Lista de usuarios</FormTitle>
      <FlatList style={{ width: '100%' }} data={users} key={user => user.uuid} renderItem={({ item }) => (
        <View style={styles.listItem}>
          <Text>Usuario: {item.username}</Text>
          <Text>Nombre: {item.displayName}</Text>
          <Text>Roles: {item.roles}</Text>
          <Text>Habilitado: {item.isEnabled ? 'Si' : 'No'}</Text>
          <Button title="Ver" onPress={() => viewUser(item.uuid)} />
        </View>
      )} />
    </View>
  );
}