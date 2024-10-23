import { REFRESH_TOKEN } from "../utils/storage.ts";
import axiosInstance from "./axios.ts";
import useAuthStore from "../stores/useAuthStore.ts";

export class TokenManager {
  private static instance: TokenManager;
  private refreshPromise: Promise<string> | null = null;
  private isRefreshing = false;

  private constructor() {}

  static getInstance() {
    if (!TokenManager.instance) {
      TokenManager.instance = new TokenManager();
    }
    return TokenManager.instance;
  }

  private async performRefresh() {
    try {
      const refreshToken = localStorage.getItem(REFRESH_TOKEN);
      if (!refreshToken) {
        return;
      }

      const response = await axiosInstance.post(
        "/auth/refresh",
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        },
      );

      const { accessToken } = response.data;
      useAuthStore.getState().setAccessToken(accessToken);
      return accessToken;
    } finally {
      this.isRefreshing = false;
      this.refreshPromise = null;
    }
  }

  async refreshToken() {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshPromise = this.performRefresh();
    }
    return this.refreshPromise;
  }
}
