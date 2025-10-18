import { ProjectGoal } from 'src/core/entities/project-goal.entity';
import { ProjectGoalResponseDto } from 'src/modules/projects/presentation/dto/output/create-project-goal-output.dto';

export interface ProjectsGoalGatewayInterface {
  create(projectGoal: Partial<ProjectGoal>): Promise<ProjectGoalResponseDto>;
  update(id: number, projectGoal: Partial<ProjectGoal>): Promise<void>;
  findOneBy(where: Partial<ProjectGoal>): Promise<ProjectGoal | null>;
  delete(id: number): Promise<void>;
}
