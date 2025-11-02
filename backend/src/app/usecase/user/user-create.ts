import { HttpStatus, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/app/repositories/iUserRepository';
import { CriptoProvider } from 'src/app/services/hash.provider';
import { UserCommon } from 'src/core/interfaces/user';
import { UserModel } from 'src/core/model/user.model';
import { ERROR_CODES, ERROR_MESSAGES } from 'src/shared/constants/errosHttp';
import { ApiException } from 'src/shared/errors/apiExeptions';

@Injectable()
export class UserCreate {
  constructor(
    private iUserRepository: IUserRepository,
    private criptoProvider: CriptoProvider,
  ) {}

  async exec({ email, name, password }: UserCommon): Promise<void> {
    const userExists = await this.iUserRepository.findByEmail(email);
    if (userExists) throw new ApiException(ERROR_MESSAGES[ERROR_CODES.EMAIL_ALREADY_EXISTS], HttpStatus.BAD_REQUEST, ERROR_CODES.EMAIL_ALREADY_EXISTS);

    const hashPassowrd = await this.criptoProvider.hash(password);

    const newUser = new UserModel(name, email, hashPassowrd);
    await this.iUserRepository.insert(newUser);
  }
}
