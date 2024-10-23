import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore.ts";
import { routes } from "../constants/routes.tsx";

export function PublicRoute() {
  const { accessToken } = useAuthStore();

  if (accessToken) return <Navigate to={routes.HOME} replace />;

  return <Outlet />;
}
