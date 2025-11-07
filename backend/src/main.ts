import { NestFactory } from '@nestjs/core';
import { Confighelper } from './infra/configs/confighelper.config.js';
import { MikroORM } from '@mikro-orm/core';
import { pipesConfig } from './infra/configs/pipes.config.js';
import { AppModule } from './infra/server/modules/app.module.js';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  //swagger
  const config = new DocumentBuilder().setTitle('Finances Gestor API').setDescription('Teste pra ver o que e isso').setVersion('version 1.0').build();
  SwaggerModule.setup('doc', app, () => SwaggerModule.createDocument(app, config));

  app.useGlobalPipes(pipesConfig());
  await app.listen(3000, '0.0.0.0');
}
bootstrap().catch((err) => {
  console.error('Erro to initialize application', err);
});
