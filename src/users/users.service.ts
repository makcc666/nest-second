import { HttpException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import { DEFAULT_USER_ROLE } from '../roles/roles.constants';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { ADD_ROLE_TO_USER_NOT_FOUND_ERROR, USER_BY_ID_NOT_FOUND_ERROR } from './user.constants';

@Injectable()
export class UsersService {

	constructor(@InjectModel(User) private readonly userRepository: typeof User, private readonly rolesService: RolesService) {}

	async createUser(dto: CreateUserDto): Promise<User> {
		const user = await this.userRepository.create(dto);
		const role = await this.rolesService.getRoleByValue(DEFAULT_USER_ROLE);
		await user.$set('roles', [role.id]);
		user.roles = [role];
		return user;
	}

	async getAllUsers(): Promise<User[]> {
		const users = await this.userRepository.findAll({ include: { all: true } });
		return users;
	}

	async getUserByEmail(email: User['email']): Promise<User | undefined> {
		const user = await this.userRepository.findOne({ where: { email }, include: { all: true } });
		return user;
	}

	async addRole(dto: AddRoleDto) {
		const user = await this.userRepository.findByPk(dto.userId);
		const role = await this.rolesService.getRoleByValue(dto.value);
		if (!role || !user) {
			throw new NotFoundException(ADD_ROLE_TO_USER_NOT_FOUND_ERROR);
		}

		await user.$add('role', role.id);
		return dto;
	}

	async ban(dto: BanUserDto) {
		const user = await this.userRepository.findByPk(dto.userId);
		if (!user) {
			throw new NotFoundException(USER_BY_ID_NOT_FOUND_ERROR);
		}
		user.banned = true;
		user.banReason = dto.reason;
		await user.save();
		return user;
	}
}
