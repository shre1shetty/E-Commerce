import axios from "axios";
import { LS } from "./SecureLocalStorage";

export const AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
    "X-Store-Domain": window.location.hostname,
  },
});

AxiosInstance.defaults.headers.common["Content-Type"] = "application/json";
