import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "../services/Api";

export const TournamentsList = () => {
  const [tournaments, setTournaments] = useState([]);
  const navigate = useNavigate();

  const fetchTournaments = async () => {
    try {
      const response = await Api.get('tournament');
      const data = await response.json();

      if (response.ok) {
        setTournaments(data);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error al obtener los torneos:", error);
    }
  };

  // Obtener los torneos al montar el componente
  useEffect(() => {
    fetchTournaments();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-primary-100 via-primary-200 to-primary-300">
      <div className="max-w-2xl w-full p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl text-gray-700 font-bold mb-4">Torneos Disponibles</h2>
        {tournaments.length === 0 ? (
          <p className="text-center text-gray-600">No hay torneos disponibles.</p>
        ) : (
          <ul className="list-disc space-y-4">
            {tournaments.map((tournament) => (
              <li
                key={tournament.uuid}
                className="cursor-pointer text-blue-600 hover:underline"
                onClick={() => navigate(`/tournaments/${tournament.uuid}`)}
              >
                {tournament.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TournamentsList;
