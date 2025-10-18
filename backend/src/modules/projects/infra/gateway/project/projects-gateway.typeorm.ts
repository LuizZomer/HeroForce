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

  async findAllBy(
    where: Partial<Project>,
    page = 1,
    limit = 10,
  ): Promise<[Project[], number]> {
    const [data, total] = await this.projectRepository.findAndCount({
      where,
      relations: ['user'],
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return [data, total];
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
