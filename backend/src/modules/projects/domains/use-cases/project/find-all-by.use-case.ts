import { Inject, Injectable } from '@nestjs/common';
import { ProjectsGatewayInterface } from 'src/modules/projects/infra/gateway/project/projects-gateway.interface';
import { Project } from 'src/core/entities/project.entity';

@Injectable()
export class FindAllByProjectUseCase {
  constructor(
    @Inject('ProjectsGatewayInterface')
    private readonly projectsGateway: ProjectsGatewayInterface,
  ) {}

  async execute(where: Partial<Project>): Promise<Project[]> {
    return this.projectsGateway.findAllBy(where);
  }
}
