import { User } from 'src/core/entities/user.entity';

export interface ReqWithUser extends Request {
  user: User;
}
