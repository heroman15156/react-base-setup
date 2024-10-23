import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getAccessToken,
  getProfile,
  signIn,
  logout,
  signup,
} from "../../../servies/authServices.ts";
import queryClient from "../../../api/queryClient.ts";
import { authQueryKeys } from "../../../constants/queryKeys.ts";
import { REFRESH_TOKEN } from "../../../utils/storage.ts";
import useAuthStore from "../../../stores/useAuthStore.ts";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const useSignup = () => {
  return useMutation({
    mutationFn: signup,
  });
};

const useLogin = () => {
  const { setAccessToken, setUser } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  return useMutation({
    mutationFn: signIn,
    onSuccess: (data: any) => {
      setAccessToken(data.tokens.accessToken);
      setUser(data.user);
      localStorage.setItem(REFRESH_TOKEN, data.tokens.refreshToken);
      queryClient.setQueryData(authQueryKeys.profile.queryKey, data.user);
      navigate(location.state?.returnPath || "/", { replace: true });
    },
  });
};

const useRefreshToken = () => {
  return useQuery({
    queryKey: authQueryKeys.accessToken.queryKey,
    queryFn: getAccessToken,
    enabled: false, // 자동으로 실행되지 않도록 설정
  });
};

const useProfile = () => {
  const { setUser, accessToken } = useAuthStore();

  const query = useQuery({
    queryKey: authQueryKeys.profile.queryKey,
    queryFn: getProfile,
    enabled: !!accessToken,
  });

  useEffect(() => {
    if (query.data) {
      setUser(query.data.email);
    }
  }, [query.data, setUser]);
  return query;
};

const useLogout = () => {
  const { setAccessToken, setUser } = useAuthStore();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      localStorage.removeItem(REFRESH_TOKEN);
      setAccessToken(null);
      setUser(null);
      queryClient.removeQueries({
        queryKey: authQueryKeys.accessToken.queryKey,
      });
      queryClient.removeQueries({ queryKey: authQueryKeys.profile.queryKey });
    },
    onSettled: () => {},
  });
};

const useAuth = () => {
  const signupMutation = useSignup();
  const loginMutation = useLogin();
  const refreshTokenQuery = useRefreshToken();
  const profileQuery = useProfile();
  const logoutMutation = useLogout();
  return {
    isLogin: profileQuery.isSuccess,
    signupMutation,
    loginMutation,
    refreshTokenQuery,
    userInfo: profileQuery.data,
    logoutMutation,
  };
};
export default useAuth;
