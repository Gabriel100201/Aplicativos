import { useState, useEffect } from "react";
import { Api } from "../services/Api";
import { useNavigate } from "react-router-dom";

export const CreateTournament = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTeams, setSelectedTeams] = useState([]); // Equipos seleccionados para el torneo
  const [teams, setTeams] = useState([]); // Todos los equipos disponibles
  const navigate = useNavigate();

  // Función para obtener la lista de equipos desde el backend
  const fetchTeams = async () => {
    try {
      const response = await Api.get("team");
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
  }, []);

  // Manejar el envío del formulario para crear el torneo
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedTeams.length < 2) {
      alert("Debes seleccionar al menos dos equipos para crear un torneo.");
      return;
    }

    const newTournament = {
      name,
      description,
      teams: selectedTeams,
    };

    try {
      const response = await Api.post("tournament", {
        body: newTournament,
      });

      const data = await response.json();

      if (response.ok) {
        alert("Torneo creado con éxito");
        // Una vez creado el torneo, generamos los partidos
        handleGenerateMatches(data.uuid);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error al crear el torneo:", error);
      alert("Error al crear el torneo.");
    }
  };

  // Función para generar los partidos después de crear el torneo
  const handleGenerateMatches = async (tournamentUuid) => {
    try {
      const response = await Api.post("tournament/generate-matches", {
        body: { uuid: tournamentUuid },
      });
      const data = await response.json();
      if (response.ok) {
        alert("Partidos generados con éxito");
        navigate(`/tournament/${tournamentUuid}`); // Navega a la vista de detalle del torneo
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error al generar los partidos:", error);
      alert("Error al generar los partidos.");
    }
  };

  // Función para seleccionar/deseleccionar equipos
  const handleTeamSelection = (teamUuid) => {
    if (selectedTeams.includes(teamUuid)) {
      setSelectedTeams(selectedTeams.filter((uuid) => uuid !== teamUuid));
    } else {
      setSelectedTeams([...selectedTeams, teamUuid]);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-primary-100 via-primary-200 to-primary-300">
      <div className="max-w-lg w-full p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl text-gray-700 font-bold mb-4">Crear Torneo</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nombre del Torneo:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-200"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Descripción del Torneo (Opcional):
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-200"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Selecciona los equipos:</label>
            <div className="max-h-64 overflow-y-scroll border border-gray-300 rounded-md p-2">
              {teams.length === 0 ? (
                <p>No hay equipos disponibles.</p>
              ) : (
                teams.map((team) => (
                  <div key={team.uuid} className="mb-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedTeams.includes(team.uuid)}
                        onChange={() => handleTeamSelection(team.uuid)}
                        className="form-checkbox h-5 w-5 text-primary-600"
                      />
                      <span>{team.name}</span>
                    </label>
                  </div>
                ))
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-primary-300 text-white font-semibold rounded-md hover:bg-primary-200 transition duration-200 mb-2"
          >
            Crear Torneo
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTournament;
