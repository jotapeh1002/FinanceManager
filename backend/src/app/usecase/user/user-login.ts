import { HttpStatus, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/app/repositories/iUserRepository';
import { CriptoProvider } from 'src/app/services/hash.provider';
import { LoginImput } from 'src/core/interfaces/user';
import { ERROR_CODES, ERROR_MESSAGES } from 'src/shared/constants/errosHttp';
import { ApiException } from 'src/shared/errors/apiExeptions';
import { UseCase } from '..';

@Injectable()
export class UserLogin implements UseCase<LoginImput, void> {
  constructor(
    private iUserRepository: IUserRepository,
    private criptoProvider: CriptoProvider,
  ) {}

  async exec({ email, password }: LoginImput): Promise<void> {
    const userExists = await this.iUserRepository.findByEmail(email);

    const isValidPassword = await this.criptoProvider.compare(password, userExists?.get.password || '');

    if (!userExists || !isValidPassword) {
      throw new ApiException(ERROR_MESSAGES[ERROR_CODES.LOGIN_INVALID], HttpStatus.BAD_REQUEST, ERROR_CODES.LOGIN_INVALID);
    }
  }
}
