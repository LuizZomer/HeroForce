import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProjectGoal } from 'src/core/entities/project-goal.entity';
import { ProjectsGoalGatewayInterface } from 'src/modules/projects/infra/gateway/project-goal/projects-goal-gateway.interface';

@Injectable()
export class UpdateProjectGoalUseCase {
  constructor(
    @Inject('ProjectsGoalGatewayInterface')
    private readonly projectsGoalGateway: ProjectsGoalGatewayInterface,
  ) {}

  async execute(projectGoal: Partial<ProjectGoal>): Promise<void> {
    await this.validateProjectGoal(projectGoal);

    return this.projectsGoalGateway.update(projectGoal.id!, projectGoal);
  }

  private async validateProjectGoal(
    projectGoal: Partial<ProjectGoal>,
  ): Promise<void> {
    const projectGoalExists = await this.projectsGoalGateway.findOneBy({
      id: projectGoal.id,
    });

    if (!projectGoalExists) {
      throw new NotFoundException('Meta não encontrada');
    }
  }
}
