import { GoogleUserInfo } from "../type/User.ts";
import { create } from "zustand";

type AuthState = {
  accessToken: string | null;
  user: GoogleUserInfo | null;
  setAccessToken: (token: string | null) => void;
  setUser: (user: GoogleUserInfo | null) => void;
};

const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  setAccessToken: (token) => set({ accessToken: token }),
  setUser: (user) => set({ user }),
}));

export default useAuthStore;
