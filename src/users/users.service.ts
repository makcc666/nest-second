import { Inject, Injectable } from '@nestjs/common';
import { User } from './user.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import { DEFAULT_USER_ROLE } from '../roles/roles.constants';

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
}
