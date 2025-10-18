import { Project } from 'src/core/entities/project.entity';

export interface ProjectsGatewayInterface {
  findAllBy(where: Partial<Project>): Promise<Project[]>;
  findOneBy(where: Partial<Project>): Promise<Project | null>;
  create(project: Partial<Project>): Promise<Project>;
  update(id: number, project: Partial<Project>): Promise<void>;
}
