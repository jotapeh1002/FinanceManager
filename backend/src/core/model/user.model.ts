import { UserCommon } from '../interfaces/user';

export class UserModel {
  constructor(
    private _name: string,
    private _email: string,
    private _password: string,
    private readonly _createdAt?: Date,
    private _updatedAt?: Date,
    private readonly _id?: string,
  ) {}

  update(data: Partial<UserCommon>): void {
    if (data.name) this._name = data.name;
    if (data.email) this._email = data.email;
    if (data.password) this._password = data.password;
    this._updatedAt = new Date();
  }

  get get() {
    return {
      id: this._id,
      name: this._name,
      email: this._email,
      password: this._password,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }

  get toJson() {
    return {
      id: this._id,
      name: this._name,
      email: this._email,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }
}
