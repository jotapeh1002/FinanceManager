import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class Confighelper {
  constructor(private dotEnv: ConfigService) {
    this.PORT = this.dotEnv.get('PORT') ?? '';
    this.POSTGRES_USER = this.dotEnv.get('POSTGRES_USER') ?? '';
    this.POSTGRES_PASSWORD = this.dotEnv.get('POSTGRES_PASSWORD') ?? '';
    this.POSTGRES_DB = this.dotEnv.get('POSTGRES_DB') ?? '';
    this.POSTGRES_PORT = this.dotEnv.get('POSTGRES_PORT') ?? '';
    this.POSTGRES_HOST = this.dotEnv.get('POSTGRES_HOST') ?? '';
    this.POSTGRES_PROD = this.dotEnv.get('POSTGRES_PROD') == 'true';
  }
  PORT: string;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DB: string;
  POSTGRES_PORT: string;
  POSTGRES_HOST: string;
  POSTGRES_PROD: boolean;
}
