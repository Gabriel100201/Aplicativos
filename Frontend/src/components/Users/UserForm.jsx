/* eslint-disable react/prop-types */
export const UserForm = ({
  initialUser = {},
  onSubmit,
  onCancel,
  isEdit = false,
}) => {
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
          <div className="mb-4">
            <label className="block mb-2">Roles (separados por comas)</label>
            <input
              type="text"
              id="roles"
              name="roles"
              defaultValue={initialUser.roles?.join(",") || ""}
              className="w-full border px-3 py-2 rounded"
            />
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
