import useGoogleLoginCallback from "../hooks/useGoogleLoginCallback.tsx";

export default function CallbackPage() {
  useGoogleLoginCallback();
  return <div>로그인중....</div>;
}
