import { Inject, Injectable } from '@nestjs/common';
import { ProjectGoal } from 'src/core/entities/project-goal.entity';
import { ProjectsGoalGatewayInterface } from 'src/modules/projects/infra/gateway/project-goal/projects-goal-gateway.interface';
import { ProjectGoalResponseDto } from 'src/modules/projects/presentation/dto/output/create-project-goal-output.dto';
import { responseMapperDto } from 'src/shared/utils/responseMapperDto';

@Injectable()
export class CreateProjectGoalUseCase {
  constructor(
    @Inject('ProjectsGoalGatewayInterface')
    private readonly projectsGoalGateway: ProjectsGoalGatewayInterface,
  ) {}

  async execute(goal: Partial<ProjectGoal>) {
    const projectGoal = await this.projectsGoalGateway.create(goal);
    return responseMapperDto(ProjectGoalResponseDto, projectGoal);
  }
}
