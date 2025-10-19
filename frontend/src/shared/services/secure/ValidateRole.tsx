import { useAuth } from "@/shared/hooks/use-auth.hook";

export const ValidateRole = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  return user?.role === "ADMIN" ? children : null;
};
