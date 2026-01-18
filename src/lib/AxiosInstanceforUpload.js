import axios from "axios";

export const AxiosInstanceUpload = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
  headers: {
    "Content-Type": "multipart/form-data",
    "X-Store-Domain": window.location.hostname,
  },
});

AxiosInstanceUpload.defaults.headers.common["Content-Type"] =
  "multipart/form-data";
