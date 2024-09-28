import { useEffect, useState } from "react";
import { UserTable } from "../components/Users/UserTable";
import { UserForm } from "../components/Users/UserForm";
import { fetchUsers, createUser, updateUser, deleteUser } from "../services/userServices";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // Estado para manejar el usuario seleccionado

  const loadUsers = () => {
    fetchUsers()
      .then((data) => setUsers(data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleCreateUser = (e) => {
    e.preventDefault();
    const newUser = {
      username: e.target.username.value,
      password: e.target.password.value,
      displayName: e.target.displayName.value,
      roles: e.target.roles.value.split(","),
      isEnabled: e.target.isEnabled.checked,
    };

    createUser(newUser)
      .then(() => {
        setShowModal(false);
        loadUsers();
      })
      .catch((error) => console.error(error.message));
  };

  const handleDeleteUser = (uuid) => {
    deleteUser(uuid)
      .then(() => {
        alert("Usuario eliminado correctamente");
        loadUsers();
      })
      .catch((error) => console.error("Error al eliminar el usuario:", error.message));
  };

  const handleEditUser = (uuid) => {
    const user = users.find((u) => u.uuid === uuid);
    if (user) {
      setSelectedUser(user);
      setShowEditModal(true);
    }
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    const updatedUser = {
      ...selectedUser,
      displayName: e.target.displayName.value,
      roles: e.target.roles.value.split(","),
      isEnabled: e.target.isEnabled.checked,
    };

    updateUser(updatedUser)
      .then(() => {
        setShowEditModal(false);
        loadUsers();
      })
      .catch((error) => console.error("Error al actualizar el usuario:", error.message));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Lista de Usuarios</h1>
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 text-white px-3 py-1 rounded-md mb-4"
      >
        Crear nuevo usuario
      </button>

      <UserTable users={users} onEdit={handleEditUser} onDelete={handleDeleteUser} />

      {showModal && (
        <UserForm onSubmit={handleCreateUser} onCancel={() => setShowModal(false)} />
      )}

      {showEditModal && selectedUser && (
        <UserForm
          initialUser={selectedUser}
          onSubmit={handleUpdateUser}
          onCancel={() => setShowEditModal(false)}
          isEdit
        />
      )}
    </div>
  );
};
