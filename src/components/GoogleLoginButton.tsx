import {
  GOOGLE_CLIENT_ID,
  GOOGLE_REDIRECT_URL,
} from "../servies/GoogleAuthService.ts";
import { useAuth } from "../hooks/useAuth.ts";

export default function GoogleLoginButton() {
  const { logout, userInfo } = useAuth();

  const handleLogin = () => {
    if (!userInfo) {
      const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URL}&response_type=code&scope=openid%20profile%20email&access_type=offline&prompt=consent`;
      window.location.href = googleAuthUrl;
      return;
    }

    logout();
  };

  return (
    <div>
      <button onClick={handleLogin}>{userInfo ? "Logout " : "Login"}</button>
    </div>
  );
}
