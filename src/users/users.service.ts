import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {

	constructor(@InjectModel(User) private userRepository: typeof User) {}

	async createUser(dto: CreateUserDto):Promise<User> {
		const user = await this.userRepository.create(dto);
		return user;

	}
	async getAllUsers():Promise<User[]>{
		const users = await this.userRepository.findAll();
		return users;
	}
}
