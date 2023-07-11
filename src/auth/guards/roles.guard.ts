import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ROLES_KEY_GUARD, USER_INVALID_DATA_OF_AUTHORIZED_ERROR, USER_IS_NOT_AUTHORIZED_ERROR } from '../auth.constants';
import { Reflector } from '@nestjs/core';
import { Role } from '../../roles/roles.model';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private readonly jwtService: JwtService, private readonly reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY_GUARD, [
			context.getHandler(),
			context.getClass(),
		]);
		if (!requiredRoles) {
			return true;
		}

		const req = context.switchToHttp().getRequest();
		const authHeader = req.headers['authorization'];
		if (typeof authHeader !== 'string' || authHeader.length < 1) throw new UnauthorizedException(USER_INVALID_DATA_OF_AUTHORIZED_ERROR);

		const [bearer, token] = authHeader.split(' ');
		if (!bearer || !token) throw new UnauthorizedException(USER_INVALID_DATA_OF_AUTHORIZED_ERROR);

		try {
			req.user = this.jwtService.verify(token);
			console.log("req.user[ROLES_KEY_GUARD]::",req.user[ROLES_KEY_GUARD]);
			return req.user[ROLES_KEY_GUARD].some(role => requiredRoles.includes(role.value));
		}
		catch {
			throw new UnauthorizedException(USER_IS_NOT_AUTHORIZED_ERROR);
		}
	}

}