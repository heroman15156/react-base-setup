import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
// import { APIError } from "../components/ErrorBoundary/CustomErrorBoundary.tsx";
// import { AxiosError } from "axios";

// function handleApiError(error: unknown) {
//   if (error instanceof AxiosError && error.status && error.status > 400) {
//     const status = error.response?.status || 0;
//     const message = error.response?.data?.message || "An error occurred";
//     const code = error.response?.data?.code || "UNKNOWN_ERROR";
//
//     return new APIError(message, status, code);
//   }
//
//   return null;
// }

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      // throwOnError: true,
    },
    mutations: {
      retry: false,
    },
  },
  queryCache: new QueryCache({
    // onError: (error) => {},
  }),
  mutationCache: new MutationCache({
    // onError: (error) => {},
  }),
});

export default queryClient;
