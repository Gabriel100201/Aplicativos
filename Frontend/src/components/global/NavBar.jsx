// NavBar.js
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import StorageService from "../../services/storageService"; // Importa el servicio de almacenamiento

const items = [
  {
    name: "Principal",
    path: "/",
    roles: [],
  },
  {
    name: "Login",
    path: "/login",
    roles: [],
  },
  {
    name: "Info",
    path: "/info",
    roles: ["user", "admin"],
  },
  {
    name: "Users",
    path: "/users",
    roles: ["admin"],
  },
];

export const NavBar = () => {
  const [roles, setRoles] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Obtén los roles del usuario desde el localStorage
    const storedRoles = StorageService.getItem("roles");
    const token = StorageService.getItem("token");

    if (storedRoles) {
      setRoles(storedRoles);
    }

    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Filtrado de ítems basado en los roles y estado de autenticación
  const filteredItems = items.filter((item) => {
    if (isAuthenticated && item.name === "Login") {
      return false;
    }

    if (!roles.length) {
      return item.roles.length === 0;
    }

    return (
      item.roles.length === 0 ||
      item.roles.some((role) => roles.includes(role))
    );
  });

  return (
    <header className="text-gray-600 body-font bg-primary-50/30 h-20">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">Ejemplo</span>
        </a>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          {filteredItems.map((item) => (
            <Link
              key={item.name}
              className="mr-5 text-primary-50 font-bold hover:text-gray-900"
              to={item.path}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        {isAuthenticated && (
          <button
            onClick={() => {
              StorageService.removeItem("token");
              StorageService.removeItem("roles");
              setRoles([]);
              setIsAuthenticated(false);
            }}
            className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
          >
            Logout
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        )}
      </div>
    </header>
  );
};