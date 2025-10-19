import { api } from "@/shared/services/api";
import { IProjectGoalForm } from "../../hooks/form/project-goal-form.hook";

export const createProjectGoalRequest = async (data: IProjectGoalForm) => {
  const res = await api.post(`/project-goal/${data.id}`, {
    type: data.type,
    targetValue: Number(data.targetValue),
    currentValue: Number(data.currentValue),
    deadline: new Date(data.deadline),
    achieved: data.achieved,
  });

  return res.data;
};
