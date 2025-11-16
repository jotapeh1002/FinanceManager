import { Injectable } from '@nestjs/common';
import { ISessionContracts } from 'src/app/contracts/iSessionContracts';
import { SessionNotFound } from 'src/shared/errors/customErross';
import { UseCase } from 'src/shared/utils/iUsecase';

@Injectable()
export class SessionRevoked implements UseCase<string, void> {
  constructor(private iSessionContract: ISessionContracts) {}

  async exec(id: string): Promise<void> {
    const session = await this.iSessionContract.findById(id);
    if (!session) throw new SessionNotFound();

    session.revokedSession();

    await this.iSessionContract.update(session);
  }
}
