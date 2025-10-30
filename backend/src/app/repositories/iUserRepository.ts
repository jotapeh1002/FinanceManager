import { Injectable } from '@nestjs/common';
import { UserModel } from 'src/core/model/user.model';

@Injectable()
export abstract class IUserRepository {
  abstract insert(user: UserModel): Promise<void>;
  abstract findAll(): Promise<UserModel[]>;
  abstract findById(id: string): Promise<UserModel | null>;
  abstract findByEmail(email: string): Promise<UserModel | null>;
  abstract update(user: UserModel): Promise<void>;
  abstract delete(user: UserModel): Promise<void>;
}
