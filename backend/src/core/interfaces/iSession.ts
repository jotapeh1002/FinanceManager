export class SessionInput {
  constructor(
    public userId: string,
    public refreshToken: string,
    public isRevoked?: boolean,
    public expirateAt?: Date,
    public readonly createdAt?: Date,
    public updatedAt?: Date | undefined,
    public readonly id?: string,
  ) {}
}

export class SessionCreateInput {
  constructor(public userId: string) {}
}

export class SessionNewAcessTokenInput {
  constructor(public refreshToken: string) {}
}
