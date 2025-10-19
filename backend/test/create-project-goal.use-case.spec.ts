import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { ProjectGoal } from '../src/core/entities/project-goal.entity';
import { GoalType } from '../src/core/object-value/goal-type.enum';
import { CreateProjectGoalUseCase } from '../src/modules/projects/domains/use-cases/project-goal/create-project-goal.use-case';

describe('CreateProjectGoalUseCase', () => {
  let useCase: CreateProjectGoalUseCase;
  let projectsGoalGateway: { create: jest.Mock }; // ✅ tipagem do Jest Mock

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateProjectGoalUseCase,
        {
          provide: 'ProjectsGoalGatewayInterface',
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<CreateProjectGoalUseCase>(CreateProjectGoalUseCase);
    projectsGoalGateway = module.get('ProjectsGoalGatewayInterface');
  });

  it('✅ deve criar meta se a data for futura', async () => {
    const goal: Partial<ProjectGoal> = {
      deadline: new Date(Date.now() + 24 * 60 * 60 * 1000), // amanhã
      type: GoalType.AGILITY,
      targetValue: 100,
      currentValue: 0,
    };

    // Mock da criação
    projectsGoalGateway.create.mockResolvedValue({
      id: 1,
      ...goal,
    } as ProjectGoal);

    const result = await useCase.execute(goal);

    expect(projectsGoalGateway.create).toHaveBeenCalledWith(goal);
    expect(result).toHaveProperty('id', 1);
  });

  it('❌ deve lançar erro se a data for passada', async () => {
    const goal: Partial<ProjectGoal> = {
      deadline: new Date(Date.now() - 24 * 60 * 60 * 1000), // ontem
      type: GoalType.AGILITY,
      targetValue: 100,
      currentValue: 0,
    };

    await expect(useCase.execute(goal)).rejects.toThrow(BadRequestException);
    await expect(useCase.execute(goal)).rejects.toThrow(
      'A data de prazo não pode menor que a data atual',
    );

    expect(projectsGoalGateway.create).not.toHaveBeenCalled();
  });

  it('✅ deve permitir se a data for hoje', async () => {
    const today = new Date();
    const goal: Partial<ProjectGoal> = {
      deadline: today,
      type: GoalType.AGILITY,
      targetValue: 100,
      currentValue: 0,
    };

    projectsGoalGateway.create.mockResolvedValue({
      id: 1,
      ...goal,
    } as ProjectGoal);

    await expect(useCase.execute(goal)).resolves.not.toThrow();
    expect(projectsGoalGateway.create).toHaveBeenCalledTimes(1);
  });
});
