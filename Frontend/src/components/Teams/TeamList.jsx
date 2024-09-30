import { useEffect, useState } from "react";
import { Api } from "../../services/Api";
import { FaTrash } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
export const TeamList = ({ refreshTeams }) => {
  const [teams, setTeams] = useState([]);

  // Función para obtener todos los equipos del backend
  const fetchTeams = async () => {
    try {
      const response = await Api.get('team');
      const data = await response.json();

      if (response.ok) {
        setTeams(data);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error al obtener los equipos:", error);
    }
  };

  // Obtener los equipos al montar el componente
  useEffect(() => {
    fetchTeams();
  }, [refreshTeams]);

  // Función para eliminar un equipo
  const handleDelete = async (id) => {
    const teamId = id;
    try {
      const response = await Api.post(`team/delete/${teamId}`);
      console.log(response);
      if (response.ok) {
        fetchTeams();
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error("Error al eliminar el equipo:", error);
    }
  };
  return (
    <div className="py-12 max-w-[1200px] mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.length === 0 ? (
          <div className="col-span-full text-center py-6 bg-primary-100 rounded-lg shadow">
            No hay equipos cargados.
          </div>
        ) : (
          teams.map((team) => (
            <div key={team.uuid} className="bg-gradient-to-br relative from-white via-gray-100 to-gray-400 shadow-lg rounded-lg p-6 border border-gray-300">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{team.name}</h3>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Descripción:</strong> {team.description || "Sin descripción"}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                <strong>Director Técnico (DT):</strong> {team.manager || "Sin DT"}
              </p>
              <div>
                <h4 className="text-md font-semibold text-gray-700 mb-2">Jugadores:</h4>
                <ul className="list-disc pl-4 space-y-1 text-sm text-gray-600">
                  {team.players.map((player, index) => (
                    <li key={index}>
                      {player.name} - {player.position}
                    </li>
                  ))}
                </ul>
              </div>
              <button onClick={() => handleDelete(team.uuid)} value={team.uuid} id={team.uuid} className="absolute top-0 right-0 p-4 text-gray-600 hover:text-gray-800">
                <FaTrash />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
