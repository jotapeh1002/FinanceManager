import { SessionModel } from 'src/core/model/session.model';

export abstract class ISessionContracts {
  abstract insert(session: SessionModel): Promise<void>;
  abstract update(session: SessionModel): Promise<void>;
  abstract delete(session: SessionModel): Promise<void>;
  abstract findUserSessions(userId: string): Promise<SessionModel[]>;
  abstract findByToken(refreshToken: string): Promise<SessionModel | null>;
  abstract findById(id: string): Promise<SessionModel | null>;
}
