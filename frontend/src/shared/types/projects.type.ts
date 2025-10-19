import { GoalType } from "./goal-type";
import { ProjectStatusEnum } from "./project-status.enum";

export interface IProjectGoal {
  id: number;
  type: GoalType;
  targetValue: string;
  currentValue: string;
  deadline: string;
  progress: number;
  achieved: boolean;
}

export interface IProject {
  id: number;
  name: string;
  description: string;
  status: ProjectStatusEnum;
  createdAt: string;
  totalProgress: number;
  user: {
    id: number;
    name: string;
  };
  goals: IProjectGoal[];
}
