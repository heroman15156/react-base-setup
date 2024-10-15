import axios from "axios";
import { getToken } from "../utils/storage.ts";

const axiosInstance = axios.create({
  baseURL: "https://api.chucknorris.io/",
});
axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    console.log(err);
    return Promise.reject(err);
  },
);

export default axiosInstance;
