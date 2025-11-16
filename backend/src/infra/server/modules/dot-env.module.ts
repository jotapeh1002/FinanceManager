import { Global, Module } from '@nestjs/common';
import { Confighelper } from 'src/infra/configs/confighelper.config';

@Global()
@Module({
  providers: [Confighelper],
  exports: [Confighelper],
})
export class DotEnvModule {}
