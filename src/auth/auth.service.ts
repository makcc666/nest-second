import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import {
	EMAIL_ALREADY_USED_ERROR, EMAIL_NOT_FOUND_ERROR, FAILED_PASSWORD_CHECK_ERROR, USER_REGISTRATION_PASSWORD_SALT_LENGTH,
} from './auth.constants';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/user.model';

interface IAuthUserPayload {
	email: User['email'];
	id: User['id'];
	roles: User['roles'];
}

@Injectable()
export class AuthService {
	constructor(private userService: UsersService, private jwtService: JwtService) {}

	async login(userDto: CreateUserDto) {
		const user = await this.validateUser(userDto);
		return await this.generateToken(user);
	}

	async registration(userDto: CreateUserDto) {
		const candidate = await this.userService.getUserByEmail(userDto.email);
		if (candidate) {
			throw new HttpException(EMAIL_ALREADY_USED_ERROR, HttpStatus.BAD_REQUEST);
		}
		const hashPassword = await bcrypt.hash(userDto.password, USER_REGISTRATION_PASSWORD_SALT_LENGTH);
		const user = await this.userService.createUser({ ...userDto, password: hashPassword });
		return await this.generateToken(user);
	}

	private async generateToken(user: User): Promise<{
		token: string
	}> {
		const payload: IAuthUserPayload = { email: user.email, id: user.id, roles: user.roles };
		return {
			token: await this.jwtService.signAsync(payload),
		};
	}

	private async validateUser(userDto: CreateUserDto) {
		const user = await this.userService.getUserByEmail(userDto.email);
		if (!user) {
			throw new UnauthorizedException(EMAIL_NOT_FOUND_ERROR);
		}
		const passwordEquals = await bcrypt.compare(userDto.password, user.password);
		if (!passwordEquals) throw new UnauthorizedException(FAILED_PASSWORD_CHECK_ERROR);
		return user;
	}
}

