import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role, RolesList } from './roles.model';

@Injectable()
export class RolesService {
	constructor(@InjectModel(Role) private readonly roleRepository: typeof Role) {}

	async createRole(dto: CreateRoleDto) {
		const role = await this.roleRepository.create(dto);
		return role;
	}

	async getRoleByValue(value: RolesList) {
		const role = await this.roleRepository.findOne({ where: { value } });
		return role;
	}
}
