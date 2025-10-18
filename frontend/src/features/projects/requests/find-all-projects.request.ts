import { api } from "@/shared/services/api";
import { ProjectStatusEnum } from "@/shared/types/project-status.enum";
import { IProject } from "@/shared/types/projects.type";

export interface IFindAllProjectsFilters {
  pageSize?: number;
  page?: number;
  responsibleId?: number;
  status?: ProjectStatusEnum;
}

export interface IFindAllProjectsResponse {
  projects: IProject[];
  pagination: IPagination;
}

export const findAllProjectsRequest = async (
  filters: IFindAllProjectsFilters
): Promise<IFindAllProjectsResponse> => {
  const res = await api.get("/projects", {
    params: {
      ...filters,
      pageSize: filters.pageSize || 2,
      page: filters.page || 1,
    },
  });

  return res.data.content;
};
