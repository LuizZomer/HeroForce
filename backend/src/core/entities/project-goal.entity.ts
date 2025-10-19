import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GoalType } from '../object-value/goal-type.enum';
import { Project } from './project.entity';

@Entity('project_goals')
export class ProjectGoal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'type', type: 'enum', enum: GoalType })
  type: GoalType;

  @Column({ name: 'target_value', type: 'int' })
  targetValue: number;

  @Column({ name: 'current_value', type: 'int', default: 0 })
  currentValue: number;

  @Column({ name: 'deadline', type: 'timestamp', nullable: true })
  deadline: Date;

  @Column({ name: 'achieved', type: 'boolean', default: false })
  achieved: boolean;

  @Column({ name: 'project_id', type: 'int' })
  projectId: number;

  @ManyToOne(() => Project, (project) => project.goals)
  @JoinColumn({ name: 'project_id' })
  project: Project;
}
