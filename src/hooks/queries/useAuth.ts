import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getAccessToken,
  getProfile,
  login,
  logout,
  signup,
} from "../../servies/authServices.ts";
import queryClient from "../../api/queryClient.ts";
import { authQueryKeys } from "../../constants/queryKeys.ts";
import { ACCESS_TOKEN_EXPIRED } from "../../constants/token.ts";
import { removeToken } from "../../utils/storage.ts";

const useSignup = () => {
  return useMutation({
    mutationFn: signup,
  });
};

const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSettled: () => {
      queryClient.resetQueries({
        queryKey: authQueryKeys.accessToken.queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: [authQueryKeys.profile.queryKey],
      });
    },
  });
};

const useRefreshToken = () => {
  return useQuery({
    queryKey: [authQueryKeys.accessToken.queryKey],
    queryFn: getAccessToken,
    staleTime: ACCESS_TOKEN_EXPIRED,
    refetchInterval: ACCESS_TOKEN_EXPIRED,
    refetchOnWindowFocus: true,
  });
};

const useProfile = (enabled: boolean) => {
  return useQuery({
    queryKey: [authQueryKeys.profile.queryKey],
    queryFn: getProfile,
    enabled,
  });
};

const useLogout = () => {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      removeToken();
    },
    onSettled: () => {
      queryClient.invalidateQueries(authQueryKeys.accessToken);
      queryClient.invalidateQueries(authQueryKeys.profile);
    },
  });
};

const useAuth = () => {
  const signupMutation = useSignup();
  const loginMutation = useLogin();
  const refreshTokenQuery = useRefreshToken();
  const profileQuery = useProfile(refreshTokenQuery.isSuccess);
  const logoutMutation = useLogout();

  return {
    isLogin: profileQuery.isSuccess,
    signupMutation,
    loginMutation,
    refreshTokenQuery,
    profileQuery,
    logoutMutation,
  };
};
export default useAuth;
