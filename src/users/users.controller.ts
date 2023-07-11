import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.model';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { RolesList } from '../roles/roles.model';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@ApiOperation({summary:'Создание пользователя'})
	@ApiResponse({status:200,type:User})
	@UsePipes(new ValidationPipe())
	@Post() create(@Body() userDto: CreateUserDto) {
		return this.usersService.createUser(userDto);
	}

	// @UseGuards(JwtAuthGuard)
	@Roles(RolesList.admin, RolesList.user)
	@UseGuards(RolesGuard)
	@ApiOperation({summary:'Получение всех пользователей'})
	@ApiResponse({status:200,type:[User]})
	@Get()
	getAll(){
		return this.usersService.getAllUsers()
	}
}
