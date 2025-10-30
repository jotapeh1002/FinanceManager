import { Module } from '@nestjs/common';
import { RepositoryModule } from './repository.module';
import { UserUseCase } from 'src/app/usecase/userUseCase';
import { CriptoProvider } from 'src/app/services/hash.provider';
import { UserController } from '../controllers/user.controller';

@Module({
  imports: [RepositoryModule],
  providers: [UserUseCase, CriptoProvider],
  controllers: [UserController],
})
export class UserModule {}
