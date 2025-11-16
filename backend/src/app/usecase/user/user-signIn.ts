import { Injectable } from '@nestjs/common';
import { UseCase } from 'src/shared/utils/iUsecase';
import { ITokenProviders, PayloadOutput } from 'src/app/interfaces/iTokenProviders';
import { LoginImput } from 'src/core/interfaces/iUser';
import { IHashProviders } from 'src/app/interfaces/iHashProviders';
import { IUserContracts } from 'src/app/contracts/iUserContracts';
import { SessionCreate } from '../session/session-create';
import { InvalidLogin } from 'src/shared/errors/customErross';

@Injectable()
export class UserSignIn implements UseCase<LoginImput, PayloadOutput> {
  constructor(
    private readonly userRepo: IUserContracts,
    private readonly hashProvider: IHashProviders,
    private readonly tokenProvider: ITokenProviders,
    private readonly sessionCreate: SessionCreate,
  ) {}

  async exec({ email, password }: LoginImput): Promise<PayloadOutput> {
    const user = await this.userRepo.findByEmail(email);

    const isValidPassword = await this.hashProvider.compare(password, user?.get.password ?? '');

    if (!user || !isValidPassword) {
      throw new InvalidLogin();
    }

    const accessToken = await this.tokenProvider.acessToken({ userId: user.get.id });

    const refreshToken = await this.sessionCreate.exec({ userId: user.get.id });

    return {
      accessToken,
      refreshToken,
    };
  }
}
