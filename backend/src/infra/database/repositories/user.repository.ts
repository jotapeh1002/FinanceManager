import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/app/repositories/iUserRepository';
import { UserModel } from 'src/core/model/user.model';
import { User } from '../entity/user.entity';

@Injectable()
export class UserRepository extends IUserRepository {
  constructor(private readonly em: EntityManager) {
    super();
  }

  async insert(user: UserModel): Promise<void> {
    const toUser = this.toUser(user);
    await this.em.persistAndFlush(toUser);
  }

  async findAll(): Promise<UserModel[]> {
    const userArrays = await this.em.findAll(User);
    return userArrays.map((user) => this.toModel(user));
  }

  async findByEmail(email: string): Promise<UserModel | null> {
    const user = await this.em.findOne(User, { email });
    if (!user) return null;
    return this.toModel(user);
  }

  async findById(id: string): Promise<UserModel | null> {
    const user = await this.em.findOne(User, { id });
    if (!user) return null;
    return this.toModel(user);
  }

  async update(user: UserModel): Promise<void> {
    const userEntity = this.toUser(user);
    this.em.assign(this.em.getReference(User, userEntity.id), userEntity);
    await this.em.flush();
  }

  async delete(user: UserModel): Promise<void> {
    const toUser = this.toUser(user);
    await this.em.removeAndFlush(toUser);
  }

  toModel(data: User): UserModel {
    return new UserModel(data.name, data.email, data.password, data.createdAt, data.updatedAt, data.id);
  }

  toUser(data: UserModel): User {
    const user = new User();
    user.id = data.get.id || '';
    user.name = data.get.name;
    user.email = data.get.email;
    user.password = data.get.password;
    user.createdAt = data.get.createdAt;
    user.updatedAt = data.get.updatedAt;
    return user;
  }
}

//  const managedUser = this.em.assign(
//     this.em.getReference(User, userEntity.id),
//     userEntity
//   );
