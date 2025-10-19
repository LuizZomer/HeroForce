import { Module } from '@nestjs/common';
import { Project } from 'src/core/entities/project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateProjectUseCase } from './domains/use-cases/project/create-project.use-case';
import { UpdateProjectUseCase } from './domains/use-cases/project/update-project.use-case';
import { ProjectController } from './presentation/controller/project.controller';
import { ProjectsGoalGatewayTypeorm } from './infra/gateway/project-goal/projects-goal-gateway.typeorm';
import { ProjectsGatewayTypeorm } from './infra/gateway/project/projects-gateway.typeorm';
import { CreateProjectGoalUseCase } from './domains/use-cases/project-goal/create-project-goal.use-case';
import { ProjectGoal } from 'src/core/entities/project-goal.entity';
import { UsersModule } from '../users/users.module';
import { ProjectGoalController } from './presentation/controller/project-goal.controller';
import { UpdateProjectGoalUseCase } from './domains/use-cases/project-goal/update-project-goal.use-case';
import { DeleteProjectGoalUseCase } from './domains/use-cases/project-goal/delete-project-goal.use-case';
import { FindAllByProjectUseCase } from './domains/use-cases/project/find-all-by-project.use-case';

const GatewayProviders = [
  {
    provide: 'ProjectsGatewayInterface',
    useClass: ProjectsGatewayTypeorm,
  },
  {
    provide: 'ProjectsGoalGatewayInterface',
    useClass: ProjectsGoalGatewayTypeorm,
  },
];

const UseCaseProviders = [
  CreateProjectUseCase,
  UpdateProjectUseCase,
  CreateProjectGoalUseCase,
  UpdateProjectGoalUseCase,
  DeleteProjectGoalUseCase,
  FindAllByProjectUseCase,
];

@Module({
  imports: [TypeOrmModule.forFeature([Project, ProjectGoal]), UsersModule],
  controllers: [ProjectController, ProjectGoalController],
  providers: [...GatewayProviders, ...UseCaseProviders],
})
export class ProjectsModule {}
