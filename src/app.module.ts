import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';
import { User } from './users/user.model';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { UserRoles } from './roles/user-roles.model';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { Post } from './posts/posts.model';
import { FilesService } from './files/files.service';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { FILES_FOLDER_NAME_FROM_PROJECT_ROOT } from './files/files.constants';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: `.${process.env.NODE_ENV}.env`,
		}),
		ServeStaticModule.forRoot({
			rootPath: path.resolve(__dirname, FILES_FOLDER_NAME_FROM_PROJECT_ROOT),
		}),
		SequelizeModule.forRoot({
			dialect: 'postgres',
			host: process.env.POSTGRES_HOST,
			port: +process.env.POSTGRES_PORT,
			username: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DB,
			models: [
				User,
				Role,
				UserRoles,
				Post,
			],
			autoLoadModels: true,
		}),
		UsersModule,
		RolesModule,
		AuthModule,
		PostsModule,
		FilesModule,
	], providers: [FilesService],
})
export class AppModule {}
