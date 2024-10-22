import { Text, View } from "react-native";
import FormTitle from "../components/FormTitle";
import styles from "../lib/styles";
import { useEffect, useState } from "react";
import { Api } from "../lib/api";

export default function Tournament({ route }) {
  const [tournament, setTournament] = useState({});
  const [teams, setTeams] = useState([]);

  const loadTeams = async () => {
    const allTeams = await Api.get('team').then(res => res.json());
    setTeams(allTeams);
  };

  const loadTournament = async () => {
    const data = await Api.post(`tournament/${route.params.tournamentId}`).then(res => res.json());
    setTournament(data);
  };

  useEffect(() => {
    loadTeams();
    loadTournament();
  }, []);


  const getTeamName = (teamUuid) => {
    const team = teams.find(t => t.uuid === teamUuid);
    return team ? team.name : teamUuid;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalles del Torneo</Text>
      <Text style={styles.userText}>Nombre del Torneo: {tournament.name}</Text>
      <Text style={styles.userText}>Descripción: {tournament.description || 'Sin descripción'}</Text>

      <Text style={styles.userText}>Equipos participantes: {tournament.teams ? tournament.teams.length : 0}</Text>

      {tournament.teams && tournament.teams.length > 0 && (
        <Text style={styles.userText}>Lista de Equipos: {tournament.teams.map(getTeamName).join(', ')}</Text>
      )}

      <Text style={styles.userText}>Partidos jugados: {tournament.matches ? tournament.matches.length : 0}</Text>

      {tournament.matches && tournament.matches.map((match, index) => (
        <View key={index} style={styles.listItem}>
          <Text>Partido {index + 1}:</Text>

          <Text>{getTeamName(match.teamA.name) + ' vs ' + getTeamName(match.teamB.name)}</Text>

          <Text>Resultado: {match.result || 'Sin resultado'}</Text>
          <Text>Ganador: {getTeamName(match.winner) || 'No definido'}</Text>
        </View>
      ))}
    </View>
  );
}
