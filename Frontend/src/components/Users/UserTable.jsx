/* eslint-disable react/prop-types */
import { FaTrash } from "react-icons/fa";

export const UserTable = ({ users, onEdit, onDelete }) => {
  console.log(users);
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Nombre</th>
            <th className="px-4 py-2 border">Username</th>
            <th className="px-4 py-2 border">Rol</th>
            <th className="px-4 py-2 border">Estado</th>
            <th className="px-4 py-2 border w-1/5 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.uuid}>
              <td className="px-4 py-2 border">{user.displayName}</td>
              <td className="px-4 py-2 border">{user.username}</td>
              <td className="px-4 py-2 border">{user.roles.toString()}</td>
              <td className="px-4 py-2 border">
                <span className={user.isEnabled ? "px-4 py-2 border rounded-full font-semibold bg-green-300 w-full flex justify-center items-center" : "w-full flex justify-center items-center px-3 py-2 border rounded-full bg-red-300 font-semibold"}>
                  {user.isEnabled ? "Activo" : "Inactivo"}
                </span>
              </td>
              <td className="px-2 py-2 border text-center flex justify-center items-center gap-2">
                <button
                  className="bg-accent-500 text-white px-2 py-1 text-sm rounded-md hover:bg-accent-400 transition-colors"
                  onClick={() => onEdit(user.uuid)}
                >
                  Modificar
                </button>
                <button
                  className="bg-red-500 text-white p-1 rounded-md hover:bg-red-600 transition-colors"
                  onClick={() => onDelete(user.uuid)}
                >
                  <FaTrash size={14} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
