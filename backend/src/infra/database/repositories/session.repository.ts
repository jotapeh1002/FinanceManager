import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { ISessionContracts } from 'src/app/contracts/iSessionContracts';
import { SessionModel } from 'src/core/model/session.model';
import { SessionOrm } from '../entity/session.entity';
import { UserOrm } from '../entity/user.entity';
import { DatabaseError } from 'src/shared/errors/customErross';

@Injectable()
export class SessionRepository extends ISessionContracts {
  constructor(private readonly em: EntityManager) {
    super();
  }

  async insert(session: SessionModel): Promise<void> {
    try {
      const sessionOrm = this.toOrm(session);
      await this.em.persistAndFlush(sessionOrm);
    } catch (error: unknown) {
      throw new DatabaseError(error);
    }
  }

  async update(session: SessionModel): Promise<void> {
    try {
      const sessionOrm = this.toOrm(session);
      this.em.assign(this.em.getReference(SessionOrm, sessionOrm.id), sessionOrm);
      await this.em.flush();
    } catch (error: unknown) {
      throw new DatabaseError(error);
    }
  }

  async findById(id: string): Promise<SessionModel | null> {
    try {
      const session = await this.em.findOne(SessionOrm, { id: id });
      if (!session) return null;
      return this.toModel(session);
    } catch (error: unknown) {
      throw new DatabaseError(error);
    }
  }

  async findByToken(refreshToken: string): Promise<SessionModel | null> {
    try {
      const session = await this.em.findOne(SessionOrm, { refreshToken: refreshToken });
      if (!session) return null;
      return this.toModel(session);
    } catch (error: unknown) {
      throw new DatabaseError(error);
    }
  }

  async findUserSessions(userId: string): Promise<SessionModel[]> {
    try {
      const sessions = await this.em.find(SessionOrm, { user: userId });
      return sessions.map((session) => this.toModel(session));
    } catch (error: unknown) {
      throw new DatabaseError(error);
    }
  }

  async delete(session: SessionModel): Promise<void> {
    try {
      const sessionOrm = this.toOrm(session);
      await this.em.removeAndFlush(sessionOrm);
    } catch (error: unknown) {
      throw new DatabaseError(error);
    }
  }

  toModel = (data: SessionOrm): SessionModel => {
    return new SessionModel(
      {
        refreshToken: data.refreshToken,
        userId: data.user.id,
        expirateAt: data.expirateAt,
        isRevoked: data.isRevoked,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      },
      data.id,
    );
  };

  toOrm = (data: SessionModel): SessionOrm => {
    const session = new SessionOrm();
    session.id = data.get.id;
    session.expirateAt = data.get.expirateAt!;
    session.isRevoked = data.get.isRevoked!;
    session.refreshToken = data.get.refreshToken!;
    session.user = this.em.getReference(UserOrm, data.get.userId);
    session.createdAt = data.get.createdAt!;
    session.updatedAt = data.get.updatedAt ?? undefined;
    return session;
  };
}
