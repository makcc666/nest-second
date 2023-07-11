import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'process';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Module({
	controllers: [AuthController], providers: [AuthService], imports: [
		forwardRef(()=>UsersModule),
		JwtModule.register({
			secret: process.env.AUTH_JWT_PRIVATE_KEY || 'SECRET', signOptions: {
				expiresIn: process.env.AUTH_JWT_EXPIRE_TOKEN || '24h',
			},
		}),
	], exports: [
		AuthModule,JwtModule
	],
})
export class AuthModule {}
