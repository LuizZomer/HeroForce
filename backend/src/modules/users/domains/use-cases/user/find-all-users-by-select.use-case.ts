import { Inject, Injectable } from '@nestjs/common';
import { UsersGatewayInterface } from 'src/modules/users/infra/gateway/user/users-gateway.interface';

@Injectable()
export class FindAllBySelectUserUseCase {
  constructor(
    @Inject('UsersGatewayInterface')
    private readonly usersGateway: UsersGatewayInterface,
  ) {}

  async execute() {
    return this.usersGateway.findAllForSelect();
  }
}
