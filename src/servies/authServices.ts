import {
  setToken,
  removeToken,
  setRefreshToken,
  removeRefreshToken,
  REFRESH_TOKEN,
} from "../utils/storage";
import {
  requestLogout,
  requestSignup,
} from "../repositories/authRepository.ts";
import axiosInstance from "../api/axios.ts";

export const signIn = async (credentials: {
  username: string;
  password: string;
}) => {
  const data = await axiosInstance
    .post("/auth/login", {
      email: credentials.username,
      password: credentials.password,
    })
    .then((resp) => resp.data);

  return data;
};

export const signup = async (userInfo: {
  username: string;
  password: string;
}) => {
  return await requestSignup(userInfo);
};

export const getProfile = async () => {
  const data = await axiosInstance
    .get("/auth/profile")
    .then((resp) => resp.data);
  return data;
};

export const logout = async () => {
  await requestLogout();
  removeToken();
  removeRefreshToken();
};

export const getAccessToken = async () => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);
  const data = await axiosInstance
    .post(
      "/auth/refresh",
      {}, // empty body
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`, // 헤더에 refresh token 추가
        },
      },
    )
    .then((resp) => resp.data);
  setToken(data.accessToken);
  setRefreshToken(data.refreshToken);
  // return data;
};

// export const getProfile = async () => {
//   return await fetchProfile();
// };
