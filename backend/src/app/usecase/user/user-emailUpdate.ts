import { HttpStatus, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/app/repositories/iUserRepository';
import { CriptoProvider } from 'src/app/services/hash.provider';
import { EmailUpdateImput } from 'src/core/interfaces/user';
import { ERROR_CODES, ERROR_MESSAGES } from 'src/shared/constants/errosHttp';
import { ApiException } from 'src/shared/errors/apiExeptions';
import { UseCase } from '..';

@Injectable()
export class UserEmailUpdate implements UseCase<EmailUpdateImput, void> {
  constructor(
    private iUserRepository: IUserRepository,
    private criptoProvider: CriptoProvider,
  ) {}

  async exec({ email, id, password }: EmailUpdateImput): Promise<void> {
    const user = await this.iUserRepository.findById(id);

    if (user?.get.email == email) {
      throw new ApiException(ERROR_MESSAGES[ERROR_CODES.INVALID_EMAIL], HttpStatus.BAD_REQUEST, ERROR_CODES.INVALID_EMAIL);
    }
    if (!user) {
      throw new ApiException(ERROR_MESSAGES[ERROR_CODES.USER_NOT_FOUND], HttpStatus.BAD_REQUEST, ERROR_CODES.USER_NOT_FOUND);
    }

    const emailExists = await this.iUserRepository.findByEmail(email);

    if (emailExists) {
      throw new ApiException(ERROR_MESSAGES[ERROR_CODES.EMAIL_ALREADY_EXISTS], HttpStatus.BAD_REQUEST, ERROR_CODES.EMAIL_ALREADY_EXISTS);
    }

    const isValidPassword = await this.criptoProvider.compare(password, user.get.password);

    if (!isValidPassword) {
      throw new ApiException(ERROR_MESSAGES[ERROR_CODES.PASSWORD_INVALID], HttpStatus.BAD_REQUEST, ERROR_CODES.PASSWORD_INVALID);
    }

    user.update({ email: email });
    await this.iUserRepository.update(user);
  }
}
