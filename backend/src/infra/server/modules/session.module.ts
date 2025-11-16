import { Module } from '@nestjs/common';
import { SessionCreate } from 'src/app/usecase/session/session-create';
import { SessionFindAllByUserId } from 'src/app/usecase/session/session-findAllByUserId';
import { SessionNewAcessToken } from 'src/app/usecase/session/session-newAcessToken';
import { SessionRevoked } from 'src/app/usecase/session/sesssion-revoked';
import { SessionController } from '../controllers/session.controller';

@Module({
  imports: [],
  providers: [SessionCreate, SessionNewAcessToken, SessionFindAllByUserId, SessionRevoked],
  controllers: [SessionController],
  exports: [SessionCreate, SessionNewAcessToken, SessionFindAllByUserId, SessionRevoked],
})
export class SessionModule {}
