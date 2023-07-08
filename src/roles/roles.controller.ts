import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';

@Controller('roles')
export class RolesController {
	constructor(private readonly rolesService: RolesService) {}

	@Post() @UsePipes(new ValidationPipe())
	async create(@Body() dto: CreateRoleDto) {
		return this.rolesService.createRole(dto);
	}

	@Get('/:value') @UsePipes(new ValidationPipe())
	async getByValue(@Param('value') value: CreateRoleDto['value']) {
		return this.rolesService.getRoleByValue(value);
	}
}
