import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { UserModel } from 'src/core/model/user.model';
import { User } from '../entity/user.entity';
import { IUserRepository } from 'src/app/repositories/iUserRepository';

@Injectable()
export class UserRepository extends IUserRepository {
  constructor(private readonly em: EntityManager) {
    super();
  }

  insert = async (user: UserModel): Promise<UserModel> => {
    const toUser = this.toUser(user);
    await this.em.persistAndFlush(toUser);
    return this.toModel(toUser);
  };

  findAll = async (): Promise<UserModel[]> => {
    const userArrays = await this.em.findAll(User);
    return userArrays.map((user) => this.toModel(user));
  };

  findByEmail = async (email: string): Promise<UserModel | null> => {
    const user = await this.em.findOne(User, { email });
    if (!user) return null;
    return this.toModel(user);
  };

  findById = async (id: string): Promise<UserModel | null> => {
    const user = await this.em.findOne(User, { id });
    if (!user) return null;
    return this.toModel(user);
  };

  update = async (user: UserModel): Promise<void> => {
    const userEntity = this.toUser(user);
    this.em.assign(this.em.getReference(User, userEntity.id), userEntity);
    await this.em.flush();
  };

  delete = async (user: UserModel): Promise<void> => {
    const toUser = this.toUser(user);
    await this.em.removeAndFlush(toUser);
  };

  toModel = (data: User): UserModel => {
    return new UserModel({ name: data.name, email: data.email, password: data.password, createdAt: data.createdAt, updatedAt: data.updatedAt }, data.id);
  };

  toUser = (data: UserModel): User => {
    const user = new User();
    user.id = data.get.id;
    user.name = data.get.name;
    user.email = data.get.email;
    user.password = data.get.password;
    user.createdAt = data.get.createdAt!;
    user.updatedAt = data.get.updatedAt ?? undefined;
    return user;
  };
}
