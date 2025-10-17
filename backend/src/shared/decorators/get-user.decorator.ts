import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ReqWithUser } from '../types/interface/reqWithUser.interface';

export const GetUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<ReqWithUser>();
    return req.user;
  },
);
