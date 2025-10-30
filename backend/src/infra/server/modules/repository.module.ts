import { Global, Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserRepository } from 'src/infra/database/repositories/user.repository';
import { IUserRepository } from 'src/app/repositories/iUserRepository';
import { User } from 'src/infra/database/entity/user.entity';

@Global()
@Module({
  imports: [MikroOrmModule.forFeature([User])],
  providers: [{ useClass: UserRepository, provide: IUserRepository }],
  exports: [IUserRepository],
})
export class RepositoryModule {}
