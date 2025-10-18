import { BadRequestException, Inject } from '@nestjs/common';
import { Project } from 'src/core/entities/project.entity';
import { ProjectsGoalGatewayInterface } from 'src/modules/projects/infra/gateway/project-goal/projects-goal-gateway.interface';
import { ProjectsGatewayInterface } from 'src/modules/projects/infra/gateway/project/projects-gateway.interface';
import { CreateProjectGoalDto } from 'src/modules/projects/presentation/dto/input/create-project-goal.dto';
import { CreateProjectDto } from 'src/modules/projects/presentation/dto/input/create-project.dto';
import { ProjectGoalResponseDto } from 'src/modules/projects/presentation/dto/output/create-project-goal-output.dto';
import { CreateProjectOutputDto } from 'src/modules/projects/presentation/dto/output/create-project-output.dto';
import { FindUserOneByUseCase } from 'src/modules/users/domains/use-cases/user/find-one-by-id.use-case';
import { responseMapperDto } from 'src/shared/utils/responseMapperDto';

export class CreateProjectUseCase {
  constructor(
    @Inject('ProjectsGatewayInterface')
    private readonly projectsGateway: ProjectsGatewayInterface,
    @Inject('ProjectsGoalGatewayInterface')
    private readonly projectsGoalGateway: ProjectsGoalGatewayInterface,
    private readonly findUserOneByUseCase: FindUserOneByUseCase,
  ) {}

  async execute(
    createProjectDto: CreateProjectDto,
  ): Promise<CreateProjectOutputDto> {
    await this.validateResponsible(createProjectDto.responsibleId);

    const projectCreated = await this.createProject(createProjectDto);

    let goalsCreated: ProjectGoalResponseDto[] = [];

    if (createProjectDto.goals.length > 0) {
      goalsCreated = await this.createProjectGoals(
        projectCreated.id,
        createProjectDto.goals,
      );
    }

    return this.outputMapper(projectCreated, goalsCreated);
  }

  async validateResponsible(responsibleId: number) {
    const user = await this.findUserOneByUseCase.execute({
      id: responsibleId,
    });

    if (!user) {
      throw new BadRequestException('Responsável não encontrado');
    }
  }

  async createProject(project: CreateProjectDto) {
    return this.projectsGateway.create({
      name: project.name,
      description: project.description,
      status: project.status,
      responsibleId: project.responsibleId,
    });
  }

  async createProjectGoals(
    projectId: number,
    goals: CreateProjectGoalDto[],
  ): Promise<ProjectGoalResponseDto[]> {
    const goalsCreated = await Promise.all(
      goals.map((goal) =>
        this.projectsGoalGateway.create({ ...goal, projectId }),
      ),
    );

    return responseMapperDto(
      ProjectGoalResponseDto,
      goalsCreated,
    ) as ProjectGoalResponseDto[];
  }

  outputMapper(
    project: Project,
    goals: ProjectGoalResponseDto[],
  ): CreateProjectOutputDto {
    return {
      ...project,
      goals,
    };
  }
}
