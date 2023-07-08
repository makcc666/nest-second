import { IsEnum, IsString } from 'class-validator';
import { RolesList } from '../roles.model';

export class CreateRoleDto {
	@IsEnum(RolesList) value: RolesList;
	@IsString() description: string;
}