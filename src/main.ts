import * as process from 'process';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationClarifyingPipe } from './pipe/validation-clarifying.pipe';

async function start() {
	const timeStart = Date.now();
	const PORT = process.env.PORT || 5000;

	const app = await NestFactory.create(AppModule);

	const swaggerConfig = new DocumentBuilder()
		.setTitle('NestJS Second')
		.setDescription('Второй проект по обучению NestJS')
		.setVersion('1.0.0')
		.addTag('makcc666')
		.build();

	const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
	SwaggerModule.setup('/api/docs', app, swaggerDocument);

	app.useGlobalPipes(new ValidationClarifyingPipe())

	await app.listen(PORT, () => Logger.log(`Server start on port "${PORT}", "${Date.now() - timeStart}" ms`));
}

start();