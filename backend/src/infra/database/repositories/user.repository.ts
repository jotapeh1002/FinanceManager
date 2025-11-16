import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { UserModel } from 'src/core/model/user.model';
import { UserOrm } from '../entity/user.entity';
import { IUserContracts } from 'src/app/contracts/iUserContracts';
import { DatabaseError } from 'src/shared/errors/customErross';

@Injectable()
export class UserRepository extends IUserContracts {
  constructor(private readonly em: EntityManager) {
    super();
  }

  async insert(user: UserModel): Promise<void> {
    try {
      const toOrm = this.toOrm(user);
      await this.em.persistAndFlush(toOrm);
    } catch (error: unknown) {
      throw new DatabaseError(error);
    }
  }

  async findAll(): Promise<UserModel[]> {
    try {
      const userArrays = await this.em.findAll(UserOrm);
      return userArrays.map((user) => this.toModel(user));
    } catch (error: unknown) {
      throw new DatabaseError(error);
    }
  }

  async findByEmail(email: string): Promise<UserModel | null> {
    try {
      const user = await this.em.findOne(UserOrm, { email });
      if (!user) return null;
      return this.toModel(user);
    } catch (error: unknown) {
      throw new DatabaseError(error);
    }
  }

  async findById(id: string): Promise<UserModel | null> {
    try {
      const user = await this.em.findOne(UserOrm, { id });
      if (!user) return null;
      return this.toModel(user);
    } catch (error: unknown) {
      throw new DatabaseError(error);
    }
  }

  async update(user: UserModel): Promise<void> {
    try {
      const userOrm = this.toOrm(user);
      this.em.assign(this.em.getReference(UserOrm, userOrm.id), userOrm);
      await this.em.flush();
    } catch (error: unknown) {
      throw new DatabaseError(error);
    }
  }

  async delete(user: UserModel): Promise<void> {
    try {
      const toOrm = this.toOrm(user);
      await this.em.removeAndFlush(toOrm);
    } catch (error: unknown) {
      throw new DatabaseError(error);
    }
  }

  toModel = (data: UserOrm): UserModel => {
    return new UserModel(
      {
        name: data.name,
        email: data.email,
        password: data.password,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      },
      data.id,
    );
  };

  toOrm = (data: UserModel): UserOrm => {
    const user = new UserOrm();
    user.id = data.get.id;
    user.name = data.get.name;
    user.email = data.get.email;
    user.password = data.get.password;
    user.createdAt = data.get.createdAt!;
    user.updatedAt = data.get.updatedAt ?? undefined;
    return user;
  };
}
