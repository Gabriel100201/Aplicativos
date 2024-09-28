const StorageService = {
  // Guarda un valor en localStorage
  setItem: (key, value) => {
    try {
      if (typeof value != "string") {
        value = JSON.stringify(value);
      }
      localStorage.setItem(key, value);
    } catch (error) {
      console.error(`Error guardando en localStorage: ${error}`);
    }
  },

  // Obtiene un valor de localStorage
  getItem: (key) => {
    try {
      const serializedValue = localStorage.getItem(key);
      return serializedValue;
    } catch (error) {
      console.error(`Error obteniendo de localStorage: ${error}`);
      return null;
    }
  },

  // Elimina un valor de localStorage
  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error eliminando de localStorage: ${error}`);
    }
  },

  // Limpia todo el localStorage
  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error(`Error limpiando localStorage: ${error}`);
    }
  },
};

export default StorageService;
