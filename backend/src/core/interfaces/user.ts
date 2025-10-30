export class UserCommon {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public readonly createdAt?: Date,
    public updatedAt?: Date,
    public readonly id?: string,
  ) {}
}

export class LoginCommon {
  constructor(
    public email: string,
    public password: string,
  ) {}
}

export class NameUpdate {
  constructor(
    public id: string,
    public name: string,
  ) {}
}

export class PasswordUpdate {
  constructor(
    public id: string,
    public password: string,
    public newPassword: string,
  ) {}
}

export class EmailUpdate {
  constructor(
    public id: string,
    public email: string,
    public password: string,
  ) {}
}
