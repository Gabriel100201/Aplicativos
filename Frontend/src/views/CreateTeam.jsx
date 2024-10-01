import { useState } from "react";
import { Api } from "../services/Api";
import { TeamList } from "../components/Teams/TeamList";
import { toast } from "sonner";


export const CreateTeam = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [dt, setDt] = useState('');
  const [jugadores, setJugadores] = useState([{ name: "", position: "" }]);
  const [logo, setLogo] = useState(null);
  const [refreshTeams, setRefreshTeams] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newTeam = {
      name: nombre,
      description: descripcion,
      manager: dt,
      players: [],
      logo: logo || null
    }

    // Añadir jugadores
    jugadores.forEach((jugador, index) => {
      newTeam.players[index] = {
        name: jugador.name,
        position: jugador.position
      };
    });

    try {
      const response = await Api.post('team', { body: newTeam });
      const data = await response.json();
      if (response.ok) {
        toast.success('Equipo cargado correctamente');
        setNombre('');
        setDescripcion('');
        setDt('');
        setJugadores([{ name: "", position: "" }]);
        setLogo(null);
        setRefreshTeams((prev) => !prev);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error al cargar el equipo:', error);
      toast.error('Ocurrió un error al cargar el equipo');
    }
  };

  const handleJugadorChange = (index, event) => {
    const { name, value } = event.target;
    const updatedJugadores = [...jugadores];
    updatedJugadores[index][name] = value;
    setJugadores(updatedJugadores);
  };

  const handleAddJugador = () => {
    setJugadores([...jugadores, { name: "", position: "" }]);
  };

  const handleRemoveJugador = (index) => {
    const updatedJugadores = [...jugadores];
    updatedJugadores.splice(index, 1);
    setJugadores(updatedJugadores);
  };

  const handleLogoChange = (e) => {
    setLogo(e.target.files[0]); // Almacenar el archivo seleccionado
  };

  return (
    <section>
      <div className="flex px-12 items-center justify-center min-h-screen bg-gradient-to-b from-primary-100 via-primary-200 to-primary-300">
        <div className="max-w-md w-full p-4 bg-gray-200 rounded-lg shadow-md">
          <h2 className="text-2xl text-gray-700 font-bold mb-4">Cargar Equipo</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-4">
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                Nombre del Equipo:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-200"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">
                Descripción del Equipo (Opcional):
              </label>
              <input
                type="text"
                id="descripcion"
                name="description"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-200"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="dt" className="block text-sm font-medium text-gray-700">
                Director Técnico (DT):
              </label>
              <input
                type="text"
                id="dt"
                name="dt"
                value={dt}
                onChange={(e) => setDt(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-200"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Jugadores:</label>
              {jugadores.map((jugador, index) => (
                <div key={index} className="mb-2 flex space-x-2">
                  <input
                    type="text"
                    name="name"
                    value={jugador.name}
                    onChange={(e) => handleJugadorChange(index, e)}
                    placeholder="Nombre del Jugador"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-200"
                    required
                  />
                  <input
                    type="text"
                    name="position"
                    value={jugador.position}
                    onChange={(e) => handleJugadorChange(index, e)}
                    placeholder="Posición"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-200"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveJugador(index)}
                    className="bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddJugador}
                className="w-full py-2 px-4 bg-primary-300 text-white font-semibold rounded-md hover:bg-primary-200 transition duration-200"
              >
                Agregar Jugador
              </button>
            </div>

            <div className="mb-4">
              <label htmlFor="logo" className="block text-sm font-medium text-gray-700">
                Logo del Equipo (Opcional):
              </label>
              <input
                placeholder="URL del logo"
                type="text"
                id="logo"
                onChange={handleLogoChange}
                className="mt-1 px-3 rounded-md block w-full text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-primary-300 text-white font-semibold rounded-md hover:bg-primary-200 transition duration-200 mb-2"
            >
              Cargar
            </button>
          </form>
        </div>
      </div>
      <TeamList refreshTeams={refreshTeams} />
    </section>
  );
};

export default CreateTeam;
