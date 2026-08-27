"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface User {
  name: string;
  email: string;
  avatar: string;
  role: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
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
    }),
    {
      name: "auth-storage",
    },
  ),
);
