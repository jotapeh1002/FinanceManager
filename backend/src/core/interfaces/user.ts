export class UserImput {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public readonly createdAt?: Date,
    public updatedAt?: Date | undefined,
    public readonly id?: string,
  ) {}
}

export class LoginImput {
  constructor(
    public email: string,
    public password: string,
  ) {}
}

export class NameUpdateImput {
  constructor(
    public id: string,
    public name: string,
  ) {}
}

export class PasswordUpdateImput {
  constructor(
    public id: string,
    public password: string,
    public newPassword: string,
  ) {}
}

export class EmailUpdateImput {
  constructor(
    public id: string,
    public email: string,
    public password: string,
  ) {}
}
