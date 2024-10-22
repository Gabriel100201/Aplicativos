import FormTitle from "../components/FormTitle";
import { Button, FlatList, View } from "react-native";
import styles from "../lib/styles";
import { useEffect, useState } from "react";
import { Text } from "react-native";
import { Api } from "../lib/api";

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
    <View style={styles.container}>
      <FormTitle>Lista de Torneos</FormTitle>
      <FlatList
        style={{ width: '100%' }}
        data={tournaments}
        keyExtractor={tournament => tournament.uuid}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>Nombre del torneo: {item.name}</Text>
            <Text>Descripción: {item.description || 'Sin descripción'}</Text>
            <Text>Equipos participantes: {item.teams.length}</Text>
            <Button title="Ver" onPress={() => viewTournament(item.uuid)} />
          </View>
        )}
      />
    </View>
  );
}
