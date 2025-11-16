import axios from "axios";
import { LS } from "./SecureLocalStorage";

export const AdminAxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

AdminAxiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    console.log(err.response, originalRequest._retry);
    if (err.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}auth/refresh`
      );
      AdminAxiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.accessToken}`;
      originalRequest.headers[
        "Authorization"
      ] = `Bearer ${res.data.accessToken}`;
      return AdminAxiosInstance(originalRequest);
    }
    LS.clear();
    window.location.href = import.meta.env.BASE_URL;
    return Promise.reject(err);
  }
);

AdminAxiosInstance.defaults.headers.common["Content-Type"] = "application/json";
