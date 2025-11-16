import { Injectable } from '@nestjs/common';
import { UserModel } from 'src/core/model/user.model';
import { UseCase } from '../../../shared/utils/iUsecase';
import { IUserContracts } from 'src/app/contracts/iUserContracts';
import { UserNotFound } from 'src/shared/errors/customErross';

@Injectable()
export class UserfindById implements UseCase<string, UserModel> {
  constructor(private iUserContracts: IUserContracts) {}

  async exec(id: string): Promise<UserModel> {
    const user = await this.iUserContracts.findById(id);

    if (!user) {
      throw new UserNotFound();
    }

    return user;
  }
}
