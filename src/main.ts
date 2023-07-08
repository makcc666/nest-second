import * as process from 'process';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function start() {
	const timeStart = Date.now();
	const PORT = process.env.PORT || 5000;
	const app = await NestFactory.create(AppModule);
	await app.listen(PORT, () => Logger.log(`Server start on port "${PORT}", "${Date.now() - timeStart}" ms`));
}

start();