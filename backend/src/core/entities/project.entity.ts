import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProjectStatusEnum } from '../object-value/project-status.enum';
import { ProjectGoal } from './project-goal.entity';
import { User } from './user.entity';

@Entity({ name: 'projects' })
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: ProjectStatusEnum })
  status: ProjectStatusEnum;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => ProjectGoal, (goal) => goal.project, { cascade: true })
  goals: ProjectGoal[];
}
