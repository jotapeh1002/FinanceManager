import { Confighelper } from 'src/infra/configs/confighelper.config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { PayloadInput } from 'src/app/interfaces/iTokenProviders';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-access') {
  constructor(dotEnv: Confighelper) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: dotEnv.JWT_ACESS_SECRET,
      ignoreExpiration: false,
    });
  }

  validate(payload: PayloadInput) {
    return payload;
  }
}
