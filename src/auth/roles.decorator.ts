import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY_GUARD } from './auth.constants';
import {  RolesList } from '../roles/roles.model';

export const Roles = (...roles: Array<RolesList>) => SetMetadata(ROLES_KEY_GUARD, roles);