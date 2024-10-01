/* eslint-disable react/prop-types */
export const UserForm = ({
  initialUser = {},
  onSubmit,
  onCancel,
  isEdit = false,
}) => {
  const roleOptions = ["admin", "user", "superadmin"];

  const handleRoleChange = (e) => {
    const { value, checked } = e.target;
    const currentRoles = new Set(initialUser.roles || []);

    if (checked && value !== "") {
      currentRoles.add(value);
    } else {
      currentRoles.delete(value);
    }

    initialUser.roles = Array.from(currentRoles).filter(Boolean);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <h2 className="text-2xl mb-4">
          {isEdit ? "Editar Usuario" : "Crear Nuevo Usuario"}
        </h2>
        <form onSubmit={onSubmit}>
          {!isEdit && (
            <>
              <div className="mb-4">
                <label className="block mb-2">Username</label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  className="w-full border px-3 py-2 rounded"
                  required={!isEdit}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Contraseña</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  className="w-full border px-3 py-2 rounded"
                  required={!isEdit}
                />
              </div>
            </>
          )}
          <div className="mb-4">
            <label className="block mb-2">Nombre Completo</label>
            <input
              id="displayName"
              type="text"
              name="displayName"
              defaultValue={initialUser.displayName || ""}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          {/* Checkboxes para seleccionar roles */}
          <div className="mb-4">
            <label className="block mb-2">Roles</label>
            <div className="flex flex-wrap gap-2">
              {roleOptions.map((role) => (
                <label key={role} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="roles"
                    value={role}
                    defaultChecked={initialUser.roles?.includes(role)}
                    onChange={handleRoleChange}
                    className="mr-2"
                  />
                  {role}
                </label>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-2">¿Está habilitado?</label>
            <input
              type="checkbox"
              id="isEnabled"
              name="isEnabled"
              defaultChecked={initialUser.isEnabled || false}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-500 text-white px-3 py-1 rounded-md mr-4"
              onClick={onCancel}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-3 py-1 rounded-md"
            >
              {isEdit ? "Guardar Cambios" : "Crear Usuario"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
