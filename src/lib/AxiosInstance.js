import axios from "axios";
import { LS } from "./SecureLocalStorage";

export const AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

AxiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (err.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}auth/refresh`
      );
      AxiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.accessToken}`;
      originalRequest.headers[
        "Authorization"
      ] = `Bearer ${res.data.accessToken}`;
      return AxiosInstance(originalRequest);
    }
    LS.clear();
    window.location.href = import.meta.env.BASE_URL;
    return Promise.reject(err);
  }
);

AxiosInstance.defaults.headers.common["Content-Type"] = "application/json";
