import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Api } from "../services/Api";

export const TournamentDetail = () => {
  const { tournamentId } = useParams();
  const [tournament, setTournament] = useState(null);
  const [matches, setMatches] = useState([]);
  const [fetchTournaments, setFetchTournaments] = useState(false);

  const fetchTournamentDetails = async () => {
    try {
      const response = await Api.post(`tournament/${tournamentId}`);
      const data = await response.json();

      if (response.ok) {
        const formattedMatches = data.matches.map((match) => {
          if (match.result) {
            const [resultA, resultB] = match.result.split("-").map(Number);
            return { ...match, resultA, resultB };
          }
          return match;
        });
        setTournament(data);
        setMatches(formattedMatches);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error al obtener el torneo:", error);
    }
  };

  useEffect(() => {
    fetchTournamentDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tournamentId, fetchTournaments]);

  const handleResultChange = (index, team, value) => {
    const updatedMatches = [...matches];
    updatedMatches[index][team] = value;
    setMatches(updatedMatches);
  };

  const handleSaveResults = async () => {
    const formattedMatches = matches.map((match) => {
      const resultA = parseInt(match.resultA, 10);
      const resultB = parseInt(match.resultB, 10);

      if (isNaN(resultA) || isNaN(resultB)) {
        const result = ""
        const winner = "";
        return {
          _id: match._id,
          teamA: match.teamA.uuid,
          teamB: match.teamB.uuid,
          result,
          winner,
        };
      }
      const result = `${resultA}-${resultB}`;

      let winner = "draw";
      if (resultA > resultB) {
        winner = match.teamA.uuid;
      } else if (resultA < resultB) {
        winner = match.teamB.uuid;
      }

      return {
        _id: match._id,
        teamA: match.teamA.uuid,
        teamB: match.teamB.uuid,
        result,
        winner,
      };
    });

    try {
      const response = await Api.post(`tournament/${tournamentId}/save-results`, {
        body: { matches: formattedMatches },
      });
      const data = await response.json();

      if (response.ok) {
        alert("Resultados guardados correctamente");
        setFetchTournaments(!fetchTournaments);
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
                    {match.result ? (
                      <span>{match.result.split("-")[0]}</span>
                    ) : (
                        <input
                          type="number"
                          min="0"
                          value={match.resultA || ""}
                          onChange={(e) => handleResultChange(index, "resultA", e.target.value)}
                          className="border border-gray-300 rounded p-2 w-full"
                          disabled={!!match.result}
                        />
                    )}
                  </div>
                  <div>
                    <label className="block text-sm">Resultado {match.teamB.name}</label>
                    {match.result ? (
                      <span>{match.result.split("-")[1]}</span>
                    ) : (
                        <input
                          type="number"
                          min="0"
                          value={match.resultB || ""}
                          onChange={(e) => handleResultChange(index, "resultB", e.target.value)}
                          className="border border-gray-300 rounded p-2 w-full"
                          disabled={!!match.result}
                        />
                    )}
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
