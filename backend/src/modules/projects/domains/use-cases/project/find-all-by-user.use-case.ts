import { Inject, Injectable } from '@nestjs/common';
import { ProjectsGatewayInterface } from 'src/modules/projects/infra/gateway/project/projects-gateway.interface';
import { responseMapperDto } from 'src/shared/utils/responseMapperDto';
import { FindAllProjectsByUserDto } from 'src/modules/projects/presentation/dto/output/find-all-projects-by-user.dto';
import { Paginator } from 'src/shared/utils/paginator';

@Injectable()
export class FindAllByUserProjectUseCase {
  constructor(
    @Inject('ProjectsGatewayInterface')
    private readonly projectsGateway: ProjectsGatewayInterface,
  ) {}

  async execute(
    responsibleId: number,
    pagination: { pageSize: number; page: number },
  ) {
    const paginator = this.createPaginator(pagination);
    const { limit } = paginator.getPaginationForFilter();
    const pageNumber = paginator.getCurrentPage();

    const [projects, total] = await this.projectsGateway.findAllBy(
      { responsibleId },
      pageNumber,
      limit,
    );

    paginator.setTotalItems(total);

    const mappedProjects = responseMapperDto(
      FindAllProjectsByUserDto,
      projects,
    ) as FindAllProjectsByUserDto[];

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
}
