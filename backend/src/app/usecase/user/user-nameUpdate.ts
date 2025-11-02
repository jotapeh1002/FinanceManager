import { HttpStatus, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/app/repositories/iUserRepository';
import { NameUpdate } from 'src/core/interfaces/user';
import { ERROR_CODES, ERROR_MESSAGES } from 'src/shared/constants/errosHttp';
import { ApiException } from 'src/shared/errors/apiExeptions';

@Injectable()
export class UserNameUpdate {
  constructor(private iUserRepository: IUserRepository) {}

  async exec({ id, name }: NameUpdate): Promise<void> {
    const user = await this.iUserRepository.findById(id);
    if (!user) throw new ApiException(ERROR_MESSAGES[ERROR_CODES.USER_NOT_FOUND], HttpStatus.BAD_REQUEST, ERROR_CODES.USER_NOT_FOUND);

    if (user.get.name === name) throw new ApiException(ERROR_MESSAGES[ERROR_CODES.INVALID_NAME], HttpStatus.BAD_REQUEST, ERROR_CODES.INVALID_NAME);
    user.update({ name: name });

    await this.iUserRepository.update(user);
  }
}
