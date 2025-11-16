import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ITokenProviders } from 'src/app/interfaces/iTokenProviders';
import { TokenProviders } from 'src/app/providers/tokenProvider';
import { JwtGuard } from '../auth/jwt.guard';
import { JwtStrategy } from '../auth/jwt.strategy';

@Global()
@Module({
  imports: [JwtModule.register({})],
  providers: [{ provide: ITokenProviders, useClass: TokenProviders }, JwtGuard, JwtStrategy],
  exports: [ITokenProviders, JwtGuard, JwtStrategy],
})
export class AuthModule {}
