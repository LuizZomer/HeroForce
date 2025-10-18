import { ProjectStatusEnum } from "./project-status.enum";

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
}
