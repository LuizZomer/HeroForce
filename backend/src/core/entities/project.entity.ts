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

  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'description', type: 'varchar', length: 255 })
  description: string;

  @Column({ name: 'status', type: 'enum', enum: ProjectStatusEnum })
  status: ProjectStatusEnum;

  @Column({ name: 'responsible_id', type: 'int' })
  responsibleId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'responsible_id' })
  user: User;

  @OneToMany(() => ProjectGoal, (goal) => goal.project, { cascade: true })
  goals: ProjectGoal[];
}
