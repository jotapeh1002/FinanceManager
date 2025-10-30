import { NestFactory } from '@nestjs/core';
import { Confighelper } from './infra/configs/confighelper.config';
import { MikroORM } from '@mikro-orm/core';
import { pipesConfig } from './infra/configs/pipes.config';
import { AppModule } from './infra/server/modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const dotEnv = app.get(Confighelper);
  const orm = app.get(MikroORM);

  if (!dotEnv.POSTGRES_PROD) {
    await orm
      .getSchemaGenerator()
      .updateSchema()
      .catch((err) => console.log(err));
  }

  app.useGlobalPipes(pipesConfig());
  await app.listen(dotEnv.PORT, '0.0.0.0');
}
bootstrap().catch((err) => {
  console.error('Erro to initialize application', err);
});
