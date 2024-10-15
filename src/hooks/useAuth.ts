import useAuthStore from "../stores/useAuthStore.ts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import GoogleAuthService from "../servies/GoogleAuthService.ts";
import { GoogleTokenResponse } from "../type/User.ts";
import { useNavigate } from "react-router-dom";
import { authQueryKeys } from "../constants/queryKeys.ts";
import { routes } from "../constants/routes.tsx";
const USER_INFO_STALE_TIME = 30 * 60 * 1000; // 30분

export const useAuth = () => {
  const { accessToken, setAccessToken } = useAuthStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const login = useMutation({
    mutationFn: GoogleAuthService.getTokens,
    onSuccess: async (data) => {
      setAccessToken(data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  const refreshToken = useMutation({
    mutationFn: () => {
      const refreshToken = localStorage.getItem("refresh_token");
      if (!refreshToken) throw new Error("Refresh token not found");
      return GoogleAuthService.refreshToken(refreshToken);
    },
    onSuccess: async (data: GoogleTokenResponse) => {
      setAccessToken(data.access_token);
    },
  });

  const clearLocalState = () => {
    setAccessToken(null);
    localStorage.removeItem("refresh_token");
  };

  const logout = () => {
    clearLocalState();
    queryClient.removeQueries({
      queryKey: [authQueryKeys.profile.queryKey],
      exact: true,
    });
    navigate(routes.HOME);
  };

  const { data: userInfo, refetch: refetchUserInfo } = useQuery({
    queryKey: [authQueryKeys.profile.queryKey],
    queryFn: () => GoogleAuthService.getUserInfo(accessToken as string),
    enabled: !!accessToken,
    staleTime: USER_INFO_STALE_TIME,
  });

  return {
    userInfo,
    login: login.mutate,
    refreshToken: refreshToken.mutate,
    logout,
    refetchUserInfo,
  };
};
