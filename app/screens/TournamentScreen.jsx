import { Text, View } from "react-native";
import styles from "../lib/styles";
import { useEffect, useState } from "react";
import { Api } from "../lib/api";
import Background from "../components/Background";

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
    if (teamUuid === 'draw') {
      return 'Empate';
    }
    const team = teams.find(t => t.uuid === teamUuid);
    return team ? team.name : teamUuid;
  };

  return (
    <Background>
    <View style={styles.containerTorneo}>
      <View style={styles.containerDetalleTorneo}>
        <Text style={styles.title}>Detalles del Torneo</Text>
      
        <Text style={styles.userText}>
          <Text style={{ fontWeight: 'bold' }}>Nombre del Torneo: </Text>{tournament.name}
        </Text>
        <Text style={styles.userText}>
          <Text style={{ fontWeight: 'bold' }}>Descripcion: </Text>{tournament.description || 'Sin descripción'}
        </Text>
        <Text style={styles.userText}>
          <Text style={{ fontWeight: 'bold' }}>Equipos participantes: </Text>{tournament.teams ? tournament.teams.length : 0}
        </Text>
        {tournament.teams && tournament.teams.length > 0 && (
        <Text style={styles.userText}>
          <Text style={{ fontWeight: 'bold' }}>Lista de Equipos:  </Text>{tournament.teams.map(getTeamName).join('  -  ')}
        </Text>
        )}
        <Text style={styles.userText}>
          <Text style={{ fontWeight: 'bold' }}>Partidos jugados: </Text>{tournament.matches ? tournament.matches.length : 0}
        </Text>
      </View>    
        {tournament.matches && tournament.matches.map((match, index) => (
      <View key={index} style={styles.listItem}>

        <Text style={styles.userText}>
          <Text style={{ fontWeight: 'bold' }}>Partido {index + 1} </Text>
        </Text>
        
          <Text style={styles.userText}><Text style={{ fontWeight: 'bold' }}>{getTeamName(match.teamA.name)}</Text>  vs   <Text style={{ fontWeight: 'bold' }}>{getTeamName(match.teamB.name)}</Text></Text>

        <Text style={styles.userText}>
          <Text style={{ fontWeight: 'bold' }}>Resultado: </Text>{match.result || 'Sin resultado'} 
        </Text>

        <Text style={styles.userText}>
          <Text style={{ fontWeight: 'bold' }}>Ganador: </Text> {getTeamName(match.winner) || 'No definido'} 
        </Text>
      </View>
      ))}
    </View>
    </Background>
  );
}
