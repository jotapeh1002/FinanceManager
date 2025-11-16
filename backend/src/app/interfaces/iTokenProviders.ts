export class PayloadInput {
  userId: string;
  sessionId?: string;
}

export class PayloadOutput {
  constructor(
    public accessToken: string,
    public refreshToken: string,
  ) {}
}

export class RefreshTokenOutput {
  constructor(
    public userId: string,
    public exp: number,
    public sessionId: string,
  ) {}
}

export abstract class ITokenProviders {
  abstract acessToken(payload: PayloadInput): Promise<string>;
  abstract refreshToken(payload: PayloadInput): Promise<string>;
  abstract validRefreshToken(token: string): Promise<RefreshTokenOutput>;
  abstract decodeToken(token: string): Promise<RefreshTokenOutput>;
}
