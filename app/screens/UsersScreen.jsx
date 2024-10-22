import FormTitle from "../components/FormTitle";
import { FlatList, TouchableOpacity, View } from "react-native";
import styles from "../lib/styles";
import { useEffect, useState } from "react";
import { Text } from "react-native";
import { Api } from "../lib/api";
import Background from "../components/Background";

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
    <Background>
    <View style={styles.container}>
      <FormTitle>Lista de usuarios</FormTitle>
        <FlatList
          style={{ width: '100%' }}
          data={users || []}
          keyExtractor={user => user.uuid || String(Math.random())}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text style={styles.userText}>
                <Text style={{ fontWeight: 'bold' }}>Usuario: </Text>{item.username}
              </Text>
              <Text style={styles.userText}>
                <Text style={{ fontWeight: 'bold' }}>Nombre: </Text>{item.displayName}
              </Text>
              <Text style={styles.userText}>
                <Text style={{ fontWeight: 'bold' }}>UserName: </Text>{item.username}
              </Text>
              <Text style={styles.userText}>
                <Text style={{ fontWeight: 'bold' }}>Roles: </Text>{item.roles}
              </Text>
              <Text style={styles.userText}>
              <Text style={{ fontWeight: 'bold' }}>Habilitado: </Text>{item.isEnabled ? 'Sí' : 'No'}
            </Text>
            <TouchableOpacity style={styles.buttonList} onPress={() => viewUser(item.uuid)}>
              <Text style={styles.text}>VER</Text>
            </TouchableOpacity>
          </View>
          )}
        />
    </View>
    </Background>
  );
}  