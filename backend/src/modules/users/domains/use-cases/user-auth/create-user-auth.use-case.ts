import { Inject, Injectable } from '@nestjs/common';
import { UsersAuthGatewayInterface } from '../../../infra/gateway/user-auth/users-auth.interface';
import { UserAuth } from 'src/core/entities/user-auth.entity';

@Injectable()
export class CreateUserAuthUseCase {
  constructor(
    @Inject('UsersAuthGatewayInterface')
    private readonly usersAuthGateway: UsersAuthGatewayInterface,
  ) {}

  async execute(userAuth: Partial<UserAuth>): Promise<UserAuth> {
    return this.usersAuthGateway.create(userAuth);
  }
}
