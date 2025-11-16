import { ITokenProviders, PayloadInput, RefreshTokenOutput } from '../interfaces/iTokenProviders';
import { Confighelper } from 'src/infra/configs/confighelper.config';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AutenticacaoError } from 'src/shared/errors/customErross';

@Injectable()
export class TokenProviders extends ITokenProviders {
  constructor(
    private readonly jwtService: JwtService,
    private dotEnv: Confighelper,
  ) {
    super();
  }

  async acessToken(payload: PayloadInput): Promise<string> {
    try {
      return await this.jwtService.signAsync(payload, { secret: this.dotEnv.JWT_ACESS_SECRET, expiresIn: '5m' });
    } catch (error: unknown) {
      throw new AutenticacaoError(error);
    }
  }

  async refreshToken(payload: PayloadInput): Promise<string> {
    try {
      return await this.jwtService.signAsync(payload, { secret: this.dotEnv.JWT_REFRESH_SECRET, expiresIn: '30d' });
    } catch (error: unknown) {
      throw new AutenticacaoError(error);
    }
  }

  async validRefreshToken(token: string): Promise<RefreshTokenOutput> {
    try {
      return await this.jwtService.verifyAsync<RefreshTokenOutput>(token, { secret: this.dotEnv.JWT_REFRESH_SECRET });
    } catch (error: unknown) {
      throw new AutenticacaoError(error);
    }
  }

  async decodeToken(token: string): Promise<RefreshTokenOutput> {
    try {
      return await this.jwtService.decode(token);
    } catch (error: unknown) {
      throw new AutenticacaoError(error);
    }
  }
}
