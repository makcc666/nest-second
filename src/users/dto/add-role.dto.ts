import { RolesList } from '../../roles/roles.model';
import { IsNumber, IsString, Min } from 'class-validator';

export class AddRoleDto {
	@IsString({ message: 'Должно быть строкой' })
	readonly value: RolesList;

	@IsNumber({}, { message: 'Должно быть числовым значением' })
	@Min(1)
	readonly userId: number;
}