import axios from "axios";

export const AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

AxiosInstance.defaults.headers.common["Content-Type"] = "application/json";
