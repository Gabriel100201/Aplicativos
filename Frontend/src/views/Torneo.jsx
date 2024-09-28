import { useState } from "react";

export const Torneo = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoEquipo = { nombre, descripcion };
    console.log(nuevoEquipo); // Aquí puedes enviar los datos a tu backend
    // Resetea los campos del formulario
    setNombre('');
    setDescripcion('');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="max-w-md w-full p-4 bg-gray-600 rounded-lg shadow-md">
        <h2 className="text-2xl text-white font-bold mb-4">Cargar Equipo</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nombre" className="block text-sm font-medium text-white">
              Nombre del Equipo:
            </label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200 mb-2"
          >
            Cargar
          </button>
        </form>
        <div>
          <button
            type="button"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
          >
            Generar torneo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Torneo;
