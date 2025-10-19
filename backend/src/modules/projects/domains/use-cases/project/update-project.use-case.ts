import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Project } from 'src/core/entities/project.entity';
import { ProjectsGatewayInterface } from 'src/modules/projects/infra/gateway/project/projects-gateway.interface';

@Injectable()
export class UpdateProjectUseCase {
  constructor(
    @Inject('ProjectsGatewayInterface')
    private readonly projectsGateway: ProjectsGatewayInterface,
  ) {}

  async execute(project: Partial<Project>): Promise<void> {
    await this.validateProject(project);

    return this.projectsGateway.update(project.id!, project);
  }

  private async validateProject(project: Partial<Project>): Promise<void> {
    const projectExists = await this.projectsGateway.findOneBy({
      id: project.id!,
    });
    if (!projectExists) {
      throw new BadRequestException('Projeto não encontrado');
    }
  }
}
