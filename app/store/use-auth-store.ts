import { create } from "zustand";

interface AuthState {
  user: {
    name: string;
    email: string;
    avatar: string;
    role: string;
  } | null;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: {
    name: "Alex Rivera",
    email: "alex@agency.com",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    role: "Project Lead",
  },
  isAuthenticated: true,
  login: () =>
    set({
      isAuthenticated: true,
      user: {
        name: "Alex Rivera",
        email: "alex@agency.com",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
        role: "Project Lead",
      },
    }),
  logout: () => set({ isAuthenticated: false, user: null }),
}));
