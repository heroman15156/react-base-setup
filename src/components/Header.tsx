import { useNavigate } from "react-router-dom";
import { routes } from "../constants/routes.tsx";
import useAuth from "../hooks/queries/auth/useAuth.ts";

export default function Header() {
  const { logoutMutation, isLogin } = useAuth();
  const navigate = useNavigate();
  const onLogout = () => {
    logoutMutation.mutate();
  };

  const onNavigateToLogin = () => {
    navigate(routes.LOGIN);
  };

  return (
    <header>
      {isLogin ? (
        <button onClick={onLogout}>로그아웃</button>
      ) : (
        <button onClick={onNavigateToLogin}>로그인</button>
      )}
    </header>
  );
}
