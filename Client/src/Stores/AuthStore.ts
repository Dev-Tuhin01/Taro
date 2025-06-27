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
  name: string;
  password: string;
}

export interface RegisterData {
  name: string;
  password: string;
  role: "child" | "parent";
  parentCode ?:string;
}

