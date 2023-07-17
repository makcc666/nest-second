import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { FILES_FOLDER_NAME_FROM_PROJECT_ROOT, FILES_UPLOAD_PROCESS_ERROR } from './files.constants';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {
	async createFile(file): Promise<string> {
		try {
			const fileName = uuid.v4() + '.jpg';
			const filePath = path.resolve(__dirname, '..', FILES_FOLDER_NAME_FROM_PROJECT_ROOT);
			if (!fs.existsSync(filePath)) {
				fs.mkdirSync(filePath, { recursive: true });
			}
			fs.writeFileSync(path.join(filePath, fileName), file.buffer);
			return fileName;
		}
		catch (e) {
			Logger.error('FilesService::createFile', e);
			throw new InternalServerErrorException(FILES_UPLOAD_PROCESS_ERROR);
		}
	}
}
