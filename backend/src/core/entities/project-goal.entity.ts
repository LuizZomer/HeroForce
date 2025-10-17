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

  @Column({ type: 'enum', enum: GoalType })
  type: GoalType;

  @Column({ type: 'int' })
  targetValue: number;

  @Column({ type: 'int', default: 0 })
  currentValue: number;

  @Column({ type: 'timestamp', nullable: true })
  deadline: Date;

  @Column({ type: 'boolean', default: false })
  achieved: boolean;

  @ManyToOne(() => Project, (project) => project.goals)
  @JoinColumn({ name: 'project_id' })
  project: Project;
}
