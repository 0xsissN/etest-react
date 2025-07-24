import { create } from "zustand";
import type { iAuthState } from "../types/models";

export const useAuthStore = create<iAuthState>((set) => ({
  token: localStorage.getItem("token"),
  username: localStorage.getItem("username"),
  rol: localStorage.getItem("rol"),
  isAuthenticated: !!localStorage.getItem("token"),

  login: (token, username, rol) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("rol", rol);
    set({ token, username, rol, isAuthenticated: true });
  },

  logout: () => {
    localStorage.clear();
    set({ token: null, username: null, rol: null, isAuthenticated: false });
  },
}));
