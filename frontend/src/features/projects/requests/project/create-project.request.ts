import { api } from "@/shared/services/api";
import { IProjectForm } from "../../hooks/form/project-form.hook";

export const createProjectRequest = async (data: IProjectForm) => {
  const res = await api.post("/projects", {
    name: data.name,
    description: data.description,
    status: data.status,
    responsibleId: Number(data.responsibleId),
    goals: data.goals.map((goal) => ({
      type: goal.type,
      targetValue: Number(goal.targetValue),
      currentValue: Number(goal.currentValue),
      deadline: new Date(goal.deadline),
    })),
  });

  return res.data;
};
