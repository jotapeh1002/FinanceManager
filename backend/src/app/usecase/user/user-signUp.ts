import { Injectable } from '@nestjs/common';
import { UserModel } from 'src/core/model/user.model';
import { UseCase } from '../../../shared/utils/iUsecase';
import { IHashProviders } from 'src/app/interfaces/iHashProviders';
import { IUserContracts } from 'src/app/contracts/iUserContracts';
import { ITokenProviders, PayloadOutput } from 'src/app/interfaces/iTokenProviders';
import { UserImput } from 'src/core/interfaces/iUser';
import { SessionCreate } from '../session/session-create';
import { EmailIsExists } from 'src/shared/errors/customErross';

@Injectable()
export class UserSignUp implements UseCase<UserImput, PayloadOutput> {
  constructor(
    private iUserContract: IUserContracts,
    private iHashProvider: IHashProviders,
    private iTokenProvider: ITokenProviders,
    private sessionCreate: SessionCreate,
  ) {}

  async exec({ email, name, password }: UserImput): Promise<PayloadOutput> {
    const userExists = await this.iUserContract.findByEmail(email);

    if (userExists) {
      throw new EmailIsExists();
    }

    const hashPassowrd = await this.iHashProvider.hash(password);

    const newUser = new UserModel({ name, email, password: hashPassowrd });
    await this.iUserContract.insert(newUser);

    const accessToken = await this.iTokenProvider.acessToken({ userId: newUser.get.id });

    const refreshToken = await this.sessionCreate.exec({ userId: newUser.get.id });

    return {
      accessToken,
      refreshToken,
    };
  }
}
