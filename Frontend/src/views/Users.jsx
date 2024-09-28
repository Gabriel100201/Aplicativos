import { useEffect, useState } from "react";
import { Api } from "../services/Api";

export const Users = () => {

  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false); // Estado para controlar el modal

  useEffect(() => {
    Api.get('user')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  const createUser = (e) => {
    e.preventDefault();
    const newUser = {
      username: e.target.username.value,
      password: e.target.password.value,
      displayName: e.target.displayName.value,
      roles: e.target.roles.value.split(','),
      isEnabled: e.target.isEnabled.checked
    };

    // Llamada a la API para crear el nuevo usuario
    Api.post('user', { body: newUser })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Actualiza la lista de usuarios con el nuevo usuario
        setUsers([...users, data]);
        // Cierra el modal
        setShowModal(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = (uuid) => {
    const updatedUsers = users.filter((user) => user.uuid !== uuid);
    setUsers(updatedUsers);
  };

  const handleEdit = (uuid) => {
    alert(`Modificar usuario con ID: ${uuid}`);
  };

  const handleCreate = () => {
    setShowModal(true); // Mostrar el modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Cerrar el modal
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Lista de Usuarios</h1>
      <button onClick={handleCreate} className="bg-blue-500 text-white px-3 py-1 rounded-md mb-4">Crear nuevo usuario</button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Nombre</th>
              <th className="px-4 py-2 border">Rol</th>
              <th className="px-4 py-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.uuid}>
                <td className="px-4 py-2 border">{user.displayName}</td>
                <td className="px-4 py-2 border">{user.roles}</td>
                <td className="px-4 py-2 border text-center">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-blue-600"
                    onClick={() => handleEdit(user.uuid)}
                  >
                    Modificar
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                    onClick={() => handleDelete(user.uuid)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para crear usuario */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h2 className="text-2xl mb-4">Crear Nuevo Usuario</h2>
            <form onSubmit={createUser}> {/* Cambiado el botón onClick por el submit del formulario */}
              <div className="mb-4">
                <label className="block mb-2">Nombre Completo</label>
                <input
                  id="displayName"
                  type="text"
                  name="displayName"
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Roles (separados por comas)</label>
                <input
                  type="text"
                  id="roles"
                  name="roles"
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">¿Está habilitado?</label>
                <input
                  type="checkbox"
                  id="isEnabled"
                  name="isEnabled"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-3 py-1 rounded-md mr-4"
                  onClick={handleCloseModal}
                >
                  Cancelar
                </button>
                <button
                  type="submit"  // Submit button ahora envía el formulario
                  className="bg-blue-500 text-white px-3 py-1 rounded-md"
                >
                  Crear Usuario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
