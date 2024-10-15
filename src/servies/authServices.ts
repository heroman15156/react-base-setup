import {
  fetchAccessToken,
  fetchProfile,
  requestLogin,
  requestLogout,
  requestSignup,
} from "../repositories/authRepository";
import {
  setToken,
  removeToken,
  setRefreshToken,
  removeRefreshToken,
} from "../utils/storage";

export const login = async (credentials: {
  username: string;
  password: string;
}) => {
  const data = await requestLogin(credentials);
  setToken(data.accessToken);
  setRefreshToken(data.refreshToken);
  return data;
};

export const signup = async (userInfo: {
  username: string;
  password: string;
}) => {
  return await requestSignup(userInfo);
};

export const logout = async () => {
  await requestLogout();
  removeToken();
  removeRefreshToken();
};

export const getAccessToken = async () => {
  const data = await fetchAccessToken();
  setToken(data.accessToken);
  setRefreshToken(data.refreshToken);
  return data;
};

export const getProfile = async () => {
  return await fetchProfile();
};
