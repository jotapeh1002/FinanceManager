import { Module } from '@nestjs/common';
import { UserController } from '../controllers/user.controller';
import { UserSignUp, UserDelete, UserEmailUpdate, UserList, UserSignIn, UserNameUpdate, UserPasswordUpdate, UserfindById } from 'src/app/usecase/user';
import { SessionModule } from './session.module';

@Module({
  imports: [SessionModule],
  providers: [UserSignUp, UserDelete, UserEmailUpdate, UserfindById, UserList, UserSignIn, UserNameUpdate, UserPasswordUpdate],
  controllers: [UserController],
  exports: [UserSignUp, UserDelete, UserEmailUpdate, UserfindById, UserList, UserSignIn, UserNameUpdate, UserPasswordUpdate],
})
export class UserModule {}
