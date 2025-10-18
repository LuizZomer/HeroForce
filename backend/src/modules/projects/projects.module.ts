import { Module } from '@nestjs/common';
import { Project } from 'src/core/entities/project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateProjectUseCase } from './domains/use-cases/project/create.use-case';
import { UpdateProjectUseCase } from './domains/use-cases/project/update.use-case';
import { ProjectController } from './presentation/controller/project.controller';
import { ProjectsGoalGatewayTypeorm } from './infra/gateway/project-goal/projects-goal-gateway.typeorm';
import { ProjectsGatewayTypeorm } from './infra/gateway/project/projects-gateway.typeorm';
import { CreateProjectGoalUseCase } from './domains/use-cases/project-goal/create.use-case';
import { ProjectGoal } from 'src/core/entities/project-goal.entity';
import { UsersModule } from '../users/users.module';
import { ProjectGoalController } from './presentation/controller/project-goal.controller';
import { UpdateProjectGoalUseCase } from './domains/use-cases/project-goal/update.use-case';
import { DeleteProjectGoalUseCase } from './domains/use-cases/project-goal/delete.use-case';
import { FindAllByUserProjectUseCase } from './domains/use-cases/project/find-all-by-user.use-case';
import { FindAllByProjectUseCase } from './domains/use-cases/project/find-all-by.use-case';

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
  FindAllByUserProjectUseCase,
];

@Module({
  imports: [TypeOrmModule.forFeature([Project, ProjectGoal]), UsersModule],
  controllers: [ProjectController, ProjectGoalController],
  providers: [...GatewayProviders, ...UseCaseProviders],
})
export class ProjectsModule {}
