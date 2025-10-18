import { meRequest } from "@/features/auth/requests/me.request";
import { useAuth } from "@/shared/hooks/useAuth.hook";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const RequiredAuth = ({ children }: { children: React.ReactNode }) => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const validateToken = async () => {
    await meRequest()
      .then((user) => {
        setUser(user);
      })
      .catch(() => {
        navigate("/auth");
      });
  };

  useEffect(() => {
    if (!user) {
      validateToken();
    }
  }, [user]);

  return <>{children}</>;
};
