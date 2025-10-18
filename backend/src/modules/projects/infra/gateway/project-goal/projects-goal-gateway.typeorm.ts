import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectsGoalGatewayInterface } from './projects-goal-gateway.interface';
import { ProjectGoal } from 'src/core/entities/project-goal.entity';

@Injectable()
export class ProjectsGoalGatewayTypeorm
  implements ProjectsGoalGatewayInterface
{
  constructor(
    @InjectRepository(ProjectGoal)
    private readonly projectGoalRepository: Repository<ProjectGoal>,
  ) {}

  async create(projectGoal: Partial<ProjectGoal>): Promise<ProjectGoal> {
    return this.projectGoalRepository.save(projectGoal);
  }

  async update(id: number, projectGoal: Partial<ProjectGoal>): Promise<void> {
    await this.projectGoalRepository.update(id, projectGoal);
  }

  async findOneBy(where: Partial<ProjectGoal>): Promise<ProjectGoal | null> {
    return this.projectGoalRepository.findOneBy(where);
  }

  async delete(id: number): Promise<void> {
    await this.projectGoalRepository.delete(id);
  }
}
