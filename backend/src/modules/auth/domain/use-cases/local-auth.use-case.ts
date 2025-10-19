import { Injectable } from '@nestjs/common';
import { FindUserAuthByUseCase } from 'src/modules/users/domains/use-cases/user-auth/find-user-auth-by.use-case';
import { FindUserOneByUseCase } from 'src/modules/users/domains/use-cases/user/find-one-user-by-id.use-case';
import { HashUtil } from 'src/shared/utils/Hash.util';

@Injectable()
export class LocalAuthUseCase {
  constructor(
    private readonly findOneUserByIdUseCase: FindUserOneByUseCase,
    private readonly findUserAuthByUseCase: FindUserAuthByUseCase,
  ) {}

  async authenticate(email: string, password: string) {
    const user = await this.findOneUserByIdUseCase.execute({ email });
    if (!user) return null;

    const userAuth = await this.findUserAuthByUseCase.execute({
      userId: user.id,
    });
    if (!userAuth) return null;

    const isPasswordValid = await HashUtil.compare(
      password,
      userAuth.passwordHash,
    );

    if (!isPasswordValid) return null;

    return user;
  }
}
