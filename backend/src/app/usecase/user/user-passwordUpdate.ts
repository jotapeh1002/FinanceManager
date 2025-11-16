import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../shared/utils/iUsecase';
import { IHashProviders } from 'src/app/interfaces/iHashProviders';
import { IUserContracts } from 'src/app/contracts/iUserContracts';
import { PasswordUpdateImput } from 'src/core/interfaces/iUser';
import { InvalidPassword, UserNotFound } from 'src/shared/errors/customErross';

@Injectable()
export class UserPasswordUpdate implements UseCase<PasswordUpdateImput, void> {
  constructor(
    private iUserContract: IUserContracts,
    private iHashProvider: IHashProviders,
  ) {}

  async exec({ id, newPassword, password }: PasswordUpdateImput): Promise<void> {
    const user = await this.iUserContract.findById(id);

    if (!user) {
      throw new UserNotFound();
    }

    if (password == user.get.password) {
      return;
    }

    const isValidPassword = await this.iHashProvider.compare(password, user.get.password);

    if (!isValidPassword) {
      throw new InvalidPassword();
    }

    user.update({ password: await this.iHashProvider.hash(newPassword) });
    await this.iUserContract.update(user);
  }
}
