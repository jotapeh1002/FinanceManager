import { HttpStatus, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/app/repositories/iUserRepository';
import { CriptoProvider } from 'src/app/services/hash.provider';
import { PasswordUpdate } from 'src/core/interfaces/user';
import { ERROR_CODES, ERROR_MESSAGES } from 'src/shared/constants/errosHttp';
import { ApiException } from 'src/shared/errors/apiExeptions';

@Injectable()
export class UserPasswordUpdate {
  constructor(
    private iUserRepository: IUserRepository,
    private criptoProvider: CriptoProvider,
  ) {}

  async exec({ id, newPassword, password }: PasswordUpdate): Promise<void> {
    const user = await this.iUserRepository.findById(id);
    if (!user) throw new ApiException(ERROR_MESSAGES[ERROR_CODES.USER_NOT_FOUND], HttpStatus.BAD_REQUEST, ERROR_CODES.USER_NOT_FOUND);

    const isValidPassword = await this.criptoProvider.compare(password, user.get.password);
    if (!isValidPassword) throw new ApiException(ERROR_MESSAGES[ERROR_CODES.PASSWORD_INVALID], HttpStatus.BAD_REQUEST, ERROR_CODES.PASSWORD_INVALID);

    user.update({ password: await this.criptoProvider.hash(newPassword) });
    await this.iUserRepository.update(user);
  }
}
