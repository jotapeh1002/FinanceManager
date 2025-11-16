import { Injectable } from '@nestjs/common';
import { UserModel } from 'src/core/model/user.model';
import { UseCase } from '../../../shared/utils/iUsecase';
import { IUserContracts } from 'src/app/contracts/iUserContracts';
import { UsersNotFound } from 'src/shared/errors/customErross';

@Injectable()
export class UserList implements UseCase<null, UserModel[]> {
  constructor(private iUserContracts: IUserContracts) {}

  async exec(): Promise<UserModel[]> {
    const users = await this.iUserContracts.findAll();

    if (!users[0]) {
      throw new UsersNotFound();
    }

    return users;
  }
}
