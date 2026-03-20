import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // MANDATORY for cookies
});

API.interceptors.request.use((config) => {

  const token = sessionStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;

});

API.interceptors.response.use(
  (response) => response,

  async (error) => {

    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
       originalRequest._retry = true; // Avoid infinite loop
      try {

        const refreshToken = sessionStorage.getItem("refreshToken");

        const res = await API.post("/auth/refresh", {
          refreshToken
        });

        sessionStorage.setItem(
          "accessToken",
          res.data.accessToken
        );

        error.config.headers.Authorization =
          "Bearer " + res.data.accessToken;

        return API(error.config);

      } catch {

        sessionStorage.clear();
        window.location.replace("/login");

      }

    }

    return Promise.reject(error);

  }

);

export default API;