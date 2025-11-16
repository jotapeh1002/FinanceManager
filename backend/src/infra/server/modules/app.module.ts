import { Confighelper } from 'src/infra/configs/confighelper.config';
import { databaseConfig } from 'src/infra/configs/database.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RepositoryModule } from './repository.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { DotEnvModule } from './dot-env.module';
import { AuthModule } from './auth.module';
import { UserModule } from './user.module';
import { HashModule } from './hash.module';
import { Module } from '@nestjs/common';
import { SessionModule } from './session.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MikroOrmModule.forRootAsync({ imports: [ConfigModule], inject: [ConfigService], useFactory: (confighService: ConfigService) => databaseConfig(confighService) }),
    RepositoryModule,
    UserModule,
    DotEnvModule,
    AuthModule,
    HashModule,
    SessionModule,
  ],
  providers: [Confighelper],
})
export class AppModule {}
