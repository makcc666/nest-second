import { User } from '../users/user.model';

export const USER_REGISTRATION_PASSWORD_SALT_LENGTH = 6;
export const EMAIL_ALREADY_USED_ERROR = 'Пользователь с таким email уже существует';
export const EMAIL_NOT_FOUND_ERROR = 'Пользователь с таким email не зарегистрирован';
export const FAILED_PASSWORD_CHECK_ERROR = 'Неверный пароль';
export const USER_IS_NOT_AUTHORIZED_ERROR = 'Вы не авторизованны';
export const USER_PERMISSION_ACCESS_DENY_ERROR = 'Нет доступа';
export const USER_INVALID_DATA_OF_AUTHORIZED_ERROR = 'Невалидные данные для авторизации';

export const ROLES_KEY_GUARD:keyof User = 'roles';

