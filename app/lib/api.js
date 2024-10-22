import AsyncStorage from "@react-native-async-storage/async-storage";
import URL_BASE from "../config/URLs";

export const Api = {
  defaultHeaders: {
    "Content-Type": "application/json",
  },

  fetch: async (service, options) => {
    options = { headers: {}, ...options };
    options.headers = { ...Api.defaultHeaders, ...options.headers };

    try {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        options.headers["Authorization"] = `Bearer ${token}`;
      }

      if (options.body && typeof options.body !== "string") {
        options.body = JSON.stringify(options.body);
      }
      return fetch(`${URL_BASE}/${service}`, options);
    } catch (error) {
      return error.message;
    }
  },

  get: async (service, options = {}) => {
    const params = new URLSearchParams(options).toString();
    return Api.fetch(`${service}?${params}`, { method: "GET" });
  },

  post: async (service, options) => {
    return Api.fetch(service, { ...options, method: "POST" });
  },
};
