// localStorage
export const TOKEN = "token";
export const ACCESS_TOKEN = "accessToken";
export const REFRESH_TOKEN = "refresh_token";
export const setToken = (token: string) => {
  localStorage.setItem(TOKEN, token);
};

export const getToken = () => {
  return localStorage.getItem(ACCESS_TOKEN);
};

export const removeToken = () => {
  localStorage.removeItem(ACCESS_TOKEN);
};

export const setRefreshToken = (refreshToken: string) => {
  localStorage.setItem(REFRESH_TOKEN, refreshToken);
};

export const removeRefreshToken = () => {
  localStorage.removeItem(REFRESH_TOKEN);
};
