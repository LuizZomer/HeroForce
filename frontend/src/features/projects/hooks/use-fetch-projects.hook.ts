import { useQuery } from "@tanstack/react-query";
import {
  findAllProjectsRequest,
  FiltersWithPagination,
} from "../requests/project/find-all-projects.request";
import { useAuth } from "@/shared/hooks/use-auth.hook";

export const useFetchProjects = (filters: FiltersWithPagination) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["projects", filters.page, user?.id],
    queryFn: async () =>
      findAllProjectsRequest({
        ...filters,
        responsibleId: user?.role === "ADMIN" ? undefined : user?.id,
      }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    retryDelay: 1000,
    enabled: !!user,
  });
};
