import { create } from "zustand";

type AuthState = {
  accessToken: string | null;
  user: any | null;
  setAccessToken: (token: string | null) => void;
  setUser: (user: any | null) => void;
};

const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  setAccessToken: (token) => set({ accessToken: token }),
  setUser: (user) => set({ user }),
}));

export default useAuthStore;
