import { useEffect, useState } from "react";
import { Api } from "../services/Api";

export const TournamentsWithPositions = () => {
  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para obtener la lista de torneos
  const fetchTournaments = async () => {
    try {
      const response = await Api.get("tournament"); // Asegúrate de que este endpoint devuelve todos los torneos
      const data = await response.json();

      if (response.ok) {
        setTournaments(data);
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      console.error("Error al obtener torneos:", err);
    }
  };

  // Función para obtener la tabla de posiciones de un torneo
  const fetchPositions = async (tournamentId) => {
    setLoading(true);
    try {
      console.log(tournamentId);
      const response = await Api.post(`get-positions/${tournamentId}`);
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setPositions(data);
        setSelectedTournament(tournamentId); // Establecer el torneo seleccionado
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Obtener la lista de torneos al cargar el componente
  useEffect(() => {
    fetchTournaments();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">
        Torneos
      </h2>

      {/* Lista de torneos */}
      <div className="flex justify-center mb-6">
        <select
          className="border border-gray-300 rounded-md p-2"
          onChange={(e) => fetchPositions(e.target.value)}
        >
          <option value="">Selecciona un torneo</option>
          {tournaments.map((tournament) => (
            <option key={tournament.uuid} value={tournament.uuid}>
              {tournament.name}
            </option>
          ))}
        </select>
      </div>

      {/* Mostrar tabla de posiciones si se seleccionó un torneo */}
      {selectedTournament && (
        <>
          <h3 className="text-xl font-semibold text-gray-600 mb-4 text-center">
            Tabla de Posiciones - {tournaments.find(t => t.uuid === selectedTournament)?.name}
          </h3>

          {loading ? (
            <p className="text-center">Cargando tabla de posiciones...</p>
          ) : error ? (
            <p className="text-center text-red-500">Error: {error}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 border">Posición</th>
                    <th className="px-4 py-2 border">Equipo</th>
                    <th className="px-4 py-2 border">PJ</th>
                    <th className="px-4 py-2 border">PG</th>
                    <th className="px-4 py-2 border">PE</th>
                    <th className="px-4 py-2 border">PP</th>
                    <th className="px-4 py-2 border">GF</th>
                    <th className="px-4 py-2 border">GC</th>
                    <th className="px-4 py-2 border">Dif</th>
                    <th className="px-4 py-2 border">Puntos</th>
                  </tr>
                </thead>
                <tbody>
                  {positions.length === 0 ? (
                    <tr>
                      <td colSpan="10" className="text-center py-4">
                        No hay posiciones disponibles.
                      </td>
                    </tr>
                  ) : (
                    positions.map((team, index) => (
                      <tr key={team.team} className="text-center">
                        <td className="px-4 py-2 border">{index + 1}</td>
                        <td className="px-4 py-2 border">{team.name}</td>
                        <td className="px-4 py-2 border">{team.matches}</td>
                        <td className="px-4 py-2 border">{team.wins}</td>
                        <td className="px-4 py-2 border">{team.draws}</td>
                        <td className="px-4 py-2 border">{team.losses}</td>
                        <td className="px-4 py-2 border">{team.goalsFor}</td>
                        <td className="px-4 py-2 border">{team.goalsAgainst}</td>
                        <td className="px-4 py-2 border">{team.goalDifference}</td>
                        <td className="px-4 py-2 border">{team.points}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TournamentsWithPositions;
