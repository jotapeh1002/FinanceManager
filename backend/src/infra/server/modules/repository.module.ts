import { UserRepository } from 'src/infra/database/repositories/user.repository';
import { UserOrm } from 'src/infra/database/entity/user.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Global, Module } from '@nestjs/common';
import { IUserContracts } from 'src/app/contracts/iUserContracts';
import { SessionRepository } from 'src/infra/database/repositories/session.repository';
import { ISessionContracts } from 'src/app/contracts/iSessionContracts';
import { SessionOrm } from 'src/infra/database/entity/session.entity';

@Global()
@Module({
  imports: [MikroOrmModule.forFeature([UserOrm, SessionOrm])],
  providers: [
    { useClass: UserRepository, provide: IUserContracts },
    { useClass: SessionRepository, provide: ISessionContracts },
  ],
  exports: [IUserContracts, ISessionContracts],
})
export class RepositoryModule {}
