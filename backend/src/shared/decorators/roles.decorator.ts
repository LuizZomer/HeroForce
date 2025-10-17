import { SetMetadata } from '@nestjs/common';
import { Roles } from 'src/core/object-value/user-roles.enum';

export const ROLES_KEY = 'roles';
export const RolesAllowed = (...roles: Roles[]) =>
  SetMetadata(ROLES_KEY, roles);
