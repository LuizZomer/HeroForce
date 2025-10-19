import { api } from "@/shared/services/api";
import { unmaskMoney } from "@/shared/utils/unmask-money";
import { IProjectGoalForm } from "../../hooks/form/project-goal-form.hook";

export const createProjectGoalRequest = async (data: IProjectGoalForm) => {
  const res = await api.post(`/project-goal/${data.id}`, {
    type: data.type,
    targetValue: unmaskMoney(data.targetValue),
    currentValue: unmaskMoney(data.currentValue),
    deadline: new Date(data.deadline),
    achieved: data.achieved,
  });

  return res.data;
};
