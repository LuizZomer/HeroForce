import { Inject, Injectable } from '@nestjs/common';
import { ProjectsGatewayInterface } from 'src/modules/projects/infra/gateway/project/projects-gateway.interface';
import { FindAllByProjectDto } from 'src/modules/projects/presentation/dto/input/find-all-by.use-case';
import { Paginator } from 'src/shared/utils/paginator';

@Injectable()
export class FindAllByProjectUseCase {
  constructor(
    @Inject('ProjectsGatewayInterface')
    private readonly projectsGateway: ProjectsGatewayInterface,
  ) {}

  async execute(
    where: Omit<FindAllByProjectDto, 'pageSize' | 'page'>,
    pagination: { pageSize: number; page: number },
  ) {
    const paginator = this.createPaginator(pagination);
    const { limit } = paginator.getPaginationForFilter();
    const pageNumber = paginator.getCurrentPage();

    const [projects, total] = await this.projectsGateway.findAllBy(
      where,
      pageNumber,
      limit,
    );

    paginator.setTotalItems(total);

    const mappedProjects = projects.map((project) => {
      const goalsWithProgress = project.goals.map((goal) => ({
        ...goal,
        progress: this.createPercentage(goal.currentValue, goal.targetValue),
      }));

      const totalProgress = this.calculateTotalProgress(goalsWithProgress);

      return {
        ...project,
        goals: goalsWithProgress,
        totalProgress,
      };
    });

    return {
      projects: mappedProjects,
      pagination: paginator.getPagination(),
    };
  }

  private createPaginator(dto: { pageSize: number; page: number }) {
    const { pageSize, page } = dto;
    const paginator = new Paginator({
      pageSize,
      pageSizeLimit: 10,
    });

    paginator.goToPage(page);

    return paginator;
  }

  private createPercentage(current: number, target: number): number {
    if (target === 0) return 0;
    return Math.min((current / target) * 100, 100);
  }

  private calculateTotalProgress(goals: { progress: number }[]): number {
    if (!goals.length) return 0;
    const total = goals.reduce((sum, g) => sum + g.progress, 0);
    return Math.round(total / goals.length);
  }
}
