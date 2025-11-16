import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../shared/utils/iUsecase';
import { IUserContracts } from 'src/app/contracts/iUserContracts';
import { NameUpdateImput } from 'src/core/interfaces/iUser';
import { InvalidName, UserNotFound } from 'src/shared/errors/customErross';

@Injectable()
export class UserNameUpdate implements UseCase<NameUpdateImput, void> {
  constructor(private iUserContracts: IUserContracts) {}

  async exec({ id, name }: NameUpdateImput): Promise<void> {
    const user = await this.iUserContracts.findById(id);

    if (!user) {
      throw new UserNotFound();
    }

    if (user.get.name === name) {
      throw new InvalidName();
    }

    user.update({ name: name });

    await this.iUserContracts.update(user);
  }
}
