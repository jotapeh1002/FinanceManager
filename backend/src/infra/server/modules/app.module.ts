import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { databaseConfig } from 'src/infra/configs/database.config';
import { Confighelper } from 'src/infra/configs/confighelper.config';
import { RepositoryModule } from './repository.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (confighService: ConfigService) => databaseConfig(confighService),
    }),
    RepositoryModule,
    UserModule,
  ],
  providers: [Confighelper],
})
export class AppModule {}
