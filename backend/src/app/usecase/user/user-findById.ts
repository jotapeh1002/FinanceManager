import { HttpStatus, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/app/repositories/iUserRepository';
import { UserModel } from 'src/core/model/user.model';
import { ERROR_CODES, ERROR_MESSAGES } from 'src/shared/constants/errosHttp';
import { ApiException } from 'src/shared/errors/apiExeptions';
import { UseCase } from '..';

@Injectable()
export class UserfindById implements UseCase<string, UserModel> {
  constructor(private iUserRepository: IUserRepository) {}

  async exec(id: string): Promise<UserModel> {
    const user = await this.iUserRepository.findById(id);

    if (!user) {
      throw new ApiException(ERROR_MESSAGES[ERROR_CODES.USER_NOT_FOUND], HttpStatus.BAD_REQUEST, ERROR_CODES.USER_NOT_FOUND);
    }

    return user;
  }
}
