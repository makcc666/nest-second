import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {

	@ApiProperty({ example: 'example@email.com', description: 'Email' })
	@IsString()
	email: string;

	@ApiProperty({ example: '123456', description: 'Пароль' })
	@IsString()
	password: string;
}