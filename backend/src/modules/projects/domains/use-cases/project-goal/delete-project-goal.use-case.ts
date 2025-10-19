import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProjectsGoalGatewayInterface } from 'src/modules/projects/infra/gateway/project-goal/projects-goal-gateway.interface';

@Injectable()
export class DeleteProjectGoalUseCase {
  constructor(
    @Inject('ProjectsGoalGatewayInterface')
    private readonly projectsGoalGateway: ProjectsGoalGatewayInterface,
  ) {}

  async execute(id: number) {
    await this.projectsGoalGateway.delete(id);
  }

  private async validateProjectGoal(id: number): Promise<void> {
    const projectGoalExists = await this.projectsGoalGateway.findOneBy({
      id,
    });

    if (!projectGoalExists) {
      throw new NotFoundException('Meta não encontrada');
    }
  }
}
