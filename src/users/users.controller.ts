import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.model';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { RolesList } from '../roles/roles.model';
import { AddRoleDto } from '../roles/dto/add-role.dto';
import { BanUserDto } from '../roles/dto/ban-user.dto';

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
	@Roles(RolesList.admin)
	@UseGuards(RolesGuard)
	@ApiOperation({summary:'Получение всех пользователей'})
	@ApiResponse({status:200,type:[User]})
	@Get()
	getAll(){
		return this.usersService.getAllUsers()
	}

	@Roles(RolesList.admin)
	@UseGuards(RolesGuard)
	@ApiOperation({summary:'Выдать роль'})
	@ApiResponse({status:200,})
	@Post('/role')
	addRole(@Body() dto:AddRoleDto){
		return this.usersService.addRole(dto)
	}

	@Roles(RolesList.admin)
	@UseGuards(RolesGuard)
	@ApiOperation({summary:'Забанить пользователя'})
	@ApiResponse({status:200,})
	@Post('/ban')
	banUser(@Body() dto:BanUserDto){
		return this.usersService.ban(dto)
	}
}
