// hooks/useInitAuth.ts
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAuthStore from "../stores/useAuthStore.ts";
import { authQueryKeys } from "../constants/queryKeys.ts";
import { REFRESH_TOKEN } from "../utils/storage.ts";
import axiosInstance from "../api/axios.ts";
import { useEffect } from "react";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN_EXPIRED } from "../constants/token.ts";

export const useInitAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { accessToken, setAccessToken, setUser } = useAuthStore();
  const { data, error } = useQuery({
    staleTime: ACCESS_TOKEN_EXPIRED,
    queryKey: authQueryKeys.accessToken.queryKey,
    queryFn: async () => {
      const refreshToken = localStorage.getItem(REFRESH_TOKEN);
      if (!refreshToken) return;

      const response = await axiosInstance.post("/auth/refresh", null, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });
      return response.data;
    },
    enabled: !accessToken,
  });

  useEffect(() => {
    if (data) {
      const { accessToken, refreshToken } = data;
      setAccessToken(accessToken);
      localStorage.setItem(REFRESH_TOKEN, refreshToken);
      queryClient.invalidateQueries({
        queryKey: authQueryKeys.profile.queryKey,
      });
    }
  }, [data, setAccessToken]); // 의존성 추가

  useEffect(() => {
    if (error instanceof AxiosError && error?.response?.status === 403) {
      setAccessToken(null);
      setUser(null);
      localStorage.removeItem(REFRESH_TOKEN);
      queryClient.clear();
      navigate("/login");
    }
  }, [error, setAccessToken, setUser, queryClient]);

  return { data, error };
};
