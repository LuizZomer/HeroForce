import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuth } from 'src/core/entities/user-auth.entity';
import { User } from 'src/core/entities/user.entity';
import { CreateUserAuthUseCase } from './domains/use-cases/user-auth/create-user-auth.use-case';
import { FindUserAuthByUseCase } from './domains/use-cases/user-auth/find-user-auth-by.use-case';
import { FindUserOneByUseCase } from './domains/use-cases/user/find-one-by-id.use-case';
import { RegisterUseCase } from './domains/use-cases/user/register.use-case';
import { UsersAuthGatewayTypeorm } from './infra/gateway/user-auth/users-auth.gateway';
import { UsersGatewayTypeorm } from './infra/gateway/user/users-gateway.typeorm';
import { UserController } from './presentation/controllers/user.controller';
import { FindAllBySelectUserUseCase } from './domains/use-cases/user/find-all-by-select.use-case';

const GatewayProviders = [
  {
    provide: 'UsersGatewayInterface',
    useClass: UsersGatewayTypeorm,
  },
  {
    provide: 'UsersAuthGatewayInterface',
    useClass: UsersAuthGatewayTypeorm,
  },
];

const UseCaseProviders = [
  FindUserOneByUseCase,
  RegisterUseCase,
  CreateUserAuthUseCase,
  FindUserOneByUseCase,
  FindUserAuthByUseCase,
  FindAllBySelectUserUseCase,
];

@Module({
  imports: [TypeOrmModule.forFeature([User, UserAuth])],
  controllers: [UserController],
  providers: [...GatewayProviders, ...UseCaseProviders],
  exports: [...GatewayProviders, ...UseCaseProviders],
})
export class UsersModule {}
