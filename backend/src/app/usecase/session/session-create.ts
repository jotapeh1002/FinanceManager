import { Injectable } from '@nestjs/common';
import { ISessionContracts } from 'src/app/contracts/iSessionContracts';
import { IHashProviders } from 'src/app/interfaces/iHashProviders';
import { ITokenProviders } from 'src/app/interfaces/iTokenProviders';
import { SessionCreateInput } from 'src/core/interfaces/iSession';
import { SessionModel } from 'src/core/model/session.model';
import { UseCase } from 'src/shared/utils/iUsecase';

@Injectable()
export class SessionCreate implements UseCase<SessionCreateInput, string> {
  constructor(
    private readonly sessionRepo: ISessionContracts,
    private readonly tokenProvider: ITokenProviders,
    private readonly hashProvider: IHashProviders,
  ) {}

  async exec({ userId }: SessionCreateInput): Promise<string> {
    const session = new SessionModel({ userId });

    const refreshToken = await this.tokenProvider.refreshToken({ userId: userId, sessionId: session.get.id });
    const decode = await this.tokenProvider.decodeToken(refreshToken);

    const hashedToken = await this.hashProvider.hash(refreshToken);

    session.update({ refreshToken: hashedToken, expirateAt: new Date(decode.exp * 1000) });
    await this.sessionRepo.insert(session);

    return refreshToken;
  }
}
