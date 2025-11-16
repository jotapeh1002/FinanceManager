import { Injectable } from '@nestjs/common';
import { ISessionContracts } from 'src/app/contracts/iSessionContracts';
import { IUserContracts } from 'src/app/contracts/iUserContracts';
import { IHashProviders } from 'src/app/interfaces/iHashProviders';
import { ITokenProviders } from 'src/app/interfaces/iTokenProviders';
import { SessionNewAcessTokenInput } from 'src/core/interfaces/iSession';
import { SessionModel } from 'src/core/model/session.model';
import { InvalidToken, SessionNotFound, UnauthorizedError, UserNotFound } from 'src/shared/errors/customErross';
import { UseCase } from 'src/shared/utils/iUsecase';

@Injectable()
export class SessionNewAcessToken implements UseCase<SessionNewAcessTokenInput, { accessToken: string; refreshToken: string }> {
  constructor(
    private readonly sessionRepo: ISessionContracts,
    private readonly tokenProvider: ITokenProviders,
    private readonly userContract: IUserContracts,
    private readonly hashProvider: IHashProviders,
  ) {}

  private async invalidateSession(session: SessionModel): Promise<void> {
    session.revokedSession();
    await this.sessionRepo.update(session);
    throw new UnauthorizedError('sessão invalida');
  }

  private async validateSession(session: SessionModel, refreshToken: string): Promise<void> {
    const now = new Date();
    if (session.get.isRevoked) {
      await this.invalidateSession(session);
    }

    if (session.get.expirateAt! < now) {
      await this.invalidateSession(session);
    }

    const isValidToken = await this.hashProvider.compare(refreshToken, session.get.refreshToken!);
    if (!isValidToken) {
      await this.invalidateSession(session);
    }
  }

  private async validateUser(userId: string): Promise<void> {
    const user = await this.userContract.findById(userId);
    if (!user) {
      throw new UserNotFound();
    }
  }

  async exec({ refreshToken }: SessionNewAcessTokenInput): Promise<{ accessToken: string; refreshToken: string }> {
    const decoded = await this.tokenProvider.validRefreshToken(refreshToken);
    if (!decoded) {
      throw new InvalidToken();
    }

    const session = await this.sessionRepo.findById(decoded.sessionId);
    if (!session) {
      throw new SessionNotFound();
    }

    await this.validateSession(session, refreshToken);

    await this.validateUser(decoded.userId);

    const newRefreshToken = await this.tokenProvider.refreshToken({ userId: decoded.userId, sessionId: session.get.id });

    const newAccessToken = await this.tokenProvider.acessToken({ userId: decoded.userId });

    const refreshDecoded = await this.tokenProvider.decodeToken(newRefreshToken);
    const newHash = await this.hashProvider.hash(newRefreshToken);

    session.update({ refreshToken: newHash, expirateAt: new Date(refreshDecoded.exp * 1000) });

    await this.sessionRepo.update(session);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }
}
