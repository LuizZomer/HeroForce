import { createContext } from "react";

interface IAuthContext {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  signIn: (data: { email: string; password: string }) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);
