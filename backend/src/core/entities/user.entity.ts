import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Roles } from '../object-value/user-roles.enum';
import { UserAuth } from './user-auth.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ name: 'id', unsigned: true, type: 'integer' })
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'email', type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ name: 'role', enum: Roles, default: Roles.USER })
  role: Roles;

  @Column({ name: 'character_name' })
  characterName: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => UserAuth, (userAuth) => userAuth.user)
  userAuth: UserAuth;
}
