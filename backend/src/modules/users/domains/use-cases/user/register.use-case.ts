import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { UserAuth } from 'src/core/entities/user-auth.entity';
import { User } from 'src/core/entities/user.entity';
import { Roles } from 'src/core/object-value/user-roles.enum';
import { CreateUserAuthUseCase } from 'src/modules/users/domains/use-cases/user-auth/create-user-auth.use-case';
import { UsersGatewayInterface } from 'src/modules/users/infra/gateway/user/users-gateway.interface';
import { CreateUserDto } from 'src/modules/users/presentation/dto/input/create-user.dto';
import { RegisterResponseDto } from 'src/modules/users/presentation/dto/output/register-response.dto';
import { HashUtil } from 'src/shared/utils/Hash.util';

@Injectable()
export class RegisterUseCase {
  private readonly logger = new Logger(RegisterUseCase.name);

  constructor(
    @Inject('UsersGatewayInterface')
    private readonly usersGateway: UsersGatewayInterface,
    private readonly createUserAuthUseCase: CreateUserAuthUseCase,
  ) {}

  async execute(
    dto: CreateUserDto,
    role: Roles,
  ): Promise<RegisterResponseDto['content']> {
    await this.validateUser(dto.email);

    const userCreated = await this.usersGateway.create({
      ...dto,
      role,
    });

    await this.createUserAuth(dto.password, userCreated);

    return this.outputMapper(userCreated);
  }

  private async validateUser(email: string) {
    const user = await this.usersGateway.findOneBy({ email });
    if (user) {
      this.logger.warn(
        `Tentativa de cadastro com email já existente: ${email}`,
      );

      throw new BadRequestException('Não foi possível processar o cadastro');
    }
  }

  async createUserAuth(password: string, userCreated: User) {
    const userAuth = new UserAuth({
      userId: userCreated.id,
      passwordHash: await HashUtil.hash(password),
    });
    return this.createUserAuthUseCase.execute(userAuth);
  }

  private outputMapper(user: User): RegisterResponseDto['content'] {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
}
