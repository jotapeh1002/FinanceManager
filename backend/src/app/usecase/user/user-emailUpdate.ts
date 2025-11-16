import { Injectable } from '@nestjs/common';
import { UseCase } from 'src/shared/utils/iUsecase';
import { IUserContracts } from 'src/app/contracts/iUserContracts';
import { IHashProviders } from 'src/app/interfaces/iHashProviders';
import { EmailUpdateImput } from 'src/core/interfaces/iUser';
import { EmailInvalid, EmailIsExists, InvalidLogin, UserNotFound } from 'src/shared/errors/customErross';

@Injectable()
export class UserEmailUpdate implements UseCase<EmailUpdateImput, void> {
  constructor(
    private readonly userRepo: IUserContracts,
    private readonly hashProvider: IHashProviders,
  ) {}

  async exec({ email, id, password }: EmailUpdateImput): Promise<void> {
    const user = await this.userRepo.findById(id);

    if (!user) {
      throw new UserNotFound();
    }

    if (user.get.email === email) {
      throw new EmailInvalid();
    }

    const emailExists = await this.userRepo.findByEmail(email);

    if (emailExists) {
      throw new EmailIsExists();
    }

    const isValidPassword = await this.hashProvider.compare(password, user.get.password);

    if (!isValidPassword) {
      throw new InvalidLogin();
    }

    user.update({ email });
    await this.userRepo.update(user);
  }
}
