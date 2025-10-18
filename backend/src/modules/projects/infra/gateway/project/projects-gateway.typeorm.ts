import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectsGatewayInterface } from './projects-gateway.interface';
import { Project } from 'src/core/entities/project.entity';

@Injectable()
export class ProjectsGatewayTypeorm implements ProjectsGatewayInterface {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async findAllBy(where: Partial<Project>): Promise<Project[]> {
    return this.projectRepository.find({ where });
  }

  async findOneBy(where: Partial<Project>): Promise<Project | null> {
    return this.projectRepository.findOne({ where });
  }

  async create(project: Partial<Project>): Promise<Project> {
    return this.projectRepository.save(project);
  }

  async update(id: number, project: Partial<Project>): Promise<void> {
    await this.projectRepository.update(id, project);
  }
}
