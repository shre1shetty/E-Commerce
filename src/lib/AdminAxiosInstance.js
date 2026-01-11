import axios from "axios";
import { LS } from "./SecureLocalStorage";
import { TokenStore } from "./TokenStore";

export const AdminAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});
AdminAxiosInstance.defaults.headers.common["Content-Type"] = "application/json";
AdminAxiosInstance.interceptors.request.use((config) => {
  const token = TokenStore.getToken();
  if (token) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

AdminAxiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (err.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/User/refreshToken`,
        import.meta.env.PROD ? {} : { refreshToken: LS.get("refreshToken") },
        { withCredentials: true }
      );
      const newToken = data.accessToken;

      // update axios instance
      AdminAxiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${newToken}`;

      TokenStore.setToken(newToken);

      // update the retry request
      originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

      return AdminAxiosInstance(originalRequest);
    }

    LS.clear();
    window.location.href = import.meta.env.BASE_URL;
    return Promise.reject(err);
  }
);
