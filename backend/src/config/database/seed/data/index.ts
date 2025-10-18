import { Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { dataSource } from '../data-source';
import { User } from 'src/core/entities/user.entity';
import { UserAuth } from 'src/core/entities/user-auth.entity';
import { Project } from 'src/core/entities/project.entity';
import { ProjectGoal } from 'src/core/entities/project-goal.entity';
import { GoalType } from 'src/core/object-value/goal-type.enum';
import { ProjectStatusEnum } from 'src/core/object-value/project-status.enum';
import { Roles } from 'src/core/object-value/user-roles.enum';

const logger = new Logger('SeedData');

const runSeed = async () => {
  try {
    await dataSource.initialize();
    logger.log('📦 Database connected');

    const userRepo = dataSource.getRepository(User);
    const userAuthRepo = dataSource.getRepository(UserAuth);
    const projectRepo = dataSource.getRepository(Project);
    const goalRepo = dataSource.getRepository(ProjectGoal);

    logger.log('📦 Creating users...');
    // 🧑 Cria usuários
    const adminUser = userRepo.create({
      name: 'Admin Hero',
      email: 'admin@hero.com',
      role: Roles.ADMIN,
      characterName: 'The Strategist',
    });
    await userRepo.save(adminUser);

    const normalUser = userRepo.create({
      name: 'Player One',
      email: 'player@hero.com',
      role: Roles.USER,
      characterName: 'Shadow Knight',
    });
    await userRepo.save(normalUser);

    logger.log('📦 Creating authentications...');
    // 🔐 Cria autenticações
    const adminAuth = userAuthRepo.create({
      userId: adminUser.id,
      passwordHash: await bcrypt.hash('admin123', 10),
    });
    const userAuth = userAuthRepo.create({
      userId: normalUser.id,
      passwordHash: await bcrypt.hash('player123', 10),
    });
    await userAuthRepo.save([adminAuth, userAuth]);

    logger.log('📦 Creating projects...');
    // 🏗️ Cria projetos
    const project1 = projectRepo.create({
      name: 'Hero Academy',
      description: 'Training program for new heroes',
      status: ProjectStatusEnum.IN_PROGRESS,
      responsibleId: adminUser.id,
    });
    await projectRepo.save(project1);

    const project2 = projectRepo.create({
      name: 'Shadow Ops',
      description: 'Stealth mission to recover artifacts',
      status: ProjectStatusEnum.PENDING,
      responsibleId: normalUser.id,
    });
    await projectRepo.save(project2);

    logger.log('📦 Creating goals...');
    // 🎯 Cria metas (goals)
    const goals = goalRepo.create([
      {
        type: GoalType.AGILITY,
        targetValue: 10,
        currentValue: 2,
        achieved: false,
        projectId: project1.id,
      },
      {
        type: GoalType.AMBITION,
        targetValue: 50,
        currentValue: 30,
        achieved: false,
        projectId: project2.id,
      },
    ]);

    await goalRepo.save(goals);

    logger.log('🌱 Seed completed successfully!');
  } catch (error) {
    logger.error('❌ Error running seed', error);
  } finally {
    await dataSource.destroy();
    logger.log('🧹 Database connection closed');
  }
};

runSeed();
