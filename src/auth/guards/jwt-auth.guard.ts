import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { USER_INVALID_DATA_OF_AUTHORIZED_ERROR, USER_IS_NOT_AUTHORIZED_ERROR } from '../auth.constants';

@Injectable()
export class JwtAuthGuard implements CanActivate {
	constructor(private readonly jwtService: JwtService) {}

	canActivate(context: ExecutionContext): boolean {
		const req = context.switchToHttp().getRequest();
		const authHeader = req.headers['authorization'];
		if (typeof authHeader !== 'string' || authHeader.length < 1) throw new UnauthorizedException(USER_INVALID_DATA_OF_AUTHORIZED_ERROR);

		const [bearer, token] = authHeader.split(' ');
		if (!bearer || !token) throw new UnauthorizedException(USER_INVALID_DATA_OF_AUTHORIZED_ERROR);

		try {
			req.user = this.jwtService.verify(token);
		}
		catch {
			throw new UnauthorizedException(USER_IS_NOT_AUTHORIZED_ERROR);
		}
		return true;
	}

}