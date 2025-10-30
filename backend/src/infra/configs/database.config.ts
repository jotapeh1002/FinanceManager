import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Confighelper } from './confighelper.config';
import { ConfigService } from '@nestjs/config';

export function databaseConfig(dotEnv: ConfigService): MikroOrmModule {
  const config = new Confighelper(dotEnv);

  return {
    driver: PostgreSqlDriver,
    host: config.POSTGRES_HOST,
    port: config.POSTGRES_PORT,
    user: config.POSTGRES_USER,
    password: config.POSTGRES_PASSWORD,
    dbName: config.POSTGRES_DB,
    // entities: [join(process.cwd(), 'dist', 'infra', 'database', 'entity')],
    autoLoadEntities: true,
    debug: false,
  };
}
