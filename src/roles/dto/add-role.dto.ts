import { RolesList } from '../roles.model';

export class AddRoleDto {
	readonly value:RolesList;
	readonly userId: number;
}