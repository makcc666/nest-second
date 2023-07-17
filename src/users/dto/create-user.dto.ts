import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';
import { USER_PASSWORD_VALIDATION } from '../user.constants';

export class CreateUserDto {

	@ApiProperty({
		example: 'example@email.com', description: 'Email',
	}) @IsString({ message: 'Должно быть строкой' })
	@IsEmail({},{message:'Некорректный email'})
	readonly email: string;

	@ApiProperty({
		example: '123456', description: 'Пароль',
	}) @IsString({ message: 'Должна быть строкой' }) @Length(USER_PASSWORD_VALIDATION.length.min, USER_PASSWORD_VALIDATION.length.max, {
		message: `Не меньше ${USER_PASSWORD_VALIDATION.length.min} и не более ${USER_PASSWORD_VALIDATION.length.max}`,
	}) readonly password: string;
}