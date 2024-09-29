import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import StorageService from "../../services/storageService"; // Importa el servicio de almacenamiento
import Logo from "../../assets/icons/Logo-app.png";

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
  {
    name: "Crear Equipo",
    path: "/create-team",
    roles: ["admin"],
  }
];

export const NavBar = () => {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const storedRoles = StorageService.getItem("roles");
    const token = StorageService.getItem("token");

    if (storedRoles) {
      setRoles(storedRoles);
    }

    if (token) {
      setIsAuthenticated(true);
    }
  }, [location]);

  useEffect(() => {
    // Filtrado de ítems basado en los roles y estado de autenticación
    const filtered = items.filter((item) => {
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

    setFilteredItems(filtered);
  }, [roles, isAuthenticated, location]);

  return (
    <header className="text-text-100 body-font bg-bg-100/20 h-20 border-b-2">
      <div className="container mx-auto flex flex-wrap flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center mb-4 md:mb-0">
          <img src={Logo} className="w-20" alt="logo" />
          <span className="ml-3 text-xl">Futbolin</span>
        </a>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center gap-3">
          {filteredItems.map((item) => (
            <Link
              key={item.name}
              className=" flex items-center border-0 py-1 px-5 focus:outline-none text-text-100 font-bold  transition-colors hover:text-text-200"
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
              navigate("/");
            }}
            className="inline-flex items-center bg-primary-300 hover:bg-primary-200 transition-colors border-0 py-1 px-3 focus:outline-none text-white font-semibold rounded text-base mt-4 md:mt-0"
          >
            Cerrar Sesion
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
