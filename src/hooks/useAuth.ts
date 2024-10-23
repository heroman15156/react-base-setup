// import useAuthStore from "../stores/useAuthStore.ts";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import GoogleAuthService from "../servies/GoogleAuthService.ts";
// import { GoogleTokenResponse } from "../type/User.ts";
// import { useNavigate } from "react-router-dom";
// import { authQueryKeys } from "../constants/queryKeys.ts";
// import { routes } from "../constants/routes.tsx";
// import { getProfile, signIn, signup } from "../servies/authServices.ts";
// const USER_INFO_STALE_TIME = 30 * 60 * 1000; // 30분
//
// const useSignup = () => {
//   const navigate = useNavigate();
//
//   return useMutation({
//     mutationFn: signup,
//     onSuccess: () => {
//       navigate("/login");
//     },
//   });
// };
//
// const useLogin = () => {
//   const navigate = useNavigate();
//   const { setAccessToken } = useAuthStore();
//   return useMutation({
//     mutationFn: signIn,
//     onSuccess: async (data) => {
//       console.log("here", data.tokens.accessToken);
//       setAccessToken(data.tokens.accessToken);
//       localStorage.setItem("refresh_token", data.tokens.refreshToken);
//       navigate("/∑∑∑
//     },
//     onError: (error) => {
//       console.error("Login failed:", error);
//     },
//   });
// };
//
// // const useRefreshToken = () => {
// //   const { setAccessToken, setUser } = useAuthStore();
// //
// //   return useQuery({
// //     queryKey: authQueryKeys.accessToken.queryKey,
// //     queryFn: refresh,
// //     retry: (failureCount, error) => {
// //       if (error?.response?.status === 403) return false;
// //       return failureCount < 3;
// //     },
// //     enabled: false, // 자동으로 실행되지 않도록 설정
// //   });
// // };
//
// export const useAuth = () => {
//   const { accessToken, setAccessToken } = useAuthStore();
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();
//
//   const login = useMutation({
//     // mutationFn: GoogleAuthService.getTokens,
//     mutationFn: signIn,
//     onSuccess: async (data) => {
//       setAccessToken(data.tokens.accessToken);
//       localStorage.setItem("refresh_token", data.tokens.refreshToken);
//       navigate("/");
//     },
//     onError: (error) => {
//       console.error("Login failed:", error);
//     },
//   });
//
//   const refreshToken = useMutation({
//     mutationFn: () => {
//       const refreshToken = localStorage.getItem("refresh_token");
//       if (!refreshToken) throw new Error("Refresh token not found");
//       return GoogleAuthService.refreshToken(refreshToken);
//     },
//     onSuccess: async (data: GoogleTokenResponse) => {
//       setAccessToken(data.access_token);
//     },
//   });
//
//   const clearLocalState = () => {
//     setAccessToken(null);
//     localStorage.removeItem("refresh_token");
//   };
//
//   const logout = () => {
//     clearLocalState();
//     queryClient.removeQueries({
//       queryKey: [authQueryKeys.profile.queryKey],
//       exact: true,
//     });
//     navigate(routes.HOME);
//   };
//
//   const { data: userInfo, refetch: refetchUserInfo } = useQuery({
//     queryKey: authQueryKeys.profile.queryKey,
//     queryFn: getProfile,
//     // queryFn: () => GoogleAuthService.getUserInfo(accessToken as string),
//     enabled: !!accessToken,
//     staleTime: USER_INFO_STALE_TIME,
//   });
//
//   return {
//     userInfo,
//     login: login,
//     refreshToken: refreshToken.mutate,
//     logout,
//     refetchUserInfo,
//   };
// };
