import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from '../exeptions/validation.exception';

@Injectable()
export class ValidationClarifyingPipe implements PipeTransform<any> {
	async transform(value: any, metadata: ArgumentMetadata): Promise<string> | never {
		const obj = plainToClass(metadata.metatype, value);
		const errors = await validate(obj);

		if (errors.length) {
			const messages = errors.map(err => `${err.property} — ${Object.values(err.constraints).join(', ')}`);
			throw new ValidationException(messages);
		}

		return value;
	}

}