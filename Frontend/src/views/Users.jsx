import { useEffect, useState } from "react";
import { Api } from "../services/Api";

export const Users = () => {

  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // Nuevo estado para manejar el usuario seleccionado

  // Función para obtener la lista de usuarios
  const fetchUsers = () => {
    Api.get('user')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de usuarios:", error);
      });
  };

  // Llamada a fetchUsers cuando el componente se monta
  useEffect(() => {
    fetchUsers();
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

    Api.post('user', { body: newUser })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.message);
        } else {
          setShowModal(false);
          fetchUsers(); // Refresca la lista de usuarios después de crear uno
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const handleDelete = (uuid) => {
    Api.post('user/delete', { body: { uuid } })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.message);
        } else {
          alert('Usuario eliminado correctamente');
          fetchUsers(); // Refresca la lista de usuarios después de eliminar uno
        }
      })
      .catch((error) => {
        console.error("Error al eliminar el usuario:", error.message);
      });
  };

  const handleEdit = (uuid) => {
    const user = users.find(u => u.uuid === uuid);
    if (user) {
      setSelectedUser(user);  // Almacena el usuario seleccionado en el estado
      setShowEditModal(true); // Muestra el modal de edición
    }
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    const updatedUser = {
      ...selectedUser, // Mantén los campos originales
      displayName: e.target.displayName.value,
      roles: e.target.roles.value.split(','),
      isEnabled: e.target.isEnabled.checked
    };

    Api.post(`user/update`, { body: updatedUser }) // Llamada para actualizar el usuario
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.message);
        } else {
          setShowEditModal(false);
          fetchUsers(); // Refresca la lista de usuarios después de actualizar uno
        }
      })
      .catch((error) => {
        console.error("Error al actualizar el usuario:", error.message);
      });
  };

  const handleCreate = () => {
    setShowModal(true); // Mostrar el modal para crear
  };

  const handleCloseModal = () => {
    setShowModal(false); // Cerrar el modal de creación
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false); // Cerrar el modal de edición
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
            <form onSubmit={createUser}> {/* Modal de creación */}
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
                  type="submit" 
                  className="bg-blue-500 text-white px-3 py-1 rounded-md"
                >
                  Crear Usuario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para editar usuario */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h2 className="text-2xl mb-4">Editar Usuario</h2>
            <form onSubmit={handleUpdateUser}> {/* Modal de edición */}
              <div className="mb-4">
                <label className="block mb-2">Nombre Completo</label>
                <input
                  id="displayName"
                  type="text"
                  name="displayName"
                  defaultValue={selectedUser.displayName} // Valor por defecto cargado
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
                  defaultValue={selectedUser.roles.join(',')} // Valor por defecto cargado
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">¿Está habilitado?</label>
                <input
                  type="checkbox"
                  id="isEnabled"
                  name="isEnabled"
                  defaultChecked={selectedUser.isEnabled} // Valor por defecto cargado
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-3 py-1 rounded-md mr-4"
                  onClick={handleCloseEditModal}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-3 py-1 rounded-md"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
