import { useQuery } from "@tanstack/react-query";
import { findAllResponsiblesForSelectRequest } from "../services/requests/find-all-responsible-for-select.request";
import { useAuth } from "./use-auth.hook";

export const useResponsiblesForSelect = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["responsibles-for-select"],
    queryFn: findAllResponsiblesForSelectRequest,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    retryDelay: 1000,
    enabled: user?.role === "ADMIN",
  });
};
