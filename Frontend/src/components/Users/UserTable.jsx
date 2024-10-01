/* eslint-disable react/prop-types */
// Función para asignar colores basados en el rol
const getRoleColor = (role) => {
  switch (role) {
    case "superadmin":
      return "bg-purple-500 text-white";
    case "admin":
      return "bg-blue-500 text-white";
    case "user":
      return "bg-green-500 text-white";
    case "guest":
      return "bg-green-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
};

export const UserTable = ({ users, onEdit, onDelete }) => {
  return (
    <table className="min-w-full bg-white border border-gray-200">
      <thead>
        <tr>
          <th className="px-4 py-2 border">Nombre</th>
          <th className="px-4 py-2 border">Roles</th>
          <th className="px-4 py-2 border">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.uuid}>
            <td className="px-4 py-2 border">{user.displayName}</td>
            <td className="px-4 py-2 border">
              <div className="flex gap-2">
                {user.roles.map((role, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${getRoleColor(role)}`}
                  >
                    {role.toUpperCase()}
                  </span>
                ))}
              </div>
            </td>
            <td className="px-4 py-2 border text-center">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-blue-600"
                onClick={() => onEdit(user.uuid)}
              >
                Modificar
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                onClick={() => onDelete(user.uuid)}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
