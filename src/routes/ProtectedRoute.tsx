import { Navigate, Outlet } from "react-router-dom";
import { routes } from "../constants/routes.tsx";

function ProtectedRoute() {
  // const { isLogin } = useAuth();
  const isLogin = true;
  if (!isLogin) return <Navigate to={routes.LOGIN} replace />;

  return <Outlet />;
}

export default ProtectedRoute;
