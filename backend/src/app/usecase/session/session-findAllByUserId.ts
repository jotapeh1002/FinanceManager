import { SessionModel } from 'src/core/model/session.model';
import { Injectable } from '@nestjs/common';
import { UseCase } from 'src/shared/utils/iUsecase';
import { ISessionContracts } from 'src/app/contracts/iSessionContracts';
import { IUserContracts } from 'src/app/contracts/iUserContracts';
import { SessionNotFound, UserNotFound } from 'src/shared/errors/customErross';

@Injectable()
export class SessionFindAllByUserId implements UseCase<string, SessionModel[]> {
  constructor(
    private iSessionContract: ISessionContracts,
    private readonly userContract: IUserContracts,
  ) {}

  async exec(userId: string) {
    const user = await this.userContract.findById(userId);

    if (!user) {
      throw new UserNotFound();
    }
    const session = await this.iSessionContract.findUserSessions(userId);

    if (!session) {
      throw new SessionNotFound();
    }

    return session;
  }
}
