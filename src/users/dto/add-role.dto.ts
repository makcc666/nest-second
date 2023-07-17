import { RolesList } from '../../roles/roles.model';

export class AddRoleDto {
	readonly value:RolesList;
	readonly userId: number;
}