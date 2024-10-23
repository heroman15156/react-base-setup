import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { routes } from "../constants/routes.tsx";

import useAuth from "./queries/auth/useAuth.ts";

export const useAuthExpired = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { logoutMutation } = useAuth();

  const handleAuthExpired = () => {
    if (location.pathname === routes.LOGIN) return;
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        navigate(routes.LOGIN, {
          replace: true,
          state: {
            returnPath: location.pathname,
            reason: "session_expired",
          },
        });
      },
    });
  };
  useEffect(() => {
    window.addEventListener("auth:expired", handleAuthExpired);
    return () => {
      window.removeEventListener("auth:expired", handleAuthExpired);
    };
  }, []);
};
