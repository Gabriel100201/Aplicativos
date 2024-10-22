import FormTitle from "../components/FormTitle";
import { FlatList, TouchableOpacity, View } from "react-native";
import styles from "../lib/styles";
import { useEffect, useState } from "react";
import { Text } from "react-native";
import { Api } from "../lib/api";
import Background from "../components/Background";

export default function TournamentsScreen({ navigation }) {
  const [tournaments, setTournaments] = useState([]);

  const loadTournaments = async () => {
    const data = await Api.get('tournament').then(res => res.json());
    setTournaments(data);
  };

  useEffect(() => {
    loadTournaments();
  }, []);

  const viewTournament = (tournamentId) => {
    navigation.navigate('Tournament', { tournamentId });
  };

  return (
    <Background>
    <View style={styles.container}>
      <FormTitle>Lista de Torneos</FormTitle>
      <FlatList
        style={{ width: '100%' }}
          data={tournaments || []}
        keyExtractor={tournament => tournament.uuid}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.userText}>
              <Text style={{ fontWeight: 'bold' }}>Nombre del torneo: </Text>{item.name}
            </Text>
            <Text style={styles.userText}>
              <Text style={{ fontWeight: 'bold' }}>Descripción: </Text>{item.description || 'Sin descripción'}
            </Text>
            <Text style={styles.userText}>
              <Text style={{ fontWeight: 'bold' }}>Equipos participantes: </Text>{item.teams?.length || 0}
            </Text>
            <TouchableOpacity
              style={styles.buttonList}
              onPress={() => viewTournament(item.uuid)}>
              <Text style={styles.text}>VER</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
    </Background>
  );
}