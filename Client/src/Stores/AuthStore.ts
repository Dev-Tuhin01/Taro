import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../API/axiosAPI";
import toast from "react-hot-toast";

// User interface
export interface User {
  _id: string;
  userName: string;
  role: "child" | "parent";
  parentId?: string;
  taroDollar: number;
  food: number;
  _v: unknown;
}

// Store state
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Actions
export interface AuthAction {
  login: (credential: LoginCredential) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  updateUserLocally: (updatedData: Partial<User>) => void;
}

// Login input
export interface LoginCredential {
  userName: string;
  password: string;
}

// Register input
export interface RegisterData {
  userName: string;
  password: string;
  role: "child" | "parent";
  parentCode?: string;
}

// Zustand store
export const useAuthStore = create<AuthState & AuthAction>()(
  persist(
    (set, _get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      setLoading: (loading: boolean) => set({ isLoading: loading }),

      login: async (credential: LoginCredential) => {
        try {
          set({ isLoading: true });

          const response = await api.post("/auth/login", credential);
          const { user, token } = response.data;

          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });

          toast.success(`Welcome back, ${user.userName}`);
          return true;
        } catch (error: any) {
          set({ isLoading: false });

          const errorMessage =
            error.response?.data?.message ||
            error.response?.data?.error ||
            "Login failed";
          toast.error(errorMessage);
          return false;
        }
      },

      register: async (userData: RegisterData) => {
        try {
          set({ isLoading: true });

          const response = await api.post("/auth/register", userData);
          const { user, token } = response.data;

          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });

          toast.success(`Welcome, ${user.userName}`);
          return true;
        } catch (error: any) {
          set({ isLoading: false });

          const errorMessage =
            error.response?.data?.message ||
            error.response?.data?.error ||
            "Registration failed";
          toast.error(errorMessage);
          return false;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });

        delete api.defaults.headers.common["Authorization"];

        toast.success("Logged out successfully");
      },

      updateUserLocally: (updatedData: Partial<User>) => {
        set((state) => {
          if (!state.user) return state;

          return {
            user: {
              ...state.user,
              ...updatedData,
            },
          };
        });

      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
