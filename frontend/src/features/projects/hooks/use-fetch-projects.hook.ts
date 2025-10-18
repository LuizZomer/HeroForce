import { useQuery } from "@tanstack/react-query";
import {
  findAllProjectsRequest,
  IFindAllProjectsFilters,
} from "../requests/find-all-projects.request";

export const useFetchProjects = (filters: IFindAllProjectsFilters) => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => findAllProjectsRequest(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    retryDelay: 1000,
  });
};
