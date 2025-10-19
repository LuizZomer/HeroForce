import { api } from "@/shared/services/api";
import { ProjectStatusEnum } from "@/shared/types/project-status.enum";
import { IProject } from "@/shared/types/projects.type";

export interface IFindAllProjectsFilters {
  responsibleId?: number;
  status?: ProjectStatusEnum;
}

export interface FiltersWithPagination extends IFindAllProjectsFilters {
  pageSize?: number;
  page?: number;
}

export interface IFindAllProjectsResponse {
  projects: IProject[];
  pagination: IPagination;
}

export const findAllProjectsRequest = async (
  filters: FiltersWithPagination
): Promise<IFindAllProjectsResponse> => {
  const res = await api.get("/projects", {
    params: {
      ...filters,
      pageSize: filters.pageSize || 6,
      page: filters.page || 1,
    },
  });

  return res.data.content;
};
