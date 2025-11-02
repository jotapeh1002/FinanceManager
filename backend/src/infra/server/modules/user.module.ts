import { Module } from '@nestjs/common';
import { RepositoryModule } from './repository.module';
import { CriptoProvider } from 'src/app/services/hash.provider';
import { UserController } from '../controllers/user.controller';
import { UserCreate, UserDelete, UserEmailUpdate, UserList, UserLogin, UserNameUpdate, UserPasswordUpdate, UserfindById } from 'src/app/usecase/user';

@Module({
  imports: [RepositoryModule],
  providers: [UserCreate, UserDelete, UserEmailUpdate, UserfindById, UserList, UserLogin, UserNameUpdate, UserPasswordUpdate, CriptoProvider],
  controllers: [UserController],
})
export class UserModule {}
