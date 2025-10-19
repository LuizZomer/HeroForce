import { GoalType } from "./goal-type";
import { ProjectStatusEnum } from "./project-status.enum";

export interface IProjectGoal {
  id: number;
  type: GoalType;
  targetValue: string;
  currentValue: string;
  deadline: string;
  achieved: boolean;
}

export interface IProject {
  id: number;
  name: string;
  description: string;
  status: ProjectStatusEnum;
  createdAt: string;
  user: {
    id: number;
    name: string;
  };
  goals: IProjectGoal[];
}
