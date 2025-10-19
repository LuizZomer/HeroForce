import { api } from "@/shared/services/api";
import { IProjectForm } from "../../hooks/form/project-form.hook";

export const updateProjectRequest = async (data: IProjectForm) => {
  const res = await api.put(`/projects/${data.id}`, {
    name: data.name,
    description: data.description,
    status: data.status,
    responsibleId: Number(data.responsibleId),
  });

  return res.data;
};
