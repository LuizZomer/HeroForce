import { BadRequestException, Inject, Injectable } from '@nestjs/common';
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
    if (goal.deadline && !this.validateDeadline(goal.deadline))
      throw new BadRequestException(
        'A data de prazo não pode menor que a data atual',
      );

    const projectGoal = await this.projectsGoalGateway.create(goal);
    return responseMapperDto(ProjectGoalResponseDto, projectGoal);
  }

  private validateDeadline(deadline: string | Date): boolean {
    const deadlineDate = new Date(deadline);
    const today = new Date();

    deadlineDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    return deadlineDate >= today;
  }
}
