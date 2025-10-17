import { User } from 'src/core/entities/user.entity';

export interface UsersGatewayInterface {
  findOneBy(where: Partial<User>): Promise<User | null>;
  create(user: Partial<User>): Promise<User>;
}
