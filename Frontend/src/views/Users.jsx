import { useEffect, useState } from "react";
import { UserTable } from "../components/Users/UserTable";
import { UserForm } from "../components/Users/UserForm";
import { fetchUsers, createUser, updateUser, deleteUser } from "../services/userServices";
import { FaPlus } from "react-icons/fa6";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

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

    const selectedRoles = Array.from(e.target.roles)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);

    const newUser = {
      username: e.target.username.value,
      password: e.target.password.value,
      displayName: e.target.displayName.value,
      roles: selectedRoles,
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

    const selectedRoles = Array.from(e.target.roles)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);

    const updatedUser = {
      ...selectedUser,
      displayName: e.target.displayName.value,
      roles: selectedRoles,
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
    <div className="container mx-auto p-4 mt-10">
      <h1 className="text-3xl font-bold text-center mb-4 text-primary-300">Lista de Usuarios</h1>
      <button
        onClick={() => setShowModal(true)}
        className="bg-primary-300 flex items-center hover:bg-primary-200 transition-colors justify-center gap-2 text-white px-3 py-1 rounded-md mb-4"
      >
        <span className="font-semibold text-center">
        Crear nuevo usuario
        </span>
        <FaPlus />
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
