import { meRequest } from "@/features/auth/requests/me.request";
import { FullScreenSpinner } from "@/shared/components/Loader/FullScreenSpinner.loader";
import { useAuth } from "@/shared/hooks/use-auth.hook";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const RequiredAuth = ({ children }: { children: React.ReactNode }) => {
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const validateToken = async () => {
    setLoading(true);
    try {
      const user = await meRequest();
      setUser(user);
    } catch {
      setUser(null);
      navigate("/auth");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    validateToken();
  }, []);

  return loading ? <FullScreenSpinner /> : <>{children}</>;
};
