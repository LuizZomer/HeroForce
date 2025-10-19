import { useQuery } from "@tanstack/react-query";
import {
  findAllProjectsRequest,
  FiltersWithPagination,
} from "../requests/project/find-all-projects.request";

export const useFetchProjects = (filters: FiltersWithPagination) => {
  return useQuery({
    queryKey: ["projects", filters.page],
    queryFn: async () => findAllProjectsRequest(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    retryDelay: 1000,
  });
};
