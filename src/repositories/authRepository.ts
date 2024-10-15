import axiosInstance from "../api/axios.ts";
import { User } from "../type/User.ts";

export const fetchAccessToken = async (): Promise<{
  accessToken: string;
  refreshToken: string;
}> => {
  const { data } = await axiosInstance.get("/auth/refresh-token");
  return data;
};

export const fetchProfile = async (): Promise<User> => {
  const { data } = await axiosInstance.get("/auth/profile");
  return data;
};

export const requestLogin = async (credentials: {
  username: string;
  password: string;
}) => {
  const { data } = await axiosInstance.post("/auth/login", credentials);
  return data;
};

export const requestSignup = async (userInfo: {
  username: string;
  password: string;
}) => {
  const { data } = await axiosInstance.post("/auth/signup", userInfo);
  return data;
};

export const requestLogout = async () => {
  await axiosInstance.post("/auth/logout");
};
