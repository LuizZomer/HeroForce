import { useState } from "react";
import { AuthContext } from "./auth.context";
import type { LoginSchema } from "../../hooks/use-login.hook";
import { loginRequest } from "../../requests/login.request";
import { logoutRequest } from "../../requests/logout.requests";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const signIn = async (data: LoginSchema) => {
    await loginRequest(data).then((user) => {
      setUser(user);
    });
  };

  const signOut = async () => {
    await logoutRequest();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
