import { Navigate, Outlet } from "react-router-dom";
import { routes } from "../constants/routes.tsx";
import useAuth from "../hooks/queries/auth/useAuth.ts";

function ProtectedRoute() {
  const { isLogin } = useAuth();

  if (!isLogin) return <Navigate to={routes.LOGIN} replace />;

  return <Outlet />;
}

export default ProtectedRoute;
