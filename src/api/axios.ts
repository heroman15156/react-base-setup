import axios, {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import useAuthStore from "../stores/useAuthStore.ts";

import { TokenManager } from "./tokenManager.ts";

// AxiosRequestConfig 타입 확장
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

export const createAxiosInstance = () => {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
  });

  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const accessToken = useAuthStore.getState().accessToken;
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as CustomAxiosRequestConfig;

      if (!originalRequest) {
        const event = new CustomEvent("auth:expired");
        window.dispatchEvent(event);
        return;
      }

      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        originalRequest.url !== "/auth/refresh"
      ) {
        originalRequest._retry = true;

        try {
          const tokenManager = TokenManager.getInstance();
          const newAccessToken = await tokenManager.refreshToken();

          // 새 액세스 토큰으로 헤더 업데이트
          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${newAccessToken}`,
          };

          return axiosInstance(originalRequest);
        } catch (refreshError: any) {
          if (refreshError.response?.status === 403) {
            window.dispatchEvent(new CustomEvent("auth:expired"));
            return;
          }
          throw refreshError;
        }
      }
      return Promise.reject(error);
    },
  );

  return axiosInstance;
};
const axiosInstance = createAxiosInstance();
export default axiosInstance;
