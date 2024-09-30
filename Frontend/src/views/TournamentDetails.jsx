import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Api } from "../services/Api";

export const TournamentDetail = () => {
  const { tournamentId } = useParams(); // Obtener el ID del torneo desde la URL
  const [tournament, setTournament] = useState(null);
  const [matches, setMatches] = useState([]);

  // Función para obtener los detalles del torneo desde el backend
  const fetchTournamentDetails = async () => {
    try {
      const response = await Api.post(`tournament/${tournamentId}`);
      const data = await response.json();


      if (response.ok) {
        setTournament(data);
        setMatches(data.matches); // Suponiendo que la respuesta incluye los partidos
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error al obtener el torneo:", error);
    }
  };

  // Obtener los detalles del torneo al montar el componente
  useEffect(() => {
    fetchTournamentDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tournamentId]);

  const handleResultChange = (index, team, value) => {
    const updatedMatches = [...matches];
    updatedMatches[index][team] = value; // Actualizar los resultados
    setMatches(updatedMatches);
  };

  const handleSaveResults = async () => {
    // Formatear los resultados en el formato deseado
    const formattedMatches = matches.map((match) => {
      const resultA = parseInt(match.resultA, 10);
      const resultB = parseInt(match.resultB, 10);

      // Definir el formato del resultado (por ejemplo, "1-0")
      const result = `${resultA}-${resultB}`;

      // Determinar el ganador o si fue un empate
      let winner = "draw";
      if (resultA > resultB) {
        winner = match.teamA.uuid; // Ganador es el equipo A
      } else if (resultA < resultB) {
        winner = match.teamB.uuid; // Ganador es el equipo B
      }

      return {
        _id: match._id,
        result,
        winner,
      };
    });

    try {
      // Enviar los resultados formateados al backend

      const response = await Api.post(`tournament/${tournamentId}/save-results`, {
        body: { matches: formattedMatches },
      });
      const data = await response.json();

      if (response.ok) {
        alert("Resultados guardados correctamente");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error al guardar los resultados:", error);
      alert("Ocurrió un error al guardar los resultados.");
    }
  };

  if (!tournament) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-primary-100 via-primary-200 to-primary-300">
      <div className="max-w-3xl w-full p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl text-gray-700 font-bold mb-4">
          Resultados del Torneo: {tournament.name}
        </h2>

        {matches.length === 0 ? (
          <p>No hay partidos disponibles.</p>
        ) : (
          <div className="space-y-4">
            {matches.map((match, index) => (
              <div key={index} className="border p-4 rounded-md bg-gray-100">
                <p className="mb-2">
                  <strong>{match.teamA.name}</strong> vs <strong>{match.teamB.name}</strong>
                </p>
                <div className="flex space-x-4">
                  <div>
                    <label className="block text-sm">Resultado {match.teamA.name}</label>
                    <input
                      type="number"
                      min="0"
                      value={match.resultA || ""}
                      onChange={(e) => handleResultChange(index, "resultA", e.target.value)}
                      className="border border-gray-300 rounded p-2 w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm">Resultado {match.teamB.name}</label>
                    <input
                      type="number"
                      min="0"
                      value={match.resultB || ""}
                      onChange={(e) => handleResultChange(index, "resultB", e.target.value)}
                      className="border border-gray-300 rounded p-2 w-full"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={handleSaveResults}
          className="mt-4 w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
        >
          Guardar Resultados
        </button>
      </div>
    </div>
  );
};

export default TournamentDetail;
