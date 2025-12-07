import axios from "axios";
import { LS } from "./SecureLocalStorage";

export const AdminAxiosInstanceforUpload = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

AdminAxiosInstanceforUpload.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    console.log(
      err.response,
      !originalRequest._retry,
      import.meta.env.VITE_BASE_URL
    );
    if (err.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/User/refreshToken`,
        import.meta.env.PROD ? {} : { refreshToken: LS.get("refreshToken") },
        { withCredentials: true }
      );
      AdminAxiosInstanceforUpload.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.accessToken}`;
      originalRequest.headers[
        "Authorization"
      ] = `Bearer ${res.data.accessToken}`;
      return AdminAxiosInstanceforUpload(originalRequest);
    }
    LS.clear();
    window.location.href = import.meta.env.BASE_URL;
    return Promise.reject(err);
  }
);

AdminAxiosInstanceforUpload.defaults.headers.common["Content-Type"] =
  "multipart/form-data";
