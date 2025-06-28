import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../API/axiosAPI"; 
import toast from "react-hot-toast";
export interface User {
  _id: string;
  userName: string;
  role: "child" | "parent";
  parentId?: string;
  taroDollar: number;
  food: number;
  _v: unknown;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthAction {
  login: (credential: LoginCredential) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  setLoading: (loading:boolean) => void;
}

export interface LoginCredential {
  userName: string;
  password: string;
}

export interface RegisterData {
  userName: string;
  password: string;
  role: "child" | "parent";
  parentCode ?:string;
}

export const useAuthStore = create<AuthState & AuthAction>()(
  persist(
    (set,_get) => ({
      user:null,
      token:null,
      isAuthenticated:false,
      isLoading:false,

      setLoading: (loading:boolean) => set({isLoading:loading}),

      login: async (Credential:LoginCredential) => {
        try {
          set( { isLoading:true});

          const response = await api.post("/auth/login",Credential);
          const { user, token } = response.data;
          
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false
          })



          toast.success(`welcome back, ${user.userName}`);
          return true;
        } catch (error:any) {
          set({ isLoading:false });

          const errorMessage = error.response?.data?.error || "Login Failed";
          toast.error(errorMessage);
          return false;
        }
      },

      register: async (userData:RegisterData) => {
        try {
          set({ isLoading: true});

          const response = await api.post("/auth/register",userData);
          const { user, token} = response.data;

          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: true
          })

          toast.success(`welcome back, ${user.userName}`);
          return true;
        } catch (error:any) {
          set({ isLoading:false });

          const errorMessage = error.response?.data?.error || "Login Failed";
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
        
        toast.success('Logged out successfully');
      }, 
      
    }),
    {
        name: "auth-storage",
        partialize: (state) =>({
          user: state.user,
          token: state.token,
          isAuthenticated: state.isAuthenticated
        }),
      }
  )
)
