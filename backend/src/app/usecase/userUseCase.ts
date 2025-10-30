import { HttpStatus, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/app/repositories/iUserRepository';
import { CriptoProvider } from 'src/app/services/hash.provider';
import { EmailUpdate, LoginCommon, NameUpdate, PasswordUpdate, UserCommon } from 'src/core/interfaces/user';
import { UserModel } from 'src/core/model/user.model';
import { ERROR_CODES, ERROR_MESSAGES } from 'src/shared/constants/errosHttp';
import { ApiException } from 'src/shared/errors/apiExeptions';

@Injectable()
export class UserUseCase {
  constructor(
    private iUserRepository: IUserRepository,
    private criptoProvider: CriptoProvider,
  ) {}

  async create(userCommon: UserCommon): Promise<void> {
    const userExists = await this.iUserRepository.findByEmail(userCommon.email);
    if (userExists) throw new ApiException(ERROR_MESSAGES[ERROR_CODES.EMAIL_ALREADY_EXISTS], HttpStatus.BAD_REQUEST, ERROR_CODES.EMAIL_ALREADY_EXISTS);

    userCommon.password = await this.criptoProvider.hash(userCommon.password);

    const userCreated = new UserModel(userCommon.name, userCommon.email, userCommon.password);
    await this.iUserRepository.insert(userCreated);
  }

  async login(loginCommon: LoginCommon): Promise<void> {
    const userExists = await this.iUserRepository.findByEmail(loginCommon.email);
    const password = await this.criptoProvider.compare(loginCommon.password, userExists?.get.password || '');

    if (!userExists || !password) throw new ApiException(ERROR_MESSAGES[ERROR_CODES.LOGIN_INVALID], HttpStatus.BAD_REQUEST, ERROR_CODES.LOGIN_INVALID);
  }

  async listUsers(): Promise<UserModel[]> {
    const userArray = await this.iUserRepository.findAll();

    if (!userArray[0]) throw new ApiException(ERROR_MESSAGES[ERROR_CODES.USER_NOT_FOUND], HttpStatus.BAD_REQUEST, ERROR_CODES.USER_NOT_FOUND);
    return userArray;
  }

  async findById(id: string): Promise<UserModel> {
    const userExists = await this.iUserRepository.findById(id);

    if (!userExists) throw new ApiException(ERROR_MESSAGES[ERROR_CODES.USER_NOT_FOUND], HttpStatus.BAD_REQUEST, ERROR_CODES.USER_NOT_FOUND);
    return userExists;
  }

  async nameUpdate(nameUpdate: NameUpdate): Promise<void> {
    const userExists = await this.iUserRepository.findById(nameUpdate.id);
    if (!userExists) throw new ApiException(ERROR_MESSAGES[ERROR_CODES.USER_NOT_FOUND], HttpStatus.BAD_REQUEST, ERROR_CODES.USER_NOT_FOUND);

    if (userExists.get.name === nameUpdate.name) throw new ApiException(ERROR_MESSAGES[ERROR_CODES.INVALID_NAME], HttpStatus.BAD_REQUEST, ERROR_CODES.INVALID_NAME);
    userExists.update({ name: userExists.get.name });

    await this.iUserRepository.update(userExists);
  }

  async passwordUpdate(passwordUpdate: PasswordUpdate): Promise<void> {
    const userExists = await this.iUserRepository.findById(passwordUpdate.id);
    if (!userExists) throw new ApiException(ERROR_MESSAGES[ERROR_CODES.USER_NOT_FOUND], HttpStatus.BAD_REQUEST, ERROR_CODES.USER_NOT_FOUND);

    const isValidPassword = await this.criptoProvider.compare(passwordUpdate.password, userExists.get.password);
    if (!isValidPassword) throw new ApiException(ERROR_MESSAGES[ERROR_CODES.PASSWORD_INVALID], HttpStatus.BAD_REQUEST, ERROR_CODES.PASSWORD_INVALID);

    userExists.update({ password: await this.criptoProvider.hash(passwordUpdate.newPassword) });
    await this.iUserRepository.update(userExists);
  }

  async emailUpdate(emailUpdate: EmailUpdate): Promise<void> {
    const userExists = await this.iUserRepository.findById(emailUpdate.id);
    if (userExists?.get.email == emailUpdate.email) throw new ApiException(ERROR_MESSAGES[ERROR_CODES.INVALID_EMAIL], HttpStatus.BAD_REQUEST, ERROR_CODES.INVALID_EMAIL);
    if (!userExists) throw new ApiException(ERROR_MESSAGES[ERROR_CODES.USER_NOT_FOUND], HttpStatus.BAD_REQUEST, ERROR_CODES.USER_NOT_FOUND);

    const emailExists = await this.iUserRepository.findByEmail(emailUpdate.email);
    if (emailExists) throw new ApiException(ERROR_MESSAGES[ERROR_CODES.EMAIL_ALREADY_EXISTS], HttpStatus.BAD_REQUEST, ERROR_CODES.EMAIL_ALREADY_EXISTS);

    const isValidPassword = await this.criptoProvider.compare(emailUpdate.password, userExists.get.password);
    if (!isValidPassword) throw new ApiException(ERROR_MESSAGES[ERROR_CODES.PASSWORD_INVALID], HttpStatus.BAD_REQUEST, ERROR_CODES.PASSWORD_INVALID);

    userExists.update({ email: emailUpdate.email });
    await this.iUserRepository.update(userExists);
  }

  async delete(id: string): Promise<void> {
    const userExists = await this.iUserRepository.findById(id);
    if (!userExists) throw new ApiException(ERROR_MESSAGES[ERROR_CODES.USER_NOT_FOUND], HttpStatus.BAD_REQUEST, ERROR_CODES.USER_NOT_FOUND);

    await this.iUserRepository.delete(userExists);
  }
}
